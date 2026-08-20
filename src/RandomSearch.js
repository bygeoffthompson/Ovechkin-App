import Accordion from 'react-bootstrap/Accordion'
import {TEAMS} from './constants'

const canadianTeams = ['Calgary Flames', 'Edmonton Oilers', 'Montreal Canadiens', 'Ottawa Senators', 'Toronto Maple Leafs', 'Vancouver Canucks', 'Winnipeg Jets']
const youngGunsPlayers = ['Alex Semin', 'Mike Green', 'Nicklas Backstrom']
const JERSEYS = [
    { filter: 'Capitol',             title: 'Capitol',             src: 'capitol',   size: 36 },
    { filter: 'Screagle',            title: 'Screagle',            src: 'screagle',  size: 36 },
    { filter: 'Red',                 title: 'Red',                 src: 'capitals',  size: 36, alt: 'Capitals', ariaLabel: 'Red jersey' },
    { filter: 'White',               title: 'White',               src: 'capitals',  size: 36, alt: 'Capitals', ariaLabel: 'White jersey' },
    { filter: 'Navy W',              title: 'Navy',                src: 'navy',      size: 24, ariaLabel: 'Navy jersey' },
    { filter: 'Black Reverse Retro', title: 'Black Reverse Retro', src: 'retro',     size: 36, alt: 'Screagle', ariaLabel: 'Black Reverse Retro jersey' },
    { filter: 'Red Reverse Retro',   title: 'Red Reverse Retro',   src: 'retro',     size: 36, alt: 'Screagle', ariaLabel: 'Red Reverse Retro jersey' },
]

