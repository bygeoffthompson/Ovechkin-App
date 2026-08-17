import { useState, useMemo } from 'react'

function currentTime() {
    const now = new Date()
    const hours = now.getHours() % 12 || 12
    return `${hours}:${String(now.getMinutes()).padStart(2, '0')}`
}

export function useOnThisDay(jsonData) {
    const now = new Date()
    const month = now.getMonth() + 1
    const day = now.getDate()
    const dotwKey = now.getDay() + 1
    const dotwName = now.toLocaleString('en-US', { weekday: 'long' })

    const [time, setTime] = useState(currentTime)

    function refreshTime() {
        setTime(currentTime())
    }

    const onThisDayGoals = useMemo(() =>
        jsonData.filter(item => item.month === month && item.day === day),
    [jsonData, month, day])

    const atThisTimeGoals = useMemo(() =>
        jsonData.filter(item => item.time === time),
    [jsonData, time])

    const dotwMatches = useMemo(() =>
        jsonData.filter(item => item.dotw === dotwKey),
    [jsonData, dotwKey])

    return { onThisDayGoals, month, day, atThisTimeGoals, time, refreshTime, dotwName, dotwMatches }
}
