import {useState, useEffect, useMemo, useCallback, useRef} from 'react'
import {useTranslation} from 'react-i18next'
import 'bootstrap/dist/css/bootstrap.min.css'
import {useUrlQuery} from './useUrlQuery'
import {useGoalCounter} from './useGoalCounter'
import {useVote} from './useVote'
import {PERIOD_NAME, DOTW, LEAGUE, itemSeason, itemDotw, random, normalize, DEFAULT_FILTERS, formatMonth, buildFilterSets} from './constants'
import LeagueFilters from './LeagueFilters'
import RandomSearch from './RandomSearch'
import GoalAccordions from './GoalAccordions'
import Results from './Results'
import WelcomeMessage from './WelcomeMessage'
import NoResults from './NoResults'

function App() {
    const {t} = useTranslation()
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const gaRef = useRef(null)

    useEffect(() => {
        if (window.location.hostname !== 'localhost') {
            window.addEventListener('load', () => {
                import('react-ga4').then(({default: ReactGA}) => {
                    gaRef.current = ReactGA
                    ReactGA.initialize('G-K4X7EL6PW3')
                })
            }, { once: true })
        }
    }, [])

    useEffect(() => {
        fetch('goals.json').then(r => r.json()).then(setData).catch(setError)
    }, [])

    const jsonData = useMemo(() => (data ?? []).filter(item => item.league !== 7), [data])

    const [searchGoal, setSearchGoal] = useState('')
    const [searchText, setSearchText] = useState('')
    const [hatTrickMode, setHatTrickMode] = useState(false)
    const [sortOrder, setSortOrder] = useState('asc')

    const { anim, isAnimating } = useGoalCounter()
    const { votedGoalId, vote } = useVote()
    const [filters, setFilters] = useState(DEFAULT_FILTERS)

    const leagueCounts = useMemo(() => {
        const counts = {}
        jsonData.forEach(item => {
            if (item.league) counts[item.league] = (counts[item.league] || 0) + 1
        })
        return counts
    }, [jsonData])

    const activeLeagueGoals = useMemo(
        () => jsonData.filter(item => item.league),
        [jsonData]
    )
    const activeFilters = useMemo(() => buildFilterSets(activeLeagueGoals), [activeLeagueGoals])

    const seasonOptions = useMemo(() => {
        const max = jsonData.reduce((m, i) => Math.max(m, itemSeason(i)), 0)
        return Array.from({length: max + 2}, (_, i) => i - 1)
    }, [jsonData])

    const yearOptions = useMemo(() => {
        const max = jsonData.reduce((m, i) => Math.max(m, i.year), 0)
        return Array.from({length: max - 2004 + 1}, (_, i) => 2004 + i)
    }, [jsonData])

    const searchStrings = useMemo(() =>
        jsonData.map(item => {
            const month = formatMonth(item.month)
            return normalize([
                item.result === 1 ? 'Win' : item.result === 0 ? 'Loss' : null,
                LEAGUE[item.league],
                `${item.month}/${item.day}/${item.year}`,
                DOTW[itemDotw(item)],
                `${month} ${item.year}`,
                `${month} ${item.day}`,
                item.year,
                item.type,
                item.goalie,
                item.goalie?.replace('-', ' '),
                item.team,
                PERIOD_NAME[item.period].replace('OT', 'OT Overtime'),
                item.time,
                item.hoa === 1 ? 'Home' : item.hoa === 0 ? 'Away' : null,
                item.jersey?.replace('Dynamo', 'Dynamo Moscow'),
                item.series,
                item.game && 'G' + item.game,
                item.search,
                item.btn1, item.btn2, item.btn3,
                item.a1 && `P:${item.a1}`, item.a2 && `S:${item.a2}`,
                item.a1, item.a2,
                item.a1?.replace('-', ' '), item.a2?.replace('-', ' '),
            ].filter(Boolean).join(' '))
        }),
    [jsonData])

    const hasTextQuery = searchText.length > 0 || Object.values(filters).some(Boolean)

    const tooShort = searchText.length === 1

    const textResults = useMemo(() => {
        const { league, team, location, period, month, season, year } = filters
        const hasSelectFilters = league || team || location || period || month || season || year
        if (searchText.length === 0 && !hasSelectFilters) return []
        if (searchText.length === 1) return []
        const terms = normalize(searchText).split('+').map(s => s.trim()).filter(Boolean)
        return jsonData.filter((item, i) => {
            if (terms.length > 0 && !terms.every(t => searchStrings[i].includes(t))) return false
            if (league && item.league !== Number(league)) return false
            if (team && item.team !== team) return false
            if (location && item.hoa !== (location === 'Home' ? 1 : 0)) return false
            if (period && item.period !== Number(period)) return false
            if (month && item.month !== Number(month)) return false
            if (season && itemSeason(item) !== parseInt(season.replace('Season ', ''))) return false
            if (year && item.year !== parseInt(year)) return false
            return true
        })
    }, [jsonData, searchText, filters, searchStrings])

    const goalResults = useMemo(() => {
        if (!searchGoal) return []
        const goalQuery = parseFloat(searchGoal)
        const idx = jsonData.findIndex(item => item.goal === goalQuery)
        if (idx === -1) return []
        const item = jsonData[idx]
        if (hatTrickMode) return jsonData.slice(Math.max(0, idx - 2), idx + 1)
        return [item]
    }, [jsonData, searchGoal, hatTrickMode])

    const resultFilters = useMemo(() => textResults.length === 0 ? null : buildFilterSets(textResults), [textResults])

    const filterOptions = Object.fromEntries(
        [['leagues','league'],['teams','team'],['locations','location'],['periods','period'],['months','month'],['seasons','season'],['years','year']]
            .map(([setKey, filterKey]) => [setKey, filters[filterKey] ? activeFilters[setKey] : (resultFilters?.[setKey] ?? activeFilters[setKey])])
    )

    const searchResults = hasTextQuery ? textResults : goalResults
    const isIdle = !hasTextQuery && !searchGoal
    const showSort = !hatTrickMode && searchResults.length > 1

    const sortedResults = useMemo(() => {
        return [...searchResults].sort((first, last) => {
            if (first.goal === '' && last.goal === '') return 0
            if (first.goal === '') return 1
            if (last.goal === '') return -1
            return sortOrder === 'asc' ? first.goal - last.goal : last.goal - first.goal
        })
    }, [searchResults, sortOrder])

    const noResults = !tooShort && sortedResults.length === 0
    const terms = [
        ...searchText.split('+').map(t => t.trim().toUpperCase()).filter(Boolean),
        filters.team,
        filters.location,
        filters.period && PERIOD_NAME[filters.period],
        filters.month && formatMonth(filters.month),
        filters.season,
        filters.year,
    ].filter(Boolean)
    const resultCount = sortedResults.length
    const showResults = hatTrickMode || resultCount > 1 || terms.length > 0
    const onGoalSelect = useCallback((g) => { setSearchGoal(g); setHatTrickMode(false) }, [])
    const onActiveGoal = useCallback((goal) => { setSearchGoal(goal !== '' ? String(goal) : '') }, [])

    useUrlQuery(setSearchGoal, setSearchText)

    useEffect(() => {
        if (textResults.length === 0) return
        gaRef.current?.event({
            category: 'Results',
            action: 'Open Goal Accordion',
            label: textResults[0].goal.toString()
        })
    }, [textResults])

    const handleText = useCallback((e) => {
        setSearchGoal('')
        setHatTrickMode(false)
        setSearchText(e.target.value)
    }, [])

    const handleGoalNumber = useCallback((e) => {
        setSearchText('')
        setHatTrickMode(false)
        setFilters(DEFAULT_FILTERS)
        const val = e.target.value
        setSearchGoal(val)
    }, [])

    const handleFilter = useCallback((key, value) => {
        setSearchGoal('')
        setFilters(f => ({...f, [key]: value}))
    }, [])

    const reset = useCallback(() => {
        setSearchText('')
        setSearchGoal('')
        setHatTrickMode(false)
        setSortOrder('asc')
        setFilters(DEFAULT_FILTERS)
    }, [])

    function outdoor() {
        setFilters(DEFAULT_FILTERS)
        setSearchText('')
        setHatTrickMode(false)
        const input = parseInt(searchGoal, 10)
        let goal
        if (input === 440) goal = 598
        else if (input === 475) goal = 602
        else if (input === 598) goal = 475
        else goal = 440
        setSearchGoal(goal)
    }

    function pickRandom(arr) {
        let picked
        do {
            picked = arr[random(0, arr.length - 1)]
        } while (picked.goal === parseFloat(searchGoal) && arr.length > 1)
        return picked
    }

    function randomGoal(filtered) {
        setFilters(DEFAULT_FILTERS); setSearchText(''); setHatTrickMode(false)
        if (filtered.length === 0) return
        setSearchGoal(pickRandom(filtered).goal)
    }

    function filterGoal(match) {
        setFilters(DEFAULT_FILTERS); setSearchText(''); setHatTrickMode(false)
        const result = jsonData.filter(item => Object.values(item).some(value => match.includes(value)))
        if (result.length === 0) return
        setSearchGoal(pickRandom(result).goal)
    }

    function hatTrick() {
        setFilters(DEFAULT_FILTERS)
        setSearchText('')
        const hatTrickGoals = jsonData.filter(item =>
            [item.btn1, item.btn2, item.btn3].includes('Hat Trick')
        )
        if (hatTrickGoals.length === 0) return
        const picked = pickRandom(hatTrickGoals)
        setHatTrickMode(true)
        setSortOrder('desc')
        setSearchGoal(picked.goal)
    }

    if (error) return <div className="alert alert-danger" role="alert">{t('app.error')}</div>
    if (!data) return <div className="alert alert-light" role="alert">{t('app.loading')}</div>

    return (
        <div onClick={(e) => {
                const btn = e.target.closest('button')
                if (!btn) return
                const title = btn.title
                if (!title) return
                gaRef.current?.event({ category: 'Click', action: 'Button Click', label: title })
            }}>
            <LeagueFilters
                leagueCounts={leagueCounts}
                isAnimating={isAnimating}
                anim={anim}
                activeLeagueGoals={activeLeagueGoals}
                randomGoal={randomGoal}
                jsonData={jsonData}
                searchGoal={searchGoal}
            />
            <div className="align-items-start d-flex flex-column-reverse flex-lg-row gap-3 justify-content-between mb-3">
                <RandomSearch
                    jsonData={jsonData}
                    searchText={searchText}
                    filters={filters}
                    filterOptions={filterOptions}
                    seasonOptions={seasonOptions}
                    yearOptions={yearOptions}
                    handleText={handleText}
                    handleFilter={handleFilter}
                    filterGoal={filterGoal}
                    randomGoal={randomGoal}
                    outdoor={outdoor}
                    hatTrick={hatTrick}
                    reset={reset}
                    searchGoal={searchGoal}
                    handleGoalNumber={handleGoalNumber}
                    leagueCounts={leagueCounts}
                />
                <div className="d-flex flex-column goal-results w-100">
                    <Results showResults={showResults} terms={terms} resultCount={resultCount} showSort={showSort} sortOrder={sortOrder} setSortOrder={setSortOrder} />
                    <GoalAccordions
                        sortedResults={sortedResults}
                        tooShort={tooShort}
                        ga={gaRef}
                        votedGoalId={votedGoalId}
                        onVote={vote}
                        onActiveGoal={onActiveGoal}
                    />
                    {noResults && (isIdle ? <WelcomeMessage jsonData={jsonData} onGoalSelect={onGoalSelect} /> : <NoResults />)}
                </div>
            </div>
        </div>
    )
}

export default App
