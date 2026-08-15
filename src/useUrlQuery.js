import { useEffect } from 'react'

const GOAL_EXCLUSIONS = ['20th', '30th', '40th', '50th', '60th', '2nd', '3rd', '4th', '6v5', '5v3', '4v4']

export function useUrlQuery(setSearchGoal, setSearchText, searchSubmit) {
    useEffect(() => {
        const query = window.location.search.slice(1).split('?')[0].replace(/-/g, ' ').toLowerCase()
        if (!query) return

        const queryInteger = parseFloat(query)
        if (!query.includes('/') && !GOAL_EXCLUSIONS.includes(query) && queryInteger) {
            setSearchGoal(queryInteger)
            searchSubmit(queryInteger, '')
        } else {
            const t = query.split('&')[0]
            setSearchText(t)
            searchSubmit('', t)
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
}
