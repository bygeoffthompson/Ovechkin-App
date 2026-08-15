import { useState, useEffect } from 'react'

export function useGoalCounter(duration = 2500) {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const start = performance.now()
        let raf
        const frame = (now) => {
            const p = Math.min((now - start) / duration, 1)
            setProgress(p)
            if (p < 1) raf = requestAnimationFrame(frame)
        }
        raf = requestAnimationFrame(frame)
        return () => cancelAnimationFrame(raf)
    }, [duration])

    return (n) => Math.max(1, Math.round(progress * n))
}
