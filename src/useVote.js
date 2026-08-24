import { useState, useRef } from 'react'
import { signInAnonymously } from 'firebase/auth'
import { doc, runTransaction, increment } from 'firebase/firestore'
import { auth, db } from './firebase'

const LS_KEY = 'ovechkin_app_vote'

export function useVote() {
    const [votedGoalId, setVotedGoalId] = useState(() => localStorage.getItem(LS_KEY))
    const uidRef = useRef(null)

    async function ensureAuth() {
        if (uidRef.current) return uidRef.current
        const { user } = await signInAnonymously(auth)
        uidRef.current = user.uid
        return user.uid
    }

    async function vote(goalId) {
        if (goalId === votedGoalId) return
        const prevGoalId = votedGoalId

        localStorage.setItem(LS_KEY, goalId)
        setVotedGoalId(goalId)

        try {
            const uid = await ensureAuth()
            await runTransaction(db, async (tx) => {
                const userRef = doc(db, 'userVotes', uid)
                const userDoc = await tx.get(userRef)
                const serverPrev = userDoc.exists() ? userDoc.data().goalId : null

                if (serverPrev) {
                    tx.set(doc(db, 'goalVotes', serverPrev), { count: increment(-1) }, { merge: true })
                }
                tx.set(doc(db, 'goalVotes', goalId), { count: increment(1) }, { merge: true })
                tx.set(userRef, { goalId })
            })
        } catch {
            if (prevGoalId) localStorage.setItem(LS_KEY, prevGoalId)
            else localStorage.removeItem(LS_KEY)
            setVotedGoalId(prevGoalId)
        }
    }

    return { votedGoalId, vote }
}