export default function RandomSearch({ jsonData, searchGoal, searchText, filters, leagueCounts, filterOptions, seasonOptions, yearOptions, canFilter, canRandom, canHatTrick, handleText, handleGoalNumber, handleFilter, filterGoal, randomGoal, outdoor, hatTrick, reset, autoplay, setAutoplay }) {
    return (
        <div className="d-flex flex-column w-100" id="random-search">
            <div className="align-items-end d-flex gap-2 mb-2 px-2 px-sm-3">
                <label className="fw-bold" htmlFor="autoplay">Autoplay</label>
                <input checked={autoplay} className="form-check-input" id="autoplay" onChange={(e) => setAutoplay(e.target.checked)} type="checkbox" />
            </div>
            <Accordion className="mb-1 shadow-lg">
                <Accordion.Item eventKey="random">
                    <div className="accordion-header"><Accordion.Button className="fw-bold">Random</Accordion.Button></div>
                    <Accordion.Body className="p-3">
                        <div className="align-items-start buttons-group d-flex flex-row gap-2">
                            <div className="d-flex flex-column gap-2">
                                {JERSEYS.slice(0, 4).map(({ filter, title, src, size, alt, ariaLabel }) => (
                                    <button key={filter} onClick={() => filterGoal([filter])} disabled={!canFilter([filter])} className="button jersey-button" title={title} aria-label={ariaLabel ?? title} type="button">
                                        <img alt={alt ?? title} className="jersey-logo" src={`/jerseys/${src}.svg`} width={size} height={size}/>
                                    </button>
                                ))}
                                <button onClick={() => filterGoal(['Throwback'])} disabled={!canFilter(['Throwback'])} className="button jersey-button" title="Throwback" aria-label="Throwback jersey" type="button">
                                    ☆&nbsp;&nbsp;<img alt="Throwback" className="jersey-logo" src="/jerseys/throwback.svg" width="36" height="36"/>&nbsp;&nbsp;☆
                                </button>
                                <button onClick={outdoor} disabled={!canRandom(jsonData.filter(item => [440, 475, 598, 602].includes(item.goal)))} className="button jersey-button multi-logo" title="Brick / Stadium" aria-label="Brick or Stadium Series jersey" type="button">
                                    <span><img alt="Brick" className="jersey-logo" src="/jerseys/brick.svg" width="24" height="24"/></span>
                                    <span><img alt="Caps" className="jersey-logo" src="/jerseys/caps.svg" width="36" height="36"/></span>
                                </button>
                                {JERSEYS.slice(4).map(({ filter, title, src, size, alt, ariaLabel }) => (
                                    <button key={filter} onClick={() => filterGoal([filter])} disabled={!canFilter([filter])} className="button jersey-button" title={title} aria-label={ariaLabel ?? title} type="button">
                                        <img alt={alt ?? title} className="jersey-logo" src={`/jerseys/${src}.svg`} width={size} height={size}/>
                                    </button>
                                ))}
                            </div>
                            <div className="d-flex flex-column gap-2">
                                <button className="button" disabled={!canRandom(jsonData.filter(item => item.hoa === 0))} onClick={() => randomGoal(jsonData.filter(item => item.hoa === 0))} title="Away" type="button">Away</button>
                                <button className="button" disabled={!canRandom(jsonData.filter(item => item.hoa === 1))} onClick={() => randomGoal(jsonData.filter(item => item.hoa === 1))} title="Home" type="button">Home</button>
                                <button className="button" disabled={!canFilter(['Empty Net'])} onClick={() => filterGoal(['Empty Net'])} title="Empty Net" type="button">ENG</button>
                                <button className="button" disabled={!canRandom(jsonData.filter(item => Object.values(item).includes('GWG') || item.period === 4))} onClick={() => randomGoal(jsonData.filter(item => Object.values(item).includes('GWG') || item.period === 4))} title="Game Winner" type="button">GWG</button>
                                <button className="button" disabled={!canHatTrick} onClick={hatTrick} title="Hat Trick" type="button">Hat&nbsp;Trick</button>
                                <button className="button" disabled={!canRandom(jsonData.filter(item => item.period === 4))} onClick={() => randomGoal(jsonData.filter(item => item.period === 4))} title="Overtime" type="button">OT</button>
                                <button className="button" disabled={!canFilter(['5v3', 'PPG'])} onClick={() => filterGoal(['5v3', 'PPG'])} title="Power Play" type="button">PPG</button>
                                <button className="button" disabled={!canFilter(['Teammate'])} onClick={() => filterGoal(['Teammate'])} title="Teammate" type="button">Teammate</button>
                                <button className="button" disabled={!canRandom(jsonData.filter(item => item.a1 === undefined))} onClick={() => randomGoal(jsonData.filter(item => item.a1 === undefined))} title="Unassisted" type="button">Unassisted</button>
                            </div>
                            <div className="d-flex flex-column gap-2">
                                <button className="button" disabled={!canFilter(['Backhand'])} onClick={() => filterGoal(['Backhand'])} title="Backhand" type="button">Backhand</button>
                                <button className="button cup" disabled={!canRandom(jsonData.filter(item => item.year === 2018 && item.league === 2))} onClick={() => randomGoal(jsonData.filter(item => item.year === 2018 && item.league === 2))} title="Cup Run" type="button">Cup&nbsp;Run</button>
                                <button className="button" disabled={!canRandom(jsonData.filter(item => item.a1 === "Nicklas Backstrom"))} onClick={() => randomGoal(jsonData.filter(item => item.a1 === "Nicklas Backstrom"))} title="From Nicklas Backstrom" type="button">From&nbsp;Nick</button>
                                <button className="button" disabled={!canRandom(jsonData.filter(item => item.hoa === 0 && canadianTeams.includes(item.team)))} onClick={() => randomGoal(jsonData.filter(item => item.hoa === 0 && canadianTeams.includes(item.team)))} title="In Canada" type="button">In&nbsp;Canada</button>
                                <button className="button" disabled={!canFilter(['Post'])} onClick={() => filterGoal(['Post'])} title="Post" type="button">Post</button>
                                <button className="button" disabled={!canFilter(['Rookie'])} onClick={() => filterGoal(['Rookie'])} title="Rookie" type="button">Rookie</button>
                                <button className="button" disabled={!canFilter(['Slapshot'])} onClick={() => filterGoal(['Slapshot'])} title="Slapshot" type="button">Slapshot</button>
                                <button className="button" disabled={!canFilter(['Tip'])} onClick={() => filterGoal(['Tip'])} title="Tip" type="button">Tip</button>
                                <button className="button" disabled={!canRandom(jsonData.filter(item => youngGunsPlayers.includes(item.a1) && youngGunsPlayers.includes(item.a2)))} onClick={() => randomGoal(jsonData.filter(item => youngGunsPlayers.includes(item.a1) && youngGunsPlayers.includes(item.a2)))} title="Young Guns" type="button">Young&nbsp;Guns</button>
                            </div>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="search">
                    <div className="accordion-header"><Accordion.Button className="fw-bold">Search</Accordion.Button></div>
                    <Accordion.Body>
                    <form className="align-items-start d-flex flex-column gap-3" onSubmit={(e) => e.preventDefault()}>
                        <div className="align-items-center d-flex flex-row gap-3">
                            <label htmlFor="goal-number">Number</label>
                            <input id="goal-number" min={0} max={leagueCounts[1]} placeholder="#" step="any" type="number" value={searchGoal} onChange={handleGoalNumber}/>
                        </div>
                        <div className="align-items-center d-flex flex-row gap-3">
                        <label htmlFor="search-text-1">Text</label>
                        <input id="search-text-1" type="text" placeholder="Search" value={searchText} onChange={handleText}/>
                        </div>
                        <div className="align-items-center d-flex flex-row gap-3 justify-content-between w-100">
                            <label htmlFor="team">Team</label>
                            <select className="form-select py-1" id="team" name="Team" value={filters.team} onChange={(e) => handleFilter('team', e.target.value)}>
                                <option value=""></option>
                                {TEAMS.map(([value, label]) => (
                                    <option key={value} value={value} disabled={!filterOptions.teams.has(value)}>{label ?? value}</option>
                                ))}
                            </select>
                        </div>
                        <div className="align-items-center d-flex flex-row gap-3 justify-content-between w-100">
                            <label htmlFor="location">Location</label>
                            <select className="form-select py-1" id="location" name="Location" value={filters.location} onChange={(e) => handleFilter('location', e.target.value)}>
                                <option value=""></option>
                                <option value="Home" disabled={!filterOptions.locations.has(1)}>Home</option>
                                <option value="Away" disabled={!filterOptions.locations.has(0)}>Away</option>
                            </select>
                        </div>
                        <div className="align-items-center d-flex flex-row gap-3 justify-content-between w-100">
                            <label htmlFor="period">Period</label>
                            <select className="form-select py-1" id="period" name="Period" value={filters.period} onChange={(e) => handleFilter('period', e.target.value)}>
                                <option value=""></option>
                                <option value="1" disabled={!filterOptions.periods.has(1)}>First</option>
                                <option value="2" disabled={!filterOptions.periods.has(2)}>Second</option>
                                <option value="3" disabled={!filterOptions.periods.has(3)}>Third</option>
                                <option value="4" disabled={!filterOptions.periods.has(4)}>Overtime</option>
                            </select>
                        </div>
                        <div className="align-items-center d-flex flex-row gap-3 justify-content-between w-100">
                            <label htmlFor="month">Month</label>
                            <select className="form-select py-1" id="month" name="Month" value={filters.month} onChange={(e) => handleFilter('month', e.target.value)}>
                                <option value=""></option>
                                {Array.from({length: 12}, (_, i) => (
                                    <option key={i+1} value={i+1} disabled={!filterOptions.months.has(i+1)}>{new Date(0, i).toLocaleString('default', {month: 'long'})}</option>
                                ))}
                            </select>
                        </div>
                        <div className="align-items-start d-flex flex-column flex-sm-row gap-3 w-100">
                            <div className="align-items-center d-flex flex-row gap-3 justify-content-between w-100">
                                <label htmlFor="season">Season</label>
                                <select className="form-select py-1" id="season" name="Season" value={filters.season} onChange={(e) => handleFilter('season', e.target.value)}>
                                    <option value=""></option>
                                    {seasonOptions.map(n => (
                                        <option key={n} value={`Season ${n}`} disabled={!filterOptions.seasons.has(n)}>{n === -1 ? 'Draft' : n}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="align-items-center d-flex flex-row gap-3 justify-content-between w-100">
                                <label htmlFor="year">Year</label>
                                <select className="form-select py-1" id="year" name="Year" value={filters.year} onChange={(e) => handleFilter('year', e.target.value)}>
                                    <option value=""></option>
                                    {yearOptions.map(y => (
                                        <option key={y} value={y} disabled={!filterOptions.years.has(y)}>{y}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </form>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <div className="px-2 px-sm-3">
                <button className="button" onClick={reset} title="Reset" type="button">Reset</button>
            </div>
        </div>
    )
}
