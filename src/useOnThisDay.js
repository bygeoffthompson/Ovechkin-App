import { useMemo } from 'react'
import { itemDotw } from './constants'

export function useOnThisDay(jsonData) {
    const now = new Date()
    const month = now.getMonth() + 1
    const day = now.getDate()
    const dotwKey = now.getDay() + 1
    const dotwName = now.toLocaleString('en-US', { weekday: 'long' })

    const onThisDayGoals = useMemo(() =>
        jsonData.filter(item => item.month === month && item.day === day),
    [jsonData, month, day])

    const dotwMatches = useMemo(() =>
        jsonData.filter(item => itemDotw(item) === dotwKey),
    [jsonData, dotwKey])

    return { onThisDayGoals, month, day, dotwName, dotwMatches }
}
