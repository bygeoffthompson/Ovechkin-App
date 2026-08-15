import React, {useState, useEffect, useMemo, useRef} from 'react'
import {useUrlQuery} from './useUrlQuery'
import {useGoalCounter} from './useGoalCounter'
import Accordion from 'react-bootstrap/Accordion'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import 'bootstrap/dist/css/bootstrap.min.css'

let _ga = null
const canadianTeams = ['Calgary Flames', 'Edmonton Oilers', 'Montreal Canadiens', 'Ottawa Senators', 'Toronto Maple Leafs', 'Vancouver Canucks', 'Winnipeg Jets']
const youngGunsPlayers = ['Alex Semin', 'Mike Green', 'Nicklas Backstrom']
const normalize = (s) => s.toString().normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

function random(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function SearchForm({jsonData}) {
    const [searchGoal, setSearchGoal] = useState('')
    const [searchText, setSearchText] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [welcome, setWelcome] = useState(window.location.search.length <= 1)
    const [sortOrder, setSortOrder] = useState('asc')
    const [showSort, setShowSort] = useState(true)
    const [searched, setSearched] = useState(false)
    const [showResultsBar, setShowResultsBar] = useState(false)
    const anim = useGoalCounter()
    const advancedRef = useRef(null)

    const leagueCounts = useMemo(() => {
        const counts = {}
        jsonData.forEach(item => {
            if (item.league) counts[item.league] = (counts[item.league] || 0) + 1
        })
        return counts
    }, [jsonData])

    const leagueGoals = useMemo(() => jsonData.filter(item => item.league), [jsonData])

    const sortedResults = useMemo(() =>
        [...searchResults].sort((first, last) => {
            if (first.goal === '' && last.goal === '') return 0
            if (first.goal === '') return 1
            if (last.goal === '') return -1
            return sortOrder === 'asc' ? first.goal - last.goal : last.goal - first.goal
        }),
    [searchResults, sortOrder])

    const searchStrings = useMemo(() =>
        jsonData.map(item => {
            const month = new Date(0, item.month - 1).toLocaleString('default', { month: 'long' })
            return [
                item.result && item.result.replace('W', 'Win').replace('L', 'Loss'),
                item.league,
                'Season ' + item.season,
                `${item.month}/${item.day}/${item.year}`,
                item.dotw,
                `${month} ${item.year}`,
                `${month} ${item.day}`,
                item.year,
                item.type,
                item.goalie,
                item.goalie?.replace('-', ' '),
                item.team,
                item.period,
                item.time,
                item.hoa,
                item.jersey,
                item.series,
                item.game && 'G' + item.game,
                item.search,
                item.btn1, item.btn2, item.btn3,
                item.primary && `P:${item.primary}`, item.secondary && `S:${item.secondary}`,
                item.primary, item.secondary,
                item.primary?.replace('-', ' '), item.secondary?.replace('-', ' '),
            ].filter(Boolean).join(' ')
             .normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
        }),
    [jsonData])

    useUrlQuery(setSearchGoal, setSearchText, searchSubmit)

    useEffect(() => {
        searchResults.slice(0, 50).forEach(result => {
            _ga?.event({
                category: 'Results',
                action: 'Goal Results',
                label: result.goal.toString()
            })
        })
    }, [searchResults])

    function lazyLoadFrame() {
        setTimeout(() => {
            const visibleFrame = document.querySelector('.accordion-collapse.show iframe')
            if (visibleFrame) {
                const dataSrc = visibleFrame.getAttribute('data-src')
                if (visibleFrame.getAttribute('src') === 'about:blank') {
                    visibleFrame.setAttribute('src', dataSrc)
                }
            }
        }, 500)
    }

    const handleText = (e) => {
        setSearchGoal('')
        setSearchText(e.target.value)
    }

    const outdoor = () => {
        clearAdvanced()
        const input = parseInt(searchGoal)
        let goal
        if (input === 440) goal = 598
        else if (input === 475) goal = 602
        else if (input === 598) goal = 475
        else goal = 440
        setSearchGoal(goal)
        searchSubmit(goal)
    }

    function randomGoal(filtered) {
        clearAdvanced()
        const goal = filtered[Math.floor(Math.random() * filtered.length)].goal
        setSearchGoal(goal)
        searchSubmit(goal)
    }

    function filterGoal(match) {
        clearAdvanced()
        resultsHide()
        const result = jsonData.filter(item =>
            Object.values(item).some(value =>
                match.includes(value)
            )
        )
        let picked
        do {
            picked = result[random(0, result.length - 1)]
        } while (picked.goal === parseFloat(searchGoal) && result.length > 1)
        setSearchGoal(picked.goal)
        searchSubmit(picked.goal)
    }

    const clearAdvanced = () => advancedRef.current.querySelectorAll('select').forEach(s => s.value = '')

    const reset = () => {
        resultsHide()
        setSearchGoal('')
        setSearchResults([])
        setWelcome(true)
        setShowSort(true)
        clearAdvanced()
    }

    function resultsHide() {
        setShowResultsBar(false)
        setSearchText('')
        setSearched(false)
    }

    function searchSubmit(goalOverride, textOverride) {
        setWelcome(false)
        setShowSort(true)
        const currentGoal = goalOverride !== undefined ? goalOverride : searchGoal
        const currentText = textOverride !== undefined ? textOverride : searchText

        const selectFilters = [...advancedRef.current.querySelectorAll('select')]
            .map(s => normalize(s.value))
            .filter(Boolean)

        if (currentGoal) {
            resultsHide()
            const goalQuery = parseFloat(currentGoal)
            const results = jsonData.filter((item, i) =>
                item.goal === goalQuery && selectFilters.every(f => searchStrings[i].includes(f))
            )
            setSearchResults(results)
        } else if (currentText.length > 0 || selectFilters.length > 0) {
            _ga?.event({
                category: 'Search',
                action: 'Text Search',
                label: currentText
            });
            const terms = normalize(currentText).split('+').map(s => s.trim()).filter(Boolean)
            const results = jsonData.filter((item, i) => {
                const search = searchStrings[i]
                return terms.every(term => search.includes(term)) && selectFilters.every(f => search.includes(f))
            });

            if (results.length > 0) {
                setShowResultsBar(true)
                if (results.length === 1) setShowSort(false)
            } else {
                setShowResultsBar(false)
                setSearched(true)
            }
            setSearchResults(results)
        }
    }

    function hatTrick() {
        clearAdvanced()
        setWelcome(false)
        const hatTrickGoals = jsonData.filter(item =>
            [item.btn1, item.btn2, item.btn3].includes('Hat Trick')
        )
        const picked = hatTrickGoals[Math.floor(Math.random() * hatTrickGoals.length)]
        const idx = jsonData.findIndex(item => item.goal === picked.goal)
        const results = jsonData.slice(Math.max(0, idx - 2), idx + 1)
        resultsHide()
        setSortOrder('desc')
        setShowSort(false)
        setSearchGoal(picked.goal)
        setSearchResults(results)
        setShowResultsBar(true)
    }

    return (
        <div onClick={(e) => {
                const btn = e.target.closest('button')
                if (!btn) return
                const title = btn.title
                if (['', 'Reset', 'Search'].includes(title)) return
                _ga?.event({
                    category: 'Click',
                    action: 'Button Click',
                    label: title
                });
            }}>
            <div className="d-flex flex-wrap gap-2 mb-3">
                <button className="button counter" onClick={() => filterGoal(['NHL Regular'])} title="NHL Regular Season" type="button">
                    <div className="h4 m-0" data-goals={leagueCounts['NHL Regular']}>{anim(leagueCounts['NHL Regular'])}</div>
                    <div>NHL</div>
                </button>
                <button className="button counter" onClick={() => filterGoal(['NHL Playoffs'])} title="NHL Playoffs" type="button">
                    <div className="h4 m-0" data-goals={leagueCounts['NHL Playoffs']}>{anim(leagueCounts['NHL Playoffs'])}</div>
                    <div>Playoffs</div>
                </button>
                <button className="button counter" onClick={() => filterGoal(['KHL'])} title="KHL" type="button">
                    <div className="h4 m-0" data-goals={leagueCounts['KHL']}>{anim(leagueCounts['KHL'])}</div>
                    <div>KHL</div>
                </button>
                <button className="button counter" onClick={() => filterGoal(['Olympics'])} title="Olympics" type="button">
                    <div className="h4 m-0" data-goals={leagueCounts['Olympics']}>{anim(leagueCounts['Olympics'])}</div>
                    <div>Olympics</div>
                </button>
                <button className="button counter" onClick={() => filterGoal(['World Championships'])} title="World Championships" type="button">
                    <div className="h4 m-0" data-goals={leagueCounts['World Championships']}>{anim(leagueCounts['World Championships'])}</div>
                    <div>Worlds</div>
                </button>
                <button className="button counter" onClick={() => filterGoal(['World Cup'])} title="World Cup" type="button">
                    <div className="h4 m-0" data-goals={leagueCounts['World Cup']}>{anim(leagueCounts['World Cup'])}</div>
                    <small>World Cup</small>
                </button>
                <button className="button counter" onClick={() => randomGoal(leagueGoals)} title="Total" type="button">
                    <div className="h4 m-0" data-goals={leagueGoals.length}>{anim(leagueGoals.length)}</div>
                    <div>Total</div>
                </button>
            </div>
            <div className="align-items-start d-flex flex-column flex-lg-row gap-3 justify-content-between mb-4">
                <div className="align-items-start bg-body d-flex justify-content-center flex-column random-search shadow-lg w-100">
                    <Tabs defaultActiveKey="random" fill className="border-0 w-100">
                        <Tab eventKey="random" tabClassName="border-0 fw-bold p-3" title="Random">
                            <div className="p-3">
                                <div className="align-items-start buttons-group d-flex flex-row gap-2 justify-content-start justify-content-sm-center">
                                    <div className="d-flex flex-column gap-2">
                                        <button onClick={() => filterGoal(['Capitol'])} className="button jersey-button" title="Capitol" type="button">
                                            <img alt="Capitol logo" className="jersey-logo" src="/jerseys/capitol.svg" width="36" height="36"/>
                                        </button>
                                        <button onClick={() => filterGoal(['Screagle'])} className="button jersey-button" title="Screagle" type="button">
                                            <img alt="Screagle logo" className="jersey-logo" src="/jerseys/screagle.svg" width="36" height="36"/>
                                        </button>
                                        <button onClick={() => filterGoal(['Red'])} className="button jersey-button" title="Red" type="button">
                                            <img alt="Capitals logo" className="jersey-logo" src="/jerseys/capitals.svg" width="36" height="36"/>
                                        </button>
                                        <button onClick={() => filterGoal(['White'])} className="button jersey-button" title="White" type="button">
                                            <img alt="Capitals logo" className="jersey-logo" src="/jerseys/capitals.svg" width="36" height="36"/>
                                        </button>
                                        <button onClick={() => filterGoal(['Throwback'])} className="button jersey-button" title="Throwback" type="button">
                                            ☆&nbsp;&nbsp;<img alt="Throwback logo" className="jersey-logo" src="/jerseys/throwback.svg" width="36" height="36"/>&nbsp;&nbsp;☆
                                        </button>
                                        <button onClick={outdoor} className="button jersey-button multi-logo" title="Brick / Stadium" type="button">
                                            <span>
                                                <img alt="Brick Stripes logo" className="jersey-logo" src="/jerseys/brick.svg" width="24" height="24"/>
                                            </span>
                                            <span>
                                                <img alt="Stadium Series logo" className="jersey-logo" src="/jerseys/caps.svg" width="36" height="36"/>
                                            </span>
                                        </button>
                                        <button onClick={() => filterGoal(['Navy W'])} className="button jersey-button" title="Navy" type="button">
                                            <img alt="Navy logo" className="jersey-logo" src="/jerseys/navy.svg" width="24" height="24"/>
                                        </button>
                                        <button onClick={() => filterGoal(['Black Reverse Retro',])} className="button jersey-button" title="Black Reverse Retro" type="button">
                                            <img alt="Black Reverse Retro logo" className="jersey-logo" src="/jerseys/retro.svg" width="36" height="36"/>
                                        </button>
                                        <button onClick={() => filterGoal(['Red Reverse Retro'])} className="button jersey-button" title="Red Reverse Retro" type="button">
                                            <img alt="Red Reverse Retro logo" className="jersey-logo" src="/jerseys/retro.svg" width="36" height="36"/>
                                        </button>
                                    </div>
                                    <div className="d-flex flex-column gap-2">
                                        <button className="button" onClick={() => filterGoal(['Away'])} title="Away" type="button">Away</button>
                                        <button className="button" onClick={() => filterGoal(['Home'])} title="Home" type="button">Home</button>
                                        <button className="button" onClick={() => filterGoal(['Empty Net'])} title="Empty Net" type="button">ENG</button>
                                        <button className="button" onClick={() => filterGoal(['GWG', 'Overtime'])} title="Game Winner" type="button">GWG</button>
                                        <button className="button" onClick={hatTrick} title="Hat Trick" type="button">Hat&nbsp;Trick</button>
                                        <button className="button" onClick={() => filterGoal(['Overtime'])} title="Overtime" type="button">OT</button>
                                        <button className="button" onClick={() => filterGoal(['5v3', 'PPG'])} title="Power Play" type="button">PPG</button>
                                        <button className="button" onClick={() => filterGoal(['Teammate'])} title="Teammate" type="button">Teammate</button>
                                        <button className="button" onClick={() => randomGoal(jsonData.filter(item => item.primary === undefined))} title="Unassisted" type="button">Unassisted</button>
                                    </div>
                                    <div className="d-flex flex-column gap-2">
                                        <button className="button" onClick={() => filterGoal(['Backhand'])} title="Backhand" type="button">Backhand</button>
                                        <button className="button cup" onClick={() => randomGoal(jsonData.filter(item => item.year === 2018 && item.league === 'NHL Playoffs'))} title="Cup Run" type="button">Cup&nbsp;Run</button>
                                        <button className="button" onClick={() => randomGoal(jsonData.filter(item => item.primary === "Nicklas Backstrom"))} title="From Nicklas Backstrom" type="button">From&nbsp;Nick</button>
                                        <button className="button" onClick={() => randomGoal(jsonData.filter(item => item.hoa === 'Away' && canadianTeams.includes(item.team)))} title="In Canada" type="button">In&nbsp;Canada</button>
                                        <button className="button" onClick={() => filterGoal(['Post'])} title="Post" type="button">Post</button>
                                        <button className="button" onClick={() => filterGoal(['Rookie'])} title="Rookie" type="button">Rookie</button>
                                        <button className="button" onClick={() => filterGoal(['Slapshot'])} title="Slapshot" type="button">Slapshot</button>
                                        <button className="button" onClick={() => filterGoal(['Tip'])} title="Tip" type="button">Tip</button>
                                        <button className="button" onClick={() => randomGoal(jsonData.filter(item => youngGunsPlayers.includes(item.primary) && youngGunsPlayers.includes(item.secondary)))} title="Young Guns" type="button">Young&nbsp;Guns</button>
                                    </div>
                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey="search" tabClassName="border-0 fw-bold p-3" title="Search">
                            <form className="align-items-start d-flex flex-column gap-3 p-3" onSubmit={(e) => e.preventDefault()}>
                                <label htmlFor="goal-number">Number</label>
                                <input id="goal-number" min={0} max={leagueCounts['NHL Regular']} placeholder="#" step="any" type="number" value={searchGoal} onChange={(e) => setSearchGoal(e.target.value)}/>
                                <label htmlFor="search-text-1">Text</label>
                                <input id="search-text-1" type="text" placeholder="Search" value={searchText} onChange={handleText}/>
                                <Accordion className="advanced-accordion w-100">
                                    <Accordion.Item eventKey="0">
                                        <div className="accordion-header"><Accordion.Button className="py-2"><small><small>Advanced</small></small></Accordion.Button></div>
                                        <Accordion.Body className="d-flex flex-column gap-2 small" ref={advancedRef} onChange={(e) => { if (e.target.value !== '') setSearchGoal('') }}>
                                            <div className="align-items-center d-flex flex-row gap-1 justify-content-between">
                                                <label htmlFor="league">League</label>
                                                <select className="form-select py-1" id="league" name="League" defaultValue="">
                                                    <option value=""></option>
                                                    <option className="fw-bold" value="NHL">NHL</option>
                                                    <option value="NHL Regular">•&nbsp;NHL Regular</option>
                                                    <option value="NHL Playoffs">•&nbsp;NHL Playoffs</option>
                                                    <option value="KHL">KHL</option>
                                                    <option value="Olympics">Olympics</option>
                                                    <option value="World Championships">World Championships</option>
                                                    <option value="World Cup">World Cup</option>
                                                </select>
                                            </div>
                                            <div className="align-items-center d-flex flex-row gap-1 justify-content-between">
                                                <label htmlFor="team">Team</label>
                                                <select className="form-select py-1" id="team" name="Team" defaultValue="">
                                                    <option value=""></option>
                                                    <option value="Anaheim Ducks">Anaheim Ducks</option>
                                                    <option value="Mighty Ducks">•&nbsp;Mighty Ducks</option>
                                                    <option value="Atlanta Thrashers">Atlanta Thrashers</option>
                                                    <option value="Boston Bruins">Boston Bruins</option>
                                                    <option value="Buffalo Sabres">Buffalo Sabres</option>
                                                    <option value="Calgary Flames">Calgary Flames</option>
                                                    <option value="Carolina Hurricanes">Carolina Hurricanes</option>
                                                    <option value="Chicago Blackhawks">Chicago Blackhawks</option>
                                                    <option value="Colorado Avalanche">Colorado Avalanche</option>
                                                    <option value="Columbus Blue Jackets">Columbus Blue Jackets</option>
                                                    <option value="Dallas Stars">Dallas Stars</option>
                                                    <option value="Detroit Red Wings">Detroit Red Wings</option>
                                                    <option value="Edmonton Oilers">Edmonton Oilers</option>
                                                    <option value="Florida Panthers">Florida Panthers</option>
                                                    <option value="Los Angeles Kings">Los Angeles Kings</option>
                                                    <option value="Minnesota Wild">Minnesota Wild</option>
                                                    <option value="Montreal Canadiens">Montreal Canadiens</option>
                                                    <option value="Nashville Predators">Nashville Predators</option>
                                                    <option value="New Jersey Devils">New Jersey Devils</option>
                                                    <option value="New York Islanders">New York Islanders</option>
                                                    <option value="New York Rangers">New York Rangers</option>
                                                    <option value="Ottawa Senators">Ottawa Senators</option>
                                                    <option value="Philadelphia Flyers">Philadelphia Flyers</option>
                                                    <option value="Pittsburgh Penguins">Pittsburgh Penguins</option>
                                                    <option value="San Jose Sharks">San Jose Sharks</option>
                                                    <option value="Seattle Kraken">Seattle Kraken</option>
                                                    <option value="St. Louis Blues">St. Louis Blues</option>
                                                    <option value="Tampa Bay Lightning">Tampa Bay Lightning</option>
                                                    <option value="Toronto Maple Leafs">Toronto Maple Leafs</option>
                                                    <option value="Utah Mammoth">Utah Mammoth</option>
                                                    <option value="Vancouver Canucks">Vancouver Canucks</option>
                                                    <option value="Vegas Golden Knights">Vegas Golden Knights</option>
                                                    <option value="Winnipeg Jets">Winnipeg Jets</option>
                                                </select>
                                            </div>
                                            <div className="align-items-center d-flex flex-row gap-1 justify-content-between">
                                                <label htmlFor="location">Location</label>
                                                <select className="form-select py-1" id="location" name="Location" defaultValue="">
                                                    <option value=""></option>
                                                    <option value="Home">Home</option>
                                                    <option value="Away">Away</option>
                                                </select>
                                            </div>
                                            <div className="align-items-center d-flex flex-row gap-1 justify-content-between">
                                                <label htmlFor="period">Period</label>
                                                <select className="form-select py-1" id="period" name="Period" defaultValue="">
                                                    <option value=""></option>
                                                    <option value="First">First</option>
                                                    <option value="Second">Second</option>
                                                    <option value="Third">Third</option>
                                                    <option value="Overtime">Overtime</option>
                                                </select>
                                            </div>
                                            <div className="align-items-center d-flex flex-row gap-1 justify-content-between">
                                                <label htmlFor="month">Month</label>
                                                <select className="form-select py-1" id="month" name="Month" defaultValue="">
                                                    <option value=""></option>
                                                    <option value="January">January</option>
                                                    <option value="February">February</option>
                                                    <option value="March">March</option>
                                                    <option value="April">April</option>
                                                    <option value="May">May</option>
                                                    <option value="June">June</option>
                                                    <option value="July" disabled>July</option>
                                                    <option value="August">August</option>
                                                    <option value="September">September</option>
                                                    <option value="October">October</option>
                                                    <option value="November">November</option>
                                                    <option value="December">December</option>
                                                </select>
                                            </div>
                                            <div className="align-items-start d-flex flex-column flex-sm-row gap-1">
                                                <div className="align-items-center d-flex flex-row gap-1 w-100">
                                                    <label htmlFor="season">Season</label>
                                                    <select className="form-select py-1" id="season" name="Season" defaultValue="">
                                                        <option value=""></option>
                                                        {Array.from(
                                                            {length: Math.max(...jsonData.map(i => i.season))},
                                                            (_, i) => i + 1
                                                        ).map(n => (
                                                            <option key={n} value={`Season ${n}`}>{n}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="align-items-center d-flex flex-row gap-1 w-100">
                                                    <label htmlFor="year">Year</label>
                                                    <select className="form-select py-1" id="year" name="Year" defaultValue="">
                                                        <option value=""></option>
                                                        {Array.from(
                                                            {length: Math.max(...jsonData.map(i => i.year)) - 2004 + 1},
                                                            (_, i) => 2004 + i
                                                        ).map(y => (
                                                            <option key={y} value={y}>{y}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                                <div className="d-flex flex-column flex-sm-row gap-2 justify-content-between w-100">
                                    <button className="button" onClick={() => searchSubmit()} title="Search" type="submit">Search</button>
                                    <button className="button" onClick={reset} title="Reset" type="button">Reset</button>
                                </div>
                            </form>
                        </Tab>
                    </Tabs>
                </div>

                <div className="goal-results w-100">
                    <div className={`align-items-center d-flex gap-3 justify-content-start overflow-hidden w-100${showResultsBar ? ' show' : ''}`} id="results">
                        <strong className="badge py-2" data-count={sortedResults.length}>{`${sortedResults.length} Result${sortedResults.length !== 1 ? 's' : ''}`}</strong>
                        {showSort && <select className="form-select position-relative w-auto" name="Sort" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                            <option value="asc">Ascend</option>
                            <option value="desc">Descend</option>
                        </select>}
                    </div>
                    <Accordion className="goal-accordion shadow-lg w-100" defaultActiveKey="0" flush>
                        {sortedResults.map((result, index) => {
                            const goalLink = 'https://www.youtube-nocookie.com/embed' + result.link.replace(/"/g, "") + '&autohide=0&rel=0&modestbranding=1'
                            const [goalInt, goalDec] = result.goal.toString().split('.')
                            return (
                            <Accordion.Item key={result.goal} data-jersey={result.jersey} data-league={result.league} eventKey={index.toString()}>
                                <div className="accordion-header"><Accordion.Button onClick={lazyLoadFrame}>
                                    <div className="align-items-center d-flex gap-1 justify-content-start w-100">
                                        <strong className="align-items-center d-flex goal-count">
                                            <small className="fw-bold me-1" hidden={result.league === 'NHL Regular'}>{result.league === 'NHL Playoffs' ? 'Playoffs' : result.league === 'World Championships' ? 'Worlds' : result.league}</small>
                                            <span>{goalDec ? (goalDec.length === 1 ? goalDec + '0' : goalDec) : (result.league ? goalInt : '')}</span>
                                        </strong>
                                        <div className="align-items-center d-flex justify-content-center goal-siren">
                                            <img alt="Goal Siren icon" src="/icons/goal-siren.svg" width="36" height="36"/>
                                            <strong className="position-absolute type">{result.type}</strong>
                                        </div>
                                        <div className="align-items-center d-flex justify-content-center team-logo">
                                            <img alt={result.team} className="logo" src={'/teams/' + result.team + '.svg'} width="48" height="48" title={result.team}/>
                                        </div>
                                        <div className="align-items-start align-items-sm-center d-flex flex-column flex-sm-row gap-1 justify-content-center">
                                            <span className="badge">{result.month}/{result.day}/{String(result.year)}</span>
                                        </div>
                                    </div>
                                    <strong className="bottom-0 indexer p-1 position-absolute" hidden={index === 0}>{index + 1}</strong>
                                </Accordion.Button></div>
                                <Accordion.Body className="p-0 position-relative">
                                    <div className="d-flex flex-column p-3 py-2">
                                        {result.goalie && <p className="h5 ps-1">{result.goalie}</p>}
                                        <small className="align-items-start align-items-sm-center d-flex flex-wrap gap-1">
                                            <span className="badge text-bg-warning">{result.series}</span>
                                            <span className="badge text-bg-warning">{result.game && 'G' + result.game}</span>
                                            <span className={`badge ${result.result === 'W' ? 'text-bg-success' : 'text-bg-secondary'}`}>{result.result?.replace('W', 'Win').replace('L', 'Loss')}</span>
                                            <span className="badge text-bg-dark">{result.time} {{ First: 'P1', Second: 'P2', Third: 'P3', Overtime: 'OT' }[result.period] ?? result.period}</span>
                                            <span className="assist badge">{result.primary && result.primary + ' '}</span>
                                            <span className="assist badge">{result.secondary && result.secondary + ' '}</span>
                                        </small>
                                    </div>
                                    <iframe className="border-0 h-auto position-relative user-select-none w-100" width="560" height="315" src={index === 0 ? goalLink : 'about:blank'} data-src={goalLink} title="Alex Ovechkin Goal Video" referrerPolicy="cross-origin-with-strict-origin" allowFullScreen></iframe>
                                    <small className="bottom-0 link position-absolute px-1 start-0 text-bg-dark"><strong>ovechkin.app/?{result.goal}</strong></small>
                                </Accordion.Body>
                            </Accordion.Item>
                            )
                        })}
                    </Accordion>
                    {welcome &&
                        <Accordion className="shadow-lg w-100" defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <div className="accordion-header"><Accordion.Button className="fw-bold">Welcome to Ovechkin App</Accordion.Button></div>
                                <Accordion.Body>
                                    <p className="align-items-start d-flex flex-column flex-sm-row gap-2">
                                        <img alt="Goal Light" height="33" src="/gifs/goal-light.gif" width="18" />
                                        <span className="lead">Click or search to watch goals.</span>
                                        <img alt="Recording Light" height="30" src="/gifs/record-light.gif" width="30" />
                                    </p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-cursor" viewBox="0 0 16 16">
                                        <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103zM2.25 8.184l3.897 1.67a.5.5 0 0 1 .262.263l1.67 3.897L12.743 3.52z"/>
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" fill="currentColor" className="bi bi-type me-2" viewBox="0 0 16 16">
                                        <path d="m2.244 13.081.943-2.803H6.66l.944 2.803H8.86L5.54 3.75H4.322L1 13.081zm2.7-7.923L6.34 9.314H3.51l1.4-4.156zm9.146 7.027h.035v.896h1.128V8.125c0-1.51-1.114-2.345-2.646-2.345-1.736 0-2.59.916-2.666 2.174h1.108c.068-.718.595-1.19 1.517-1.19.971 0 1.518.52 1.518 1.464v.731H12.19c-1.647.007-2.522.8-2.522 2.058 0 1.319.957 2.18 2.345 2.18 1.06 0 1.716-.43 2.078-1.011zm-1.763.035c-.752 0-1.456-.397-1.456-1.244 0-.65.424-1.115 1.408-1.115h1.805v.834c0 .896-.752 1.525-1.757 1.525"/>
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-film" viewBox="0 0 16 16">
                                        <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm4 0v6h8V1zm8 8H4v6h8zM1 1v2h2V1zm2 3H1v2h2zM1 7v2h2V7zm2 3H1v2h2zm-2 3v2h2v-2zM15 1h-2v2h2zm-2 3v2h2V4zm2 3h-2v2h2zm-2 3v2h2v-2zm2 3h-2v2h2z"/>
                                    </svg>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    }
                    {searched &&
                        <Accordion className="shadow-lg w-100" defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <div className="accordion-header"><Accordion.Button className="fw-bold">No Results Found</Accordion.Button></div>
                                <Accordion.Body>
                                    <p>Please try again.</p>
                                    <p className="m-0"><a href="/help.html">Help</a></p>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    }
                </div>
            </div>
        </div>
    );
}

function App() {
    const [data, setData] = useState(null);

    useEffect(() => {
        if (window.location.hostname !== 'localhost') {
            window.addEventListener('load', () => {
                import('react-ga4').then(({default: ReactGA}) => {
                    _ga = ReactGA
                    ReactGA.initialize('G-K4X7EL6PW3')
                })
            }, { once: true })
        }

        fetch('goals.json').then(r => r.json()).then(setData)
    }, []);

    if (!data) {
        return <div className="opacity-25 text-center">Loading...</div>;
    }

    return (
        <SearchForm jsonData={data}/>
    );
}

export default App;
