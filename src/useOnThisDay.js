import { useState, useEffect } from 'react'

export function useOnThisDay(jsonData) {
    const [otdDisabled, setOtdDisabled] = useState(false)
    const [otdTitle, setOtdTitle] = useState('On This Day')

    useEffect(() => {
        const now = new Date()
        const month = now.getMonth() + 1
        const day = now.getDate()
        const checkDay = jsonData.filter(item => item.month === month && item.day === day)
        if (checkDay.length === 0) {
            setOtdDisabled(true)
            setOtdTitle('No Goals on ' + month + '/' + day)
        } else {
            setOtdTitle('Goals on ' + month + '/' + day)
        }
    }, [jsonData])

    return { otdDisabled, otdTitle }
}



/*
Button HTML
<button className="button" onClick={() => { const now = new Date(); randomGoal(jsonData.filter(item => item.month === now.getMonth() + 1 && item.day === now.getDate())) }} disabled={otdDisabled} title={otdTitle} type="button">On&nbsp;This&nbsp;Day</button>

App.js IMPORTS
import {useOnThisDay} from './useOnThisDay'
const { otdDisabled, otdTitle } = useOnThisDay(jsonData)
 */