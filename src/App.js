import React, {useState, useEffect} from 'react';
import ReactGA from 'react-ga4';
import Accordion from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactGA.initialize('G-K4X7EL6PW3');

ReactGA.send({
    hitType: "pageview",
    page: "www.ovechkin.app",
    title: "Ovechkin App"
});


const totalGoals = 928;

function SearchForm({jsonData}) {
    const [searchGoal, setSearchGoal] = useState('');
    const [searchText1, setSearchText1] = useState('');
    const [searchText2, setSearchText2] = useState('');
    const [searchText3, setSearchText3] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (searchGoal) {
            resultsHide();
            const goalQuery = parseFloat(searchGoal);
            const results = jsonData.filter(item => item.goal === goalQuery)
            setSearchResults(results);
            ReactGA.event({
                category: 'Goal Requests',
                action: 'Click',
                label: 'Goal #' + goalQuery,
                value: 1
            });
        }

        const search1Value = document.getElementById('search-text-1').value.length;
        if (search1Value > 2) {
            const results = jsonData.filter((item) => {
                const search =
                    item.month + '/' + item.day + '/' + item.year + ' ' +
                    item.season + ' ' +
                    item.type + ' ' +
                    item.goalie + ' ' + item.goalie2 + ' ' +
                    item.team + ' ' +
                    item.period + ' ' +
                    item.hoa + ' ' +
                    item.jersey + ' ' +
                    item.search + ' ' +
                    item.btn1 + ' ' + item.btn2 + ' ' + item.btn3 + ' ' +
                    item.primary + ' ' + item.secondary
                return (
                    search.toLowerCase().includes(searchText1) &&
                    search.toLowerCase().includes(searchText2) &&
                    search.toLowerCase().includes(searchText3) &&
                    item.season.includes(document.getElementById('type').value)
                );
            });
            document.getElementById('advanced').classList.add('show');
            document.getElementById('minimum').classList.remove('show');
            document.getElementById('count').setAttribute('data-count', results.length);
            document.getElementById('count').innerHTML = results.length + '&nbsp;Result';
            setSearchResults(results);
        }
        if (search1Value === 0) {
            document.getElementById('advanced').classList.remove('show');
            document.getElementById('minimum').classList.remove('show');
        } else if (search1Value < 3) {
            document.getElementById('advanced').classList.remove('show');
            document.getElementById('minimum').classList.add('show');
            setSearchResults([]);
        }
    }, [searchGoal, searchText1, searchText2, searchText3, jsonData]);

    useEffect(() => {
        const query = window.location.search.slice(1).split('?')[0].replace(/-/g, ' ').toLowerCase();
        const queryInteger = parseFloat(query);
        if (!['20th', '30th', '40th', '50th', '60th', '2nd', '3rd', '4th', '6v5', '5v3', '4v4', '360*'].includes(query) && queryInteger > 0 && queryInteger <= totalGoals) {
            setSearchGoal(queryInteger);
        } else if (query.includes('fbclid')) {
            setSearchText1(query.split('&fbclid')[0].split('+')[0])
        } else if (query.includes('+')) {
            const multipleSearch = query.split('+');
            setSearchText1(multipleSearch[0].split('&', 1));
            setSearchText2(multipleSearch[1].split('&', 1));
            if (multipleSearch[2]) {
                setSearchText3(multipleSearch[2].split('&', 1));
            }
        } else if (query) {
            setSearchText1(query.split('&', 1));
            setSearchText2('');
            setSearchText3('');
        }
    },[]);

    useEffect(() => {
        const month = new Date().getMonth() + 1
        const day = new Date().getDate()
        const checkDay = jsonData.filter(item => item.month === month && item.day === day)

        if (!checkDay[0]) {
            document.getElementById('otd').disabled = true;
            document.getElementById('otd').title = 'No Goals on ' + month + ' ' + day;
        } else {
            document.getElementById('otd').title = 'Goals on ' + month + ' ' + day;
        }
    });

    function canadian() {
        const canada = ['Calgary Flames', 'Edmonton Oilers', 'Montreal Canadiens', 'Ottawa Senators', 'Toronto Maple Leafs', 'Vancouver Canucks', 'Winnipeg Jets']
        const canadian = jsonData.filter(item => item.hoa === 'Away' && canada.includes(item.team))
        const random = Math.floor(Math.random() * canadian.length);
        setSearchGoal(canadian[random].goal)
    }

    function cupRun() {
        const cupRun = jsonData.filter(item => item.year === 2018 && item.season === 'NHL Playoffs')
        const random = Math.floor(Math.random() * cupRun.length);
        setSearchGoal(cupRun[random].goal)
    }

    function dataSrc() {
        setTimeout(() => {
            let visibleFrame = document.querySelector('.accordion-collapse.show iframe')
            if (visibleFrame) {
                let dataSrc = document.querySelector('.accordion-collapse.show iframe').getAttribute('data-src')
                if (!visibleFrame.hasAttribute('src')) {
                    document.querySelector('.accordion-collapse.show iframe').setAttribute('src', dataSrc)
                }
            }
        }, 500);
    }

    const handleGoalChange = (event) => {
        if (event.target.value < totalGoals + 1) {
            setSearchGoal(event.target.value);
        }
    };

    const handleSeasonChange = (event) => {
        const searchText1 = document.getElementById('search-text-1').value;
        const searchText2 = document.getElementById('search-text-2').value;
        const searchText3 = document.getElementById('search-text-3').value;
        setSearchText1([searchText1]);
        setSearchText2([searchText2]);
        setSearchText3([searchText3]);
    };

    const handleText1 = (event) => {
        setSearchGoal('');
        setSearchText1(event.target.value.toLowerCase());
    };

    const handleText2 = (event) => {
        setSearchGoal('');
        setSearchText2(event.target.value.toLowerCase());
    };

    const handleText3 = (event) => {
        setSearchGoal('');
        setSearchText3(event.target.value.toLowerCase());
    };

    function onThisDay() {
        const month = new Date().getMonth() + 1
        const day = new Date().getDate()
        const onThisDay = jsonData.filter(item => item.month === month && item.day === day)
        const random = Math.floor(Math.random() * onThisDay.length);
        setSearchGoal(onThisDay[random].goal)
    }

    const outdoor = () => {
        const input = parseInt(document.querySelector('#search-goal').value)
        if (input === 440) {setSearchGoal(598)}
        else if (input === 475) {setSearchGoal(602)}
        else if (input === 598) {setSearchGoal(475)}
        else {setSearchGoal(440)}
    };

    const preventSubmit = (event) => {
        event.preventDefault();
    };

    function random(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function filterGoal(match) {
        resultsHide();
        const result = jsonData.filter(item =>
            Object.values(item).some(value =>
                match.includes(value)
            )
        );
        const goal = Object.values(result[random(1, Object.keys(result).length)]);
        setSearchGoal(goal[0]);
    }

    function fromNick() {
        const fromNick = jsonData.filter(item => item.primary === "Nicklas Backstrom")
        const random = Math.floor(Math.random() * fromNick.length);
        setSearchGoal(fromNick[random].goal)
    }

    function shuffle(match) {
        resultsHide();
        const result = jsonData;
        const goal = Object.values(result[random(1, Object.keys(result).length)]);
        setSearchGoal(goal[0]);
    }

    const reset = () => {
        resultsHide();
        setSearchGoal('');
        setSearchResults([]);
    };

    function resultsHide() {
        document.getElementById('advanced').classList.remove('show');
        document.getElementById('minimum').classList.remove('show');
        document.getElementById('type').value = '';
        setSearchText1('');
        setSearchText2('');
        setSearchText3('');
    }

    function unassisted() {
        const unassisted = jsonData.filter(item => item.primary === undefined)
        const random = Math.floor(Math.random() * unassisted.length);
        setSearchGoal(unassisted[random].goal)
    }

    function youngGuns() {
        const youngGuns = ['Alex Semin', 'Mike Green', 'Nicklas Backstrom']
        const youngGunsGoals = jsonData.filter(item => {
            return youngGuns.includes(item.primary) && youngGuns.includes(item.secondary)
        })
        const random = Math.floor(Math.random() * youngGunsGoals.length);
        setSearchGoal(youngGunsGoals[random].goal)
    }

    return (
        <div className="container">
            <div className="align-items-start d-flex flex-column flex-lg-row justify-content-center">
                <div id="remote">
                    <form className="align-items-start d-flex justify-content-center flex-column mx-auto my-3 p-1 p-sm-3 py-3 shadow" onSubmit={preventSubmit}>
                        <div className="align-items-center d-flex justify-content-between flex-column gap-3 mb-3">
                            <h2 className="h5 m-0">Search by Number</h2>
                            <label className="hide" htmlFor="search-goal">Number</label>
                            <input id="search-goal" min="1" max={totalGoals} step="any" type="number" placeholder="#" value={searchGoal} onChange={handleGoalChange}/>
                            <h2 className="h5 m-0"><span className="hide">Search by </span>Text</h2>
                            <label className="hide" htmlFor="search-text-1">Text</label>
                            <label className="hide" htmlFor="search-text-2">Text</label>
                            <label className="hide" htmlFor="search-text-3">Text</label>
                            <input id="search-text-1" type="text" placeholder="Search" value={searchText1} onChange={handleText1}/>
                            <input id="search-text-2" type="text" placeholder="And" value={searchText2} onChange={handleText2}/>
                            <input id="search-text-3" type="text" placeholder="And" value={searchText3} onChange={handleText3}/>
                            <strong className="h5 m-0">or</strong>
                            <h3><button onClick={(event) => shuffle()} title="Random Goal" type="button">Shuffle</button></h3>
                        </div>
                        <div className="align-items-start buttons-group d-flex flex-row gap-3 mb-3">
                            <div className="d-flex flex-column gap-3 league-buttons">
                                <button onClick={(event) => filterGoal(['NHL Regular'])} title="NHL Regular Season" type="button">
                                    <img alt="NHL logo" src="/teams/NHL.svg" />NHL
                                </button>
                                <button onClick={(event) => filterGoal(['NHL Playoffs'])} title="NHL Playoff" type="button">
                                    <img alt="NHL logo" src="/teams/NHL.svg" />Playoffs
                                </button>
                                <button className="cup" onClick={cupRun} title="Cup Run" type="button">Cup&nbsp;Run</button>
                                <button onClick={(event) => filterGoal(['All Star'])} title="NHL All Star" type="button">
                                    <img alt="NHL logo" src="/teams/NHL.svg" />All&nbsp;Star
                                </button>
                                <button onClick={(event) => filterGoal(['KHL'])} title="KHL" type="button">
                                    <img alt="KHL logo" src="/teams/KHL.svg" />KHL
                                </button>
                                <button onClick={(event) => filterGoal(['Olympics'])} title="Olympic" type="button">
                                    <img alt="Olympics logo" src="/icons/Olympics.svg" />Olympics
                                </button>
                                <button onClick={(event) => filterGoal(['World Championships'])} title="World Championships" type="button">
                                    <img alt="Trophy logo" src="/icons/Trophy.svg" />Worlds
                                </button>
                                <button onClick={(event) => filterGoal(['World Cup'])} title="World Cup" type="button">
                                    <img alt="Cup logo" src="/icons/Cup.svg" />World&nbsp;Cup
                                </button>
                            </div>
                            <div className="d-flex flex-column gap-3">
                                <button onClick={(event) => filterGoal(['Capitol'])} className="jersey-button" title="Capitol" type="button">
                                    <img alt="Capitol logo" className="jersey-logo" src="/jerseys/capitol.svg" />
                                </button>
                                <button onClick={(event) => filterGoal(['Screagle'])} className="jersey-button" title="Screagle" type="button">
                                    <img alt="Screagle logo" className="jersey-logo" src="/jerseys/screagle.svg" />
                                </button>
                                <button onClick={(event) => filterGoal(['Red Default', 'White Default'])} className="jersey-button" title="Capitals" type="button">
                                    <img alt="Capitals logo" className="jersey-logo" src="/jerseys/capitals.svg" />
                                </button>
                                <button onClick={(event) => filterGoal(['Red Throwback', 'White Throwback'])} className="jersey-button" title="Throwback Third" type="button">
                                    ☆&nbsp;&nbsp;<img alt="Throwback logo" className="jersey-logo" src="/jerseys/throwback.svg" />&nbsp;&nbsp;☆
                                </button>
                                <button onClick={outdoor} className="jersey-button multi-logo" title="Brick / Stadium" type="button">
                                    <span>
                                        <img alt="Brick Stripes logo" className="jersey-logo" src="/jerseys/brick.svg" />
                                    </span>
                                    <span>
                                        <img alt="Stadium Series logo" className="jersey-logo" src="/jerseys/caps.svg" />
                                    </span>
                                </button>
                                <button onClick={(event) => filterGoal(['Navy Third'])} className="jersey-button" title="Navy Third" type="button">
                                    <img alt="Navy logo" className="jersey-logo" src="/jerseys/navy.svg" />
                                </button>
                                <button onClick={(event) => filterGoal(['Black Reverse Retro',])} className="jersey-button" title="Black Reverse Retro" type="button">
                                    <img alt="Black Reverse Retro logo" className="jersey-logo" src="/jerseys/retro.svg" />
                                </button>
                                <button onClick={(event) => filterGoal(['Red Reverse Retro'])} className="jersey-button" title="Red Reverse Retro" type="button">
                                    <img alt="Red Reverse Retro logo" className="jersey-logo" src="/jerseys/retro.svg" />
                                </button>
                            </div>
                            <div className="d-flex flex-column gap-3">
                                <button onClick={(event) => filterGoal(['Away'])} title="Away" type="button">Away</button>
                                <button onClick={(event) => filterGoal(['Home'])} title="Home" type="button">Home</button>
                                <button onClick={(event) => filterGoal(['Empty Net'])} title="Empty Net" type="button">ENG</button>
                                <button onClick={(event) => filterGoal(['GWG', 'Overtime'])} title="Game Winner" type="button">GWG</button>
                                <button onClick={(event) => filterGoal(['Hat Trick'])} title="Hat Trick" type="button">Hat&nbsp;Trick</button>
                                <button onClick={(event) => filterGoal(['Overtime'])} title="Overtime" type="button">OT</button>
                                <button onClick={(event) => filterGoal(['5v3', 'PPG'])} title="Power Play" type="button">PPG</button>
                                <button onClick={unassisted} title="Unassisted" type="button">Unassisted</button>
                            </div>
                            <div className="d-flex flex-column gap-3">
                                <button onClick={(event) => filterGoal(['Backhand'])} title="Backhand" type="button">Backhand</button>
                                <button onClick={canadian} title="In Canada" type="button">In&nbsp;Canada</button>
                                <button onClick={fromNick} title="From Nicklas Backstrom" type="button">From&nbsp;Nick</button>
                                <button onClick={onThisDay} id="otd" title="On This Day" type="button">On&nbsp;This&nbsp;Day</button>
                                <button onClick={(event) => filterGoal(['Post'])} title="Post" type="button">Post</button>
                                <button onClick={(event) => filterGoal(['Slapshot'])} title="Slapshot" type="button">Slapshot</button>
                                <button onClick={(event) => filterGoal(['Tip'])} title="Tip" type="button">Tip</button>
                                <button onClick={youngGuns} title="Young Guns" type="button">Young&nbsp;Guns</button>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center">
                            <button onClick={reset} title="Reset Filters" type="button">Reset</button>
                        </div>
                    </form>
                </div>

                <div className="p-1 p-sm-3" id="wrapper">
                    <div className="search-accordion" id="minimum">
                        <strong>Search Requires 3 Letters Minimum</strong>
                    </div>
                    <div className="align-items-center d-flex gap-2 justify-content-center mb-3 search-accordion" id="advanced">
                        <label htmlFor="type" hidden>Type</label>
                        <select id="type" name="Type" onChange={handleSeasonChange}>
                            <option name="All Goals" value="" selected>All Goals</option>
                            <option name="NHL Regular" value="NHL Regular">NHL Regular</option>
                            <option name="NHL Playoff" value="NHL Playoffs">NHL Playoffs</option>
                            <option name="All Star" value="All Star">All Star</option>
                            <option name="KHL" value="KHL">KHL</option>
                            <option name="Olympics" value="Olympics">Olympics</option>
                            <option name="World Championships" value="World Championships">Worlds</option>
                            <option name="World Cup" value="World Cup">World Cup</option>
                        </select>
                        <strong id="count"></strong>
                    </div>

                    <Accordion defaultActiveKey="0" flush>
                    {searchResults.map((result, index) => (
                        <Accordion.Item data-jersey={result.jersey} data-season={result.season} eventKey={index.toString()}>
                            <Accordion.Header onClick={dataSrc}>
                                    <div className="align-items-center d-flex gap-2 justify-content-start w-100">
                                        <strong className="align-items-center d-flex goal-count">
                                            <span>{result.goal.toString().split('.')[0]}</span>
                                            <span data-float={result.goal.toString().split('.')[1]}>{result.goal.toString().split('.')[1]}</span>
                                        </strong>
                                        <img alt={result.team + ' logo'} className="logo" src={'/teams/' + result.team + '.svg'} title={result.team}/>
                                        <strong className="d-none d-sm-block">{result.month}/{result.day}/{result.year}</strong>
                                        <strong>{result.goalie}</strong>
                                    </div>
                                <div className="align-items-center d-flex justify-content-center goal-siren me-md-3">
                                    <img alt="Goal Siren icon" src="/icons/goal-siren.svg"/>
                                    <strong className="position-absolute type">{result.type}</strong>
                                </div>
                                    <strong className="bottom-0 end-0 indexer p-1 position-absolute">{index + 1}</strong>
                            </Accordion.Header>
                            <Accordion.Body>
                                <div>
                                    <iframe width="560" height="315" {...(index === 0 ? {'src': 'https://www.youtube.com/embed' + result.link.replace(/"/g, "") + '&autohide=0&rel=0&modestbranding=1'} : {})} data-src={'https://www.youtube.com/embed' + result.link.replace(/"/g, "") + '&autohide=0&rel=0&modestbranding=1'} title="Alex Ovechkin Goal Video" referrerPolicy="cross-origin-with-strict-origin" allowFullScreen loading="lazy"></iframe>
                                    <div className="d-flex flex-column">
                                        <small>{result.btn1} {result.btn2} {result.btn3} {result.search} {result.primary} {result.secondary}</small>
                                        <small className="link"><strong>ovechkin.app/?{result.goal}</strong></small>
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                    </Accordion>
                </div>
             {/*<div id="auto">
                    <svg xmlns="http://www.w3.org/2000/svg" width="139" height="250" viewBox="0 0 249 453"><path fill="#c8102e" d="M90 8q-10 8-18 26l-2 5-3 12-3 12a347 347 0 0 0-8 59l-2 16-1 72a610 610 0 0 0 5 108v22l-2 14-2 19-7 42c-3 13-4 15-5 15-2 0-8-5-10-9l-2-9-7-24-11-85 2 5 3 11 2 10q6 21 16 23 6 0 1-4c-3-2-7-9-7-12l-1-3-4-15-8-23q-3-3-5-3-4 0-5 3-4 7 0 31a227 227 0 0 1 6 43l2 9 2 9v4l1 2 3 9q5 18 9 24c3 4 11 9 14 9 7 0 10-6 15-27l7-49 3 12 3 13 12 37 3 2 4 2q10 2 13-12l1-7 1-4q1-3 3 0l5 1 3-1v12l2 11 3 18q2 7 5 6h3l1-12 3-28 3-21 4-40 9-45 4-17 23-95 3-9 7-22 7-22 15-35c0-4 8-20 14-28q10-13 13-14c2 0-1 16-5 27l-2 5-4 11-1 3-1 2-1 1v3l-2 6-4 15-7 21a476 476 0 0 0-17 105l-8 57q-4 3-13 5-5 3-5-12 1-9 3-16 7-16 10-18l3-4 2-3-3-1q-1-3-7 4c-5 5-8 9-12 20q-6 16-4 24 1 9 6 11 6 2 14-1l6-1-1 8c-2 9-2 37 0 38l3 1c2-1 3-4 3-20l2-24c0-7-1-6 13-14l18-9c5-1 5 8 0 19a346 346 0 0 1-28 45l-21 39-2 6q-3 8-2 9 3 3 7-3l2-3 1-2 1-2 1-3 1-2 1-1q-1-2 5-12l44-75 2-9q1-6-3-9-7-6-26 3l-8 5q-5 4-4-1l1-6 1-8 2-9 5-46 1-11a311 311 0 0 1 9-51 142 142 0 0 1 9-34l1-5 2-5 1-4 3-8 3-10c14-35 17-50 13-55q-3-3-11-2c-5 2-17 15-23 27l-3 5-13 28a336 336 0 0 0-24 74l-7 26-6 24-11 47-6 26-1 6-1 7-6 35-4 29-3 22-1-11q-1-17 2-29l1-11 5-32 1-12 9-61 5-40 9-71c2-11 1-37-1-42q0-5-6-4-3-1-7 4l-7 12-4 8c-3 5-7 20-8 29l-8 43-1 9-1 9-1 16-1 10v1a1095 1095 0 0 1 1 116l2 18q2 21-1 21t-4-15q1-13-6-12l-2-1-1-1-1 17-3 27q-1 9-4 11c-1 0-4-10-5-17l-3-15-2-25c0-17-1-23-2-28q-1-4-5-3l-5 1q-1 2-1-3l1-7 2-12a793 793 0 0 0 12-81l7-42 11-69 3-20 3-15 2-15c6-28 7-50 3-57s-5-8-12-8q-6-1-10 4m15 5q2 4 1 14a276 276 0 0 1-7 55l-1 9-4 21-2 11-1 7-1 4-2 20-2 8-2 15-3 14-4 27-4 30-3 18-2 10v10l-3 13q-2 9-2-8a3260 3260 0 0 1 1-166l2-16q6-56 17-80l10-16q4-5 8-5 2 0 4 5m43 123-3 32-3 19-5 36-2 12-6 57-3 18-2 11-1 10-2 7-1 2v13l-1-6V232l2-22c0-10 1-15 4-32l2-14a168 168 0 0 1 18-57l3-3v33"/></svg>
                </div>*/}
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
        return <div className="opacity-25">Loading...</div>;
    }

    return (
        <div>
            <SearchForm jsonData={data}/>
        </div>
    );
}

export default App;
