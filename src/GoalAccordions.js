import Accordion from 'react-bootstrap/Accordion'
import {LEAGUE, PERIOD_NAME} from './constants'
import WelcomeMessage from './WelcomeMessage'
import NoResults from './NoResults'

export default function GoalAccordions({ sortedResults, tooShort, resultCount, showSort, sortOrder, setSortOrder, activeTerms, loadedKeys, setLoadedKeys, ga, noResults, isIdle, jsonData, disabledLeagues, onGoalSelect }) {
    return (
        <div className="goal-results w-100">
            {sortedResults.length > 0 && (
                <div className="align-items-start align-items-sm-center d-flex flex-column flex-sm-row gap-1 justify-content-start mb-3 w-100" id="results">
                    <strong className="badge py-2" data-count={resultCount}>{`${resultCount} Result${resultCount !== 1 ? 's' : ''}`}</strong>
                    {showSort && <select className="form-select w-auto" name="Sort" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                        <option value="asc">Ascend</option>
                        <option value="desc">Descend</option>
                    </select>}
                    {activeTerms.length > 0 && <>for {activeTerms.map(t => <span key={t} className="badge ms-1 text-bg-dark">{t}</span>)}</>}
                </div>
            )}

            {tooShort && <div className="alert alert-light" role="alert"><span className="h6">Search Requires 2 Characters</span></div>}
            <Accordion className="goal-accordion shadow-lg w-100" defaultActiveKey="0" flush onSelect={(key) => key !== null && setLoadedKeys(prev => ({...prev, [key]: true}))}>
                {sortedResults.map((result, index) => {
                    const goalLink = 'https://www.youtube-nocookie.com/embed' + result.link + '&autohide=0&rel=0&modestbranding=1'
                    const [goalInt, goalDec] = result.goal.toString().split('.')
                    return (
                    <Accordion.Item key={result.goal} data-jersey={result.jersey} data-league={LEAGUE[result.league]} eventKey={index.toString()}>
                        <div className="accordion-header">
                            <Accordion.Button onClick={(e) => { if (e.currentTarget.getAttribute('aria-expanded') === 'false') { ga.current?.event({ category: 'Results', action: 'Open Goal Accordion', label: result.goal.toString() })} }}>
                                <div className="align-items-center d-flex gap-1 justify-content-start w-100">
                                    <strong className="align-items-center d-flex goal-count">
                                        {result.league !== 1 && <small className="fw-bold me-1">{result.league === 2 ? 'Playoffs' : result.league === 5 ? 'Worlds' : LEAGUE[result.league]}</small>}
                                        <span>{goalDec ? (goalDec.length === 1 ? goalDec + '0' : goalDec) : (result.league ? goalInt : '')}</span>
                                    </strong>
                                    <div className="align-items-center d-flex justify-content-center goal-siren">
                                        <img alt="Goal Siren icon" src="/icons/goal-siren.svg" width="36" height="36"/>
                                        <strong className="position-absolute type">{result.type}</strong>
                                    </div>
                                    <div className="align-items-center d-flex justify-content-center team-logo">
                                        <img alt={result.team} className="logo" src={'/teams/' + result.team + '.svg'} width="48" height="48" title={result.team}/>
                                    </div>
                                    <span className="badge">{result.month}/{result.day}/{result.year}</span>
                                </div>
                            {index > 0 && <strong className="bottom-0 indexer p-1 position-absolute">{index + 1}</strong>}
                            </Accordion.Button>
                        </div>
                        <Accordion.Body className="p-0 position-relative">
                            <div className="d-flex flex-column px-3 py-2">
                                {result.goalie && <p className="h5 ps-1">{result.goalie}</p>}
                                <small className="align-items-start align-items-sm-center d-flex flex-wrap gap-1">
                                    {result.series && <span className="badge text-bg-warning">{result.series}</span>}
                                    {result.game && <span className="badge text-bg-warning">G{result.game}</span>}
                                    <span className={`badge ${result.result === 1 ? 'text-bg-success' : 'text-bg-dark'}`}>{result.result === 1 ? 'Win' : result.result === 0 ? 'Loss' : null}</span>
                                    <span className="badge text-bg-secondary">{result.time} {PERIOD_NAME[result.period] ?? result.period}</span>
                                    {result.a1 && <span className="assist badge">{result.a1}</span>}
                                    {result.a2 && <span className="assist badge">{result.a2}</span>}
                                </small>
                            </div>
                            {loadedKeys[index]
                                ? <iframe className="bg-black h-100 iframe w-100" width="560" height="315" src={goalLink} title="Alex Ovechkin Goal Video" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
                                : <div className="iframe w-100" />
                            }
                            <small className="bottom-0 link position-absolute px-1 start-0 text-bg-dark"><strong>ovechkin.app/?{result.goal}</strong></small>
                        </Accordion.Body>
                    </Accordion.Item>
                    )
                })}
            </Accordion>
            {noResults && (isIdle ? <WelcomeMessage jsonData={jsonData} disabledLeagues={disabledLeagues} onGoalSelect={onGoalSelect} /> : <NoResults terms={activeTerms} disabledLeagues={disabledLeagues} />)}
        </div>
    )
}
