import Accordion from 'react-bootstrap/Accordion'
import {useTranslation} from 'react-i18next'
import {TEAMS, canadianTeams, youngGunsPlayers, formatMonth, LEAGUE_ORDER, LEAGUE_META} from './constants'

export default function RandomSearch({ jsonData, searchText, filters, filterOptions, seasonOptions, yearOptions, canFilter, canRandom, canHatTrick, handleText, handleFilter, filterGoal, randomGoal, outdoor, hatTrick, reset, searchGoal, handleGoalNumber, leagueCounts }) {
    const {t} = useTranslation()
    return (
        <div className="d-flex flex-column w-100" id="random-search">
            <Accordion className="mb-1 shadow-lg">
                <Accordion.Item eventKey="random">
                    <div className="accordion-header"><Accordion.Button className="fw-bold">{t('search.random')}</Accordion.Button></div>
                    <Accordion.Body className="p-3 text-bg-light">
                        <div className="align-items-start buttons-group d-flex flex-row gap-2">
                            <div className="d-flex flex-column gap-2">
                                <button onClick={() => filterGoal(['Capitol'])} disabled={!canFilter(['Capitol'])} className="button jersey-button" title="Capitol" aria-label="Capitol" type="button">
                                    <img alt="Capitol" className="jersey-logo" src="/jerseys/capitol.svg" width="36" height="36"/>
                                </button>
                                <button onClick={() => filterGoal(['Screagle'])} disabled={!canFilter(['Screagle'])} className="button jersey-button" title="Screagle" aria-label="Screagle" type="button">
                                    <img alt="Screagle" className="jersey-logo" src="/jerseys/screagle.svg" width="36" height="36"/>
                                </button>
                                <button onClick={() => filterGoal(['Red'])} disabled={!canFilter(['Red'])} className="button jersey-button" title="Red" aria-label="Red jersey" type="button">
                                    <img alt="Capitals" className="jersey-logo" src="/jerseys/capitals.svg" width="36" height="36"/>
                                </button>
                                <button onClick={() => filterGoal(['White'])} disabled={!canFilter(['White'])} className="button jersey-button" title="White" aria-label="White jersey" type="button">
                                    <img alt="Capitals" className="jersey-logo" src="/jerseys/capitals.svg" width="36" height="36"/>
                                </button>
                                <button onClick={() => filterGoal(['Throwback'])} disabled={!canFilter(['Throwback'])} className="button jersey-button" title="Throwback" aria-label="Throwback jersey" type="button">
                                    ☆&nbsp;&nbsp;<img alt="Throwback" className="jersey-logo" src="/jerseys/throwback.svg" width="36" height="36"/>&nbsp;&nbsp;☆
                                </button>
                                <button onClick={outdoor} disabled={!canRandom(jsonData.filter(item => [440, 475, 598, 602].includes(item.goal)))} className="button jersey-button multi-logo" title="Brick / Stadium" aria-label="Brick or Stadium Series jersey" type="button">
                                    <span>
                                        <img alt="Brick" className="jersey-logo" src="/jerseys/brick.svg" width="24" height="24"/>
                                    </span>
                                    <span>
                                        <img alt="Caps" className="jersey-logo" src="/jerseys/caps.svg" width="36" height="36"/>
                                    </span>
                                </button>
                                <button onClick={() => filterGoal(['Navy W'])} disabled={!canFilter(['Navy W'])} className="button jersey-button" title="Navy" aria-label="Navy jersey" type="button">
                                    <img alt="Navy" className="jersey-logo" src="/jerseys/navy.svg" width="24" height="24"/>
                                </button>
                                <button onClick={() => filterGoal(['Black Reverse Retro'])} disabled={!canFilter(['Black Reverse Retro'])} className="button jersey-button" title="Black Reverse Retro" aria-label="Black Reverse Retro jersey" type="button">
                                    <img alt="Screagle" className="jersey-logo" src="/jerseys/retro.svg" width="36" height="36"/>
                                </button>
                                <button onClick={() => filterGoal(['Red Reverse Retro'])} disabled={!canFilter(['Red Reverse Retro'])} className="button jersey-button" title="Red Reverse Retro" aria-label="Red Reverse Retro jersey" type="button">
                                    <img alt="Screagle" className="jersey-logo" src="/jerseys/retro.svg" width="36" height="36"/>
                                </button>
                            </div>
                            <div className="d-flex flex-column gap-2">
                                <button className="button" disabled={!canRandom(jsonData.filter(item => item.hoa === 0))} onClick={() => randomGoal(jsonData.filter(item => item.hoa === 0))} title="Away" type="button">{t('search.away')}</button>
                                <button className="button" disabled={!canRandom(jsonData.filter(item => item.hoa === 1))} onClick={() => randomGoal(jsonData.filter(item => item.hoa === 1))} title="Home" type="button">{t('search.home')}</button>
                                <button className="button" disabled={!canFilter(['Empty Net'])} onClick={() => filterGoal(['Empty Net'])} title="Empty Net" type="button">ENG</button>
                                <button className="button" disabled={!canRandom(jsonData.filter(item => Object.values(item).includes('GWG') || item.period === 4))} onClick={() => randomGoal(jsonData.filter(item => Object.values(item).includes('GWG') || item.period === 4))} title="Game Winner" type="button">GWG</button>
                                <button className="button" disabled={!canHatTrick} onClick={hatTrick} title="Hat Trick" type="button">{t('btn.hatTrick')}</button>
                                <button className="button" disabled={!canRandom(jsonData.filter(item => item.period === 4))} onClick={() => randomGoal(jsonData.filter(item => item.period === 4))} title="Overtime" type="button">OT</button>
                                <button className="button" disabled={!canFilter(['5v3', 'PPG'])} onClick={() => filterGoal(['5v3', 'PPG'])} title="Power Play" type="button">PPG</button>
                                <button className="button" disabled={!canFilter(['Teammate'])} onClick={() => filterGoal(['Teammate'])} title="Teammate" type="button">{t('btn.teammate')}</button>
                                <button className="button" disabled={!canRandom(jsonData.filter(item => item.a1 === undefined))} onClick={() => randomGoal(jsonData.filter(item => item.a1 === undefined))} title="Unassisted" type="button">{t('btn.unassisted')}</button>
                            </div>
                            <div className="d-flex flex-column gap-2">
                                <button className="button" disabled={!canFilter(['Backhand'])} onClick={() => filterGoal(['Backhand'])} title="Backhand" type="button">{t('btn.backhand')}</button>
                                <button className="button cup" disabled={!canRandom(jsonData.filter(item => item.year === 2018 && item.league === 2))} onClick={() => randomGoal(jsonData.filter(item => item.year === 2018 && item.league === 2))} title="Cup Run" type="button">{t('btn.cupRun')}</button>
                                <button className="button" disabled={!canRandom(jsonData.filter(item => item.a1 === "Nicklas Backstrom"))} onClick={() => randomGoal(jsonData.filter(item => item.a1 === "Nicklas Backstrom"))} title="From Nicklas Backstrom" type="button">{t('btn.fromNick')}</button>
                                <button className="button" disabled={!canRandom(jsonData.filter(item => item.hoa === 0 && canadianTeams.includes(item.team)))} onClick={() => randomGoal(jsonData.filter(item => item.hoa === 0 && canadianTeams.includes(item.team)))} title="In Canada" type="button">{t('btn.inCanada')}</button>
                                <button className="button" disabled={!canFilter(['Post'])} onClick={() => filterGoal(['Post'])} title="Post" type="button">{t('btn.post')}</button>
                                <button className="button" disabled={!canFilter(['Rookie'])} onClick={() => filterGoal(['Rookie'])} title="Rookie" type="button">{t('btn.rookie')}</button>
                                <button className="button" disabled={!canFilter(['Slapshot'])} onClick={() => filterGoal(['Slapshot'])} title="Slapshot" type="button">{t('btn.slapshot')}</button>
                                <button className="button" disabled={!canFilter(['Tip'])} onClick={() => filterGoal(['Tip'])} title="Tip" type="button">{t('btn.tip')}</button>
                                <button className="button" disabled={!canRandom(jsonData.filter(item => youngGunsPlayers.includes(item.a1) && youngGunsPlayers.includes(item.a2)))} onClick={() => randomGoal(jsonData.filter(item => youngGunsPlayers.includes(item.a1) && youngGunsPlayers.includes(item.a2)))} title="Young Guns" type="button">{t('btn.youngGuns')}</button>
                            </div>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="search">
                    <div className="accordion-header"><Accordion.Button className="fw-bold">{t('search.search')}</Accordion.Button></div>
                    <Accordion.Body className="text-bg-light">
                    <form className="align-items-start d-flex flex-column gap-3" onSubmit={(e) => e.preventDefault()}>
                        <div className="align-items-center d-flex flex-row gap-3">
                            <label htmlFor="goal-number">{t('search.goalNumber')}</label>
                            <input className="text-center" id="goal-number" min={0} max={leagueCounts?.[1]} placeholder="#" step="any" type="number" value={searchGoal} onChange={handleGoalNumber}/>
                        </div>
                        <div className="align-items-center d-flex flex-row gap-3">
                            <label htmlFor="search-text-1">{t('search.text')}</label>
                            <input id="search-text-1" type="text" placeholder={t('search.searchPlaceholder')} value={searchText} onChange={handleText}/>
                        </div>
                        <div className="align-items-center d-flex flex-row gap-3 justify-content-between w-100">
                            <label htmlFor="team">{t('search.team')}</label>
                            <select className="form-select py-1" id="team" name="Team" value={filters.team} onChange={(e) => handleFilter('team', e.target.value)}>
                                <option value=""></option>
                                {TEAMS.map(([value, label]) => (
                                    <option key={value} value={value} disabled={!filterOptions.teams.has(value)}>{label ?? value}</option>
                                ))}
                            </select>
                        </div>
                        <div className="align-items-center d-flex flex-row gap-3 justify-content-between w-100">
                            <label htmlFor="location">{t('search.location')}</label>
                            <select className="form-select py-1" id="location" name="Location" value={filters.location} onChange={(e) => handleFilter('location', e.target.value)}>
                                <option value=""></option>
                                <option value="Home" disabled={!filterOptions.locations.has(1)}>{t('search.home')}</option>
                                <option value="Away" disabled={!filterOptions.locations.has(0)}>{t('search.away')}</option>
                            </select>
                        </div>
                        <div className="align-items-center d-flex flex-row gap-3 justify-content-between w-100">
                            <label htmlFor="period">{t('search.period')}</label>
                            <select className="form-select py-1" id="period" name="Period" value={filters.period} onChange={(e) => handleFilter('period', e.target.value)}>
                                <option value=""></option>
                                <option value="1" disabled={!filterOptions.periods.has(1)}>{t('search.first')}</option>
                                <option value="2" disabled={!filterOptions.periods.has(2)}>{t('search.second')}</option>
                                <option value="3" disabled={!filterOptions.periods.has(3)}>{t('search.third')}</option>
                                <option value="4" disabled={!filterOptions.periods.has(4)}>{t('search.overtime')}</option>
                            </select>
                        </div>
                        <div className="align-items-center d-flex flex-row gap-3 justify-content-between w-100">
                            <label htmlFor="month">{t('search.month')}</label>
                            <select className="form-select py-1" id="month" name="Month" value={filters.month} onChange={(e) => handleFilter('month', e.target.value)}>
                                <option value=""></option>
                                {Array.from({length: 12}, (_, i) => (
                                    <option key={i+1} value={i+1} disabled={!filterOptions.months.has(i+1)}>{formatMonth(i+1)}</option>
                                ))}
                            </select>
                        </div>
                        <div className="align-items-start d-flex flex-column flex-sm-row gap-3 w-100">
                            <div className="align-items-center d-flex flex-row gap-3 justify-content-between w-100">
                                <label htmlFor="season">{t('search.season')}</label>
                                <select className="form-select py-1" id="season" name="Season" value={filters.season} onChange={(e) => handleFilter('season', e.target.value)}>
                                    <option value=""></option>
                                    {seasonOptions.map(n => (
                                        <option key={n} value={`Season ${n}`} disabled={!filterOptions.seasons.has(n)}>{n === -1 ? t('search.draft') : n}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="align-items-center d-flex flex-row gap-3 justify-content-between w-100">
                                <label htmlFor="year">{t('search.year')}</label>
                                <select className="form-select py-1" id="year" name="Year" value={filters.year} onChange={(e) => handleFilter('year', e.target.value)}>
                                    <option value=""></option>
                                    {yearOptions.map(y => (
                                        <option key={y} value={y} disabled={!filterOptions.years.has(y)}>{y}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="align-items-center d-flex flex-row gap-3 justify-content-between w-100">
                            <label htmlFor="league">{t('search.league')}</label>
                            <select className="form-select py-1" id="league" name="League" value={filters.league} onChange={(e) => handleFilter('league', e.target.value)}>
                                <option value=""></option>
                                {LEAGUE_ORDER.map(key => (
                                    <option key={key} value={key} disabled={!filterOptions.leagues?.has(key)}>{t(`leagueLabel.${key}`)}</option>
                                ))}
                            </select>
                        </div>
                    </form>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <button className="button px-2 px-md-3 text-start" id="reset" onClick={reset} title="Reset" type="button">{t('search.reset')}</button>
        </div>
    )
}
