import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {LEAGUE_ORDER, LEAGUE_META} from './constants'

const LEAGUES = LEAGUE_ORDER.map(key => ({ key, ...LEAGUE_META[key] }))

function FlipDigit({ ch }) {
    const prevRef = useRef(ch)
    const [prev, setPrev] = useState(ch)
    const [animKey, setAnimKey] = useState(0)
    const [animating, setAnimating] = useState(false)

    useLayoutEffect(() => {
        if (ch !== prevRef.current) {
            setPrev(prevRef.current)
            prevRef.current = ch
            setAnimKey(k => k + 1)
            setAnimating(true)
        }
    }, [ch])

    useEffect(() => {
        if (!animating) return
        const t = setTimeout(() => setAnimating(false), 300)
        return () => clearTimeout(t)
    }, [animating])

    return (
        <span className={`d-inline-block flip-digit h-100 overflow-hidden position-relative shadow${animating ? ' flip-digit-animate' : ''}`}>
            <span className="end-0 fd-piece fd-top h-50 overflow-hidden position-absolute start-0 top-0"><span>{ch}</span></span>
            <span className="bottom-0 end-0 fd-piece fd-bottom h-50 overflow-hidden position-absolute start-0"><span>{ch}</span></span>
            {animKey > 0 && <span key={animKey} className="end-0 fd-flap fd-piece overflow-hidden position-absolute start-0 top-0"><span>{prev}</span></span>}
        </span>
    )
}

export default function LeagueFilters({ leagueCounts, disabledLeagues, isAnimating, anim, totalDisplay, activeLeagueGoals, randomGoal, jsonData, searchGoal }) {
    return (
        <div className="d-flex flex-wrap align-items-stretch gap-1 mb-3">
            {LEAGUES.map(({ key, label, title }) => (
                <button key={key} className="button counter" disabled={isAnimating || !!disabledLeagues[key]} onClick={() => randomGoal(jsonData.filter(item => item.league === key))} title={title} type="button">
                    <div className="h4 m-0" data-goals={leagueCounts[key]}>{anim(leagueCounts[key])}</div>
                    <div>{label}</div>
                </button>
            ))}
            <button className="button" disabled={isAnimating || activeLeagueGoals.length === 0} onClick={() => randomGoal(activeLeagueGoals)} title="Total" type="button">
                <span className="h2 m-0" data-goals={activeLeagueGoals.length}>{isAnimating ? anim(activeLeagueGoals.length) : totalDisplay}</span>
            </button>
            {searchGoal !== '' && (() => {
                const raw = String(searchGoal)
                const formatted = raw.includes('.')
                    ? raw.split('.')[0] + '.' + raw.split('.')[1].padEnd(2, '0')
                    : raw
                const digitCount = formatted.replace('.', '').length
                const padCount = Math.max(0, 3 - digitCount)
                const totalSlots = digitCount + padCount
                const items = []
                let rIdx = totalSlots - 1
                for (let i = 0; i < padCount; i++) items.push(<FlipDigit key={`r${rIdx--}`} ch="" />)
                for (const ch of formatted) {
                    if (ch === '.') items.push(<span key="sep" className="d-inline-block flip-digit fd-piece fw-bold h-100 h4 text-center shadow text-white" id="flip-dot"><strong>.</strong></span>)
                    else items.push(<FlipDigit key={`r${rIdx--}`} ch={ch} />)
                }
                return <div className="align-items-stretch d-flex gap-1 user-select-none" id="flip-counter" aria-label={`Goal ${formatted}`}>{items}</div>
            })()}
        </div>
    )
}
