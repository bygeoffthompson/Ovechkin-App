import { useState, useEffect } from 'react'

export function useGoalCounter() {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const start = performance.now()
        let raf
        const frame = (now) => {
            const p = Math.max(0, Math.min((now - start) / 1000, 1))
            setProgress(p)
            if (p < 1) raf = requestAnimationFrame(frame)
        }
        raf = requestAnimationFrame(frame)
        return () => cancelAnimationFrame(raf)
    }, [])

    return { anim: (n) => Math.max(1, Math.round(progress * n)), isAnimating: progress < 1 }
}
