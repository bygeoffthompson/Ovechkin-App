import { useMemo } from 'react'

export function useTodaysGoals(jsonData) {
    const now = new Date()
    const month = now.getMonth() + 1
    const day = now.getDate()

    const todaysGoals = useMemo(() =>
        jsonData.filter(item => item.month === month && item.day === day),
    [jsonData, month, day])

    return { todaysGoals, month, day }
}
