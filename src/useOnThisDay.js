import { useMemo } from 'react'

export function useOnThisDay(jsonData) {
    const now = new Date()
    const month = now.getMonth() + 1
    const day = now.getDate()

    const onThisDayGoals = useMemo(() =>
        jsonData.filter(item => item.month === month && item.day === day),
    [jsonData, month, day])

    return { onThisDayGoals, month, day }
}
