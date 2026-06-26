import React, {useState, useEffect, useMemo} from 'react'
import ReactGA from 'react-ga4'
import Accordion from 'react-bootstrap/Accordion'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import 'bootstrap/dist/css/bootstrap.min.css'

if (window.location.hostname !== 'localhost') ReactGA.initialize('G-K4X7EL6PW3')

const totalGoals = 929
const canadianTeams = ['Calgary Flames', 'Edmonton Oilers', 'Montreal Canadiens', 'Ottawa Senators', 'Toronto Maple Leafs', 'Vancouver Canucks', 'Winnipeg Jets']
const hhofList = ['Carey Price', 'Ed Belfour', 'Martin Brodeur', 'Dominik Hasek', 'Henrik Lundqvist', 'Roberto Luongo', 'Pekka Rinne']
const youngGunsPlayers = ['Alex Semin', 'Mike Green', 'Nicklas Backstrom']
const normalize = (s) => s.toString().normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

function random(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function SearchForm({jsonData}) {
    const [searchGoal, setSearchGoal] = useState('')
    const [searchText1, setSearchText1] = useState('')
    const [searchText2, setSearchText2] = useState('')
    const [searchText3, setSearchText3] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [sortOrder, setSortOrder] = useState('asc')
    const [showSort, setShowSort] = useState(true)

    const sortedResults = useMemo(() =>
        [...searchResults].sort((a, b) => sortOrder === 'asc' ? a.goal - b.goal : b.goal - a.goal),
    [searchResults, sortOrder])

    const searchStrings = useMemo(() =>
        jsonData.map(item => (
            item.league + ' ' +
            'S' + item.season + ' ' +
            item.month + '/' + item.day + '/' + item.year + ' ' + item.dotw + ' ' +
            new Date(0, item.month - 1).toLocaleString('default', { month: 'long' }) + ' ' + item.year + ' ' +
            new Date(0, item.month - 1).toLocaleString('default', { month: 'long' }) + ' ' + item.day + ' ' + item.year + ' ' +
            (item.type ? item.type + ' ' : '') +
            (item.goalie ? item.goalie + ' ' : '') +
            item.team + ' ' +
            item.period + ' ' +
            (item.hoa ? item.hoa + ' ' : '') +
            item.jersey + ' Jersey ' +
            (item.search ? item.search + ' ' : '') +
            (item.btn1 ? item.btn1 + ' ' : '') + (item.btn2 ? item.btn2 + ' ' : '') + (item.btn3 ? item.btn3 + ' ' : '') +
            (item.primary ? item.primary + ' ' : '') + (item.secondary ? item.secondary : '')
        ).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()),
    [jsonData])

    useEffect(() => {
        const query = window.location.search.slice(1).split('?')[0].replace(/-/g, ' ').toLowerCase()
        const queryInteger = parseFloat(query)
        if (!['20th', '30th', '40th', '50th', '60th', '2nd', '3rd', '4th', '6v5', '5v3', '4v4', '360*'].includes(query) && !query.includes('/') && queryInteger > 0 && queryInteger <= totalGoals) {
            setSearchGoal(queryInteger)
            searchSubmit(queryInteger)
        } else if (query.includes('fbclid')) {
            const text1 = query.split('&fbclid')[0].split('+')[0]
            setSearchText1(text1)
            searchSubmit(undefined, text1)
        } else if (query.includes('+')) {
            const multipleSearch = query.split('+')
            const text1 = multipleSearch[0].split('&', 1)
            const text2 = multipleSearch[1].split('&', 1)
            const text3 = multipleSearch[2] ? multipleSearch[2].split('&', 1) : undefined
            setSearchText1(text1)
            setSearchText2(text2)
            if (multipleSearch[2]) setSearchText3(text3)
            searchSubmit(undefined, text1, text2, text3)
        } else if (query) {
            const text1 = query.split('&', 1)
            setSearchText1(text1)
            setSearchText2('')
            setSearchText3('')
            searchSubmit(undefined, text1)
        } else {
            shuffle()
        }
    }, [])

    useEffect(() => {
        const now = new Date()
        const month = now.getMonth() + 1
        const day = now.getDate()
        const checkDay = jsonData.filter(item => item.month === month && item.day === day)

        if (!checkDay[0]) {
            const otd = document.getElementById('otd')
            otd.disabled = true
            otd.title = 'No Goals on ' + month + '/' + day
        } else {
            document.getElementById('otd').title = 'Goals on ' + month + '/' + day
        }
    }, [jsonData])

    function canadian() {
        randomGoal(jsonData.filter(item => item.hoa === 'Away' && canadianTeams.includes(item.team)))
    }

    function cupRun() {
        randomGoal(jsonData.filter(item => item.year === 2018 && item.league === 'NHL Playoffs'))
    }

    function hhof() {
        randomGoal(jsonData.filter(item => hhofList.includes(item.goalie) || hhofList.includes(item.primary) || hhofList.includes(item.secondary)))
    }

    function lazyLoadFrame() {
        setTimeout(() => {
            let visibleFrame = document.querySelector('.accordion-collapse.show iframe')
            if (visibleFrame) {
                let dataSrc = visibleFrame.getAttribute('data-src')
                if (visibleFrame.getAttribute('src') === 'about:blank') {
                    visibleFrame.setAttribute('src', dataSrc)
                }
            }
        }, 500)
    }

    const handleGoalChange = (event) => {
        setSearchGoal(event.target.value)
    }

    const makeTextHandler = (setter) => (e) => {
        setSearchGoal('')
        setter(e.target.value.toLowerCase())
    }
    const handleText1 = makeTextHandler(setSearchText1)
    const handleText2 = makeTextHandler(setSearchText2)
    const handleText3 = makeTextHandler(setSearchText3)

    function onThisDay() {
        const now = new Date()
        randomGoal(jsonData.filter(item => item.month === now.getMonth() + 1 && item.day === now.getDate()))
    }

    const outdoor = () => {
        const input = parseInt(searchGoal)
        let goal
        if (input === 440) goal = 598
        else if (input === 475) goal = 602
        else if (input === 598) goal = 475
        else goal = 440
        setSearchGoal(goal)
        searchSubmit(goal)
    }

    const preventSubmit = (event) => {
        event.preventDefault()
    }

    function randomGoal(filtered) {
        const goal = filtered[Math.floor(Math.random() * filtered.length)].goal
        setSearchGoal(goal)
        searchSubmit(goal)
    }

    function filterGoal(match) {
        resultsHide()
        const result = jsonData.filter(item =>
            Object.values(item).some(value =>
                match.includes(value)
            )
        )
        const goal = Object.values(result[random(1, Object.keys(result).length)])
        setSearchGoal(goal[0])
        searchSubmit(goal[0])
    }

    function fromNick() {
        randomGoal(jsonData.filter(item => item.primary === "Nicklas Backstrom"))
    }

    const reset = () => {
        resultsHide()
        setSearchGoal('')
        setSearchResults([])
    }

    function resultsHide() {
        document.getElementById('results').classList.remove('show')
        setSearchText1('')
        setSearchText2('')
        setSearchText3('')
    }

    function searchSubmit(goalOverride, text1Override, text2Override, text3Override) {
        const currentGoal = goalOverride !== undefined ? goalOverride : searchGoal
        const currentText1 = text1Override !== undefined ? text1Override : searchText1
        const currentText2 = text2Override !== undefined ? text2Override : searchText2
        const currentText3 = text3Override !== undefined ? text3Override : searchText3

        const leagueFilter = normalize(document.getElementById('league').value)

        if (currentGoal) {
            resultsHide()
            const goalQuery = parseFloat(currentGoal)
            const results = jsonData.filter((item, i) =>
                item.goal === goalQuery && (!leagueFilter || searchStrings[i].includes(leagueFilter))
            )
            setSearchResults(results)
        } else if (currentText1.length > 0 || currentText2.length > 0 || currentText3.length > 0) {
            ReactGA.event({
                category: 'Search',
                action: 'Form Submitted',
                label: [currentText1, currentText2, currentText3].join(' ').trim()
            });
            const t1 = normalize(currentText1)
            const t2 = normalize(currentText2)
            const t3 = normalize(currentText3)
            const results = jsonData.filter((item, i) => {
                const search = searchStrings[i]
                return search.includes(t1) && search.includes(t2) && search.includes(t3) && (!leagueFilter || search.includes(leagueFilter))
            });

            if (results.length > 200) {
                const confirmAlert = window.confirm('This search loads ' + results.length + ' goals. Continue?');
                if (!confirmAlert) {
                    return;
                }
            }

            document.getElementById('results').classList.add('show')
            const count = document.getElementById('count')
            count.setAttribute('data-count', results.length)
            count.innerHTML = results.length + '&nbsp;Result'
            setShowSort(results.length > 1)
            setSearchResults(results)
        }
    }

    function hatTrick() {
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
        document.getElementById('results').classList.add('show')
        const count = document.getElementById('count')
        count.setAttribute('data-count', 3)
        count.innerHTML = '3 Result'
    }

    function unassisted() {
        randomGoal(jsonData.filter(item => item.primary === undefined))
    }

    const worldCup = () => {
        const goal = parseFloat(searchGoal) === 1.01 ? 525.02 : 1.01
        setSearchGoal(goal)
        searchSubmit(goal)
    }

    function youngGuns() {
        randomGoal(jsonData.filter(item => youngGunsPlayers.includes(item.primary) && youngGunsPlayers.includes(item.secondary)))
    }

    function shuffle() {
        const goal = Object.values(jsonData[random(1, Object.keys(jsonData).length)])
        setSearchGoal(goal[0])
        searchSubmit(goal[0])
    }

    return (
        <div className="container">
            <div className="align-items-center align-items-lg-start d-flex flex-column-reverse flex-lg-row gap-3 justify-content-between">
                <form className="align-items-start d-flex justify-content-center flex-column shadow-lg w-100" onSubmit={preventSubmit} onClick={(e) => {
                        const btn = e.target.closest('button')
                        if (!btn) return
                        const title = btn.title
                        if (title === 'Search' || title === 'Reset') return
                        ReactGA.event('goal_button_click', { button_name: title })
                    }}>
                    <Tabs defaultActiveKey="search" fill className="w-100">
                        <Tab eventKey="search" tabClassName="border-0 fw-bold p-3" title="Search">
                            <div className="align-items-start d-flex flex-column gap-3 p-3">
                                <div className="align-items-center d-flex flex-row justify-content-start mb-3">
                                    <label htmlFor="search-goal"><span className="d-none">Search by </span>Number</label>
                                    <input id="search-goal" min="0" max={totalGoals} step="any" type="number" placeholder="#" value={searchGoal} onChange={handleGoalChange}/>
                                </div>
                                <label htmlFor="search-text-1"><span className="d-none">Search by </span>Text</label>
                                <label className="d-none" htmlFor="search-text-2">Search by Text</label>
                                <label className="d-none" htmlFor="search-text-3">Search by Text</label>
                                <input id="search-text-1" type="text" placeholder="Search" value={searchText1} onChange={handleText1}/>
                                <input id="search-text-2" type="text" placeholder="And" value={searchText2} onChange={handleText2}/>
                                <input id="search-text-3" type="text" placeholder="And" value={searchText3} onChange={handleText3}/>
                                <div className="align-items-start align-items-sm-center d-flex flex-column flex-sm-row gap-3 justify-content-start">
                                    <label className="h6 m-0" htmlFor="league">Search Filter</label>
                                    <select className="form-select position-relative w-auto" id="league" name="League">
                                        <option value="" selected>All</option>
                                        <option className="fw-bold" value="NHL">NHL</option>
                                        <option value="NHL Regular">•&nbsp;NHL Regular</option>
                                        <option value="NHL Playoffs">•&nbsp;NHL Playoff</option>
                                        <option value="NHL All Star">•&nbsp;NHL All Star</option>
                                        <option value="KHL">KHL</option>
                                        <option value="Olympics">Olympic</option>
                                        <option value="World Championships">World Championship</option>
                                        <option value="World Cup">World Cup</option>
                                    </select>
                                    <button onClick={() => searchSubmit()} title="Search" type="submit">Search</button>
                                </div>
                                <button className="text-start" onClick={reset} title="Reset" type="button">Reset</button>
                            </div>
                        </Tab>
                        <Tab eventKey="random" tabClassName="border-0 fw-bold p-3" title="Random">
                            <div className="p-3">
                                <div className="align-items-center d-flex flex-row justify-content-start mb-3">
                                    <label htmlFor="random-goal"><span className="d-none">Random </span>Number</label>
                                    <input className="pe-none" id="random-goal" min="0" max={totalGoals} step="any" type="number" placeholder="#" value={searchGoal} onChange={handleGoalChange}/>
                                </div>
                                <div className="align-items-start buttons-group d-flex flex-row gap-2 justify-content-center">
                                    <div className="d-flex flex-column gap-2 league-buttons">
                                        <button onClick={(event) => shuffle()} title="Shuffle" type="button">
                                            <img alt="Shuffle icon" src="/icons/shuffle.svg"/>Shuffle
                                        </button>
                                        <button onClick={(event) => filterGoal(['NHL Regular'])} title="NHL Regular Season" type="button">
                                            <img alt="NHL logo" src="/teams/NHL.svg"/>NHL
                                        </button>
                                        <button onClick={(event) => filterGoal(['NHL Playoffs'])} title="NHL Playoff" type="button">
                                            <img alt="NHL logo" src="/teams/NHL.svg"/>Playoffs
                                        </button>
                                        <button className="cup" onClick={cupRun} title="Cup Run" type="button">Cup&nbsp;Run</button>
                                        <button onClick={(event) => filterGoal(['All Star'])} title="NHL All Star" type="button">
                                            <img alt="NHL logo" src="/teams/NHL.svg"/>All&nbsp;Star
                                        </button>
                                        <button onClick={(event) => filterGoal(['KHL'])} title="KHL" type="button">
                                            <img alt="KHL logo" src="/teams/KHL.svg"/>KHL
                                        </button>
                                        <button onClick={(event) => filterGoal(['Olympics'])} title="Olympic" type="button">
                                            <img alt="Olympics logo" src="/icons/olympics.svg"/>Olympics
                                        </button>
                                        <button onClick={(event) => filterGoal(['World Championships'])} title="World Championship" type="button">
                                            <img alt="Trophy logo" src="/icons/trophy.svg"/>Worlds
                                        </button>
                                        <button onClick={worldCup} title="World Cup" type="button">
                                            <img alt="Cup logo" src="/icons/cup.svg"/>World&nbsp;Cup
                                        </button>
                                    </div>
                                    <div className="d-flex flex-column gap-2">
                                        <button onClick={(event) => filterGoal(['Capitol'])} className="jersey-button" title="Capitol" type="button">
                                            <img alt="Capitol logo" className="jersey-logo" src="/jerseys/capitol.svg"/>
                                        </button>
                                        <button onClick={(event) => filterGoal(['Screagle'])} className="jersey-button" title="Screagle" type="button">
                                            <img alt="Screagle logo" className="jersey-logo" src="/jerseys/screagle.svg"/>
                                        </button>
                                        <button onClick={(event) => filterGoal(['Red'])} className="jersey-button" title="Red" type="button">
                                            <img alt="Capitals logo" className="jersey-logo" src="/jerseys/capitals.svg"/>
                                        </button>
                                        <button onClick={(event) => filterGoal(['White'])} className="jersey-button" title="White" type="button">
                                            <img alt="Capitals logo" className="jersey-logo" src="/jerseys/capitals.svg"/>
                                        </button>
                                        <button onClick={(event) => filterGoal(['Throwback'])} className="jersey-button" title="Throwback" type="button">
                                            ☆&nbsp;&nbsp;<img alt="Throwback logo" className="jersey-logo" src="/jerseys/throwback.svg"/>&nbsp;&nbsp;☆
                                        </button>
                                        <button onClick={outdoor} className="jersey-button multi-logo" title="Brick / Stadium" type="button">
                                            <span>
                                                <img alt="Brick Stripes logo" className="jersey-logo" src="/jerseys/brick.svg"/>
                                            </span>
                                            <span>
                                                <img alt="Stadium Series logo" className="jersey-logo" src="/jerseys/caps.svg"/>
                                            </span>
                                        </button>
                                        <button onClick={(event) => filterGoal(['Navy Third'])} className="jersey-button" title="Navy" type="button">
                                            <img alt="Navy logo" className="jersey-logo" src="/jerseys/navy.svg"/>
                                        </button>
                                        <button onClick={(event) => filterGoal(['Black Reverse Retro',])} className="jersey-button" title="Black Reverse Retro" type="button">
                                            <img alt="Black Reverse Retro logo" className="jersey-logo" src="/jerseys/retro.svg"/>
                                        </button>
                                        <button onClick={(event) => filterGoal(['Red Reverse Retro'])} className="jersey-button" title="Red Reverse Retro" type="button">
                                            <img alt="Red Reverse Retro logo" className="jersey-logo" src="/jerseys/retro.svg"/>
                                        </button>
                                    </div>
                                    <div className="d-flex flex-column gap-2">
                                        <button onClick={(event) => filterGoal(['Away'])} title="Away" type="button">Away</button>
                                        <button onClick={(event) => filterGoal(['Home'])} title="Home" type="button">Home</button>
                                        <button onClick={(event) => filterGoal(['Empty Net'])} title="Empty Net" type="button">ENG</button>
                                        <button onClick={(event) => filterGoal(['GWG', 'Overtime'])} title="Game Winner" type="button">GWG</button>
                                        <button onClick={hatTrick} title="Hat Trick" type="button">Hat&nbsp;Trick</button>
                                        <button onClick={(event) => filterGoal(['Overtime'])} title="Overtime" type="button">OT</button>
                                        <button onClick={(event) => filterGoal(['5v3', 'PPG'])} title="Power Play" type="button">PPG</button>
                                        <button onClick={(event) => filterGoal(['Rookie'])} title="Rookie" type="button">Rookie</button>
                                        <button onClick={unassisted} title="Unassisted" type="button">Unassisted</button>
                                    </div>
                                    <div className="d-flex flex-column gap-2">
                                        <button onClick={(event) => filterGoal(['Backhand'])} title="Backhand" type="button">Backhand</button>
                                        <button onClick={canadian} title="In Canada" type="button">In&nbsp;Canada</button>
                                        <button onClick={fromNick} title="From Nicklas Backstrom" type="button">From&nbsp;Nick</button>
                                        <button onClick={hhof} title="Hockey Hall of Fame" type="button">HHoF</button>
                                        <button onClick={onThisDay} id="otd" title="On This Day" type="button">On&nbsp;This&nbsp;Day</button>
                                        <button onClick={(event) => filterGoal(['Post'])} title="Post" type="button">Post</button>
                                        <button onClick={(event) => filterGoal(['Slapshot'])} title="Slapshot" type="button">Slapshot</button>
                                        <button onClick={(event) => filterGoal(['Tip'])} title="Tip" type="button">Tip</button>
                                        <button onClick={youngGuns} title="Young Guns" type="button">Young&nbsp;Guns</button>
                                    </div>
                                </div>
                            </div>
                        </Tab>
                    </Tabs>
                </form>

                <div className="w-100">
                    <div className="align-items-center d-flex gap-2 justify-content-start w-100" id="results">
                        <strong id="count"></strong>
                        {showSort && <select className="form-select position-relative w-auto" name="Sort" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                            <option value="asc">Ascend</option>
                            <option value="desc">Descend</option>
                        </select>}
                    </div>
                    <Accordion className="shadow-lg w-100" defaultActiveKey="0" flush>
                        {sortedResults.map((result, index) => {
                            const goalLink = 'https://www.youtube.com/embed' + result.link.replace(/"/g, "") + '&autohide=0&rel=0&modestbranding=1'
                            return (
                            <Accordion.Item data-jersey={result.jersey} data-league={result.league} eventKey={index.toString()}>
                                <Accordion.Header onClick={lazyLoadFrame}>
                                    <div className="align-items-center d-flex gap-1 justify-content-start w-100">
                                        <strong className="align-items-center d-flex goal-count">
                                            <span>{result.goal.toString().split('.')[0]}</span>
                                            <span data-float={result.goal.toString().split('.')[1]}>{result.goal.toString().split('.')[1]}</span>
                                        </strong>
                                        <div className="align-items-center d-flex justify-content-center goal-siren">
                                            <img alt="Goal Siren icon" src="/icons/goal-siren.svg"/>
                                            <strong className="position-absolute type">{result.type}</strong>
                                        </div>
                                        <img alt={result.team} className="logo" src={'/teams/' + result.team + '.svg'} title={result.team}/>
                                        <div className="align-items-start align-items-sm-center d-flex flex-column flex-sm-row gap-1 justify-content-center">
                                            <strong>{result.month}/{result.day}/{result.year}</strong>
                                            <strong className="goalie">{result.goalie}</strong>
                                        </div>
                                    </div>
                                    <strong className="bottom-0 indexer p-1 position-absolute start-0">{index + 1}</strong>
                                </Accordion.Header>
                                <Accordion.Body className="p-0 position-relative">
                                    <div className="d-flex flex-column p-3 py-2">
                                        <small className="align-items-start align-items-sm-center d-flex flex-column flex-sm-row gap-1">
                                            <span className="badge">{result.primary && result.primary + ' '}</span>
                                            <span className="badge">{result.secondary && result.secondary + ' '}</span>
                                            {result.btn1 && result.btn1 + ' '}
                                            {result.btn2 && result.btn2 + ' '}
                                            {result.btn3 && result.btn3 + ' '}
                                            {result.search}
                                        </small>
                                    </div>
                                    <iframe className="border-0 h-auto position-relative user-select-none w-100" width="560" height="315" src={index === 0 ? goalLink : 'about:blank'} data-src={goalLink} title="Alex Ovechkin Goal Video" referrerPolicy="cross-origin-with-strict-origin" allowFullScreen></iframe>
                                    <small className="bottom-0 link position-absolute px-1 start-0 text-bg-dark user-select-all"><strong>ovechkin.app/?{result.goal}</strong></small>
                                </Accordion.Body>
                            </Accordion.Item>
                            )
                        })}
                    </Accordion>
                </div>
            </div>
        </div>
    );
}

function App() {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('goals.json');
            const json = await response.json();
            setData(json);
        }
        fetchData();
    }, []);

    if (!data) {
        return <div className="loading opacity-25">Loading...</div>;
    }

    return (
        <SearchForm jsonData={data}/>
    );
}

export default App;
