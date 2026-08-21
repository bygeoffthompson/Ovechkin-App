import {useState, useEffect} from 'react'
import Accordion from 'react-bootstrap/Accordion'
import {LEAGUE, PERIOD_NAME} from './constants'
import ActiveTags from './ActiveTags'
import WelcomeMessage from './WelcomeMessage'
import NoResults from './NoResults'
import YoutubeFrame from './YoutubeFrame'

export default function GoalAccordions({ sortedResults, tooShort, resultCount, showSort, sortOrder, setSortOrder, activeTerms, autoplay, ga, noResults, isIdle, jsonData, disabledLeagues, onGoalSelect }) {
    const [activeKey, setActiveKey] = useState(null)
    useEffect(() => {
        setActiveKey(sortedResults.length > 0 ? '0' : null)
    }, [sortedResults])
    const hasExcluded = Object.values(disabledLeagues ?? {}).some(v => v)
    return (
        <div className="goal-results w-100">
            {(sortedResults.length > 0 || hasExcluded) && (
                <div className="align-items-start align-items-sm-center  d-flex flex-column flex-sm-row gap-1 justify-content-start p-2 rounded-top text-bg-light w-100" id="results">
                    {showSort && <select className="form-select w-auto" name="Sort" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                        <option value="asc">Ascend</option>
                        <option value="desc">Descend</option>
                    </select>}
                    {resultCount >= 1 && <strong className="badge text-bg-dark" data-count={resultCount}>{`${resultCount} Result${resultCount !== 1 ? 's' : ''}`}</strong>}
                    <ActiveTags terms={activeTerms} disabledLeagues={disabledLeagues} />
                </div>
            )}

            {tooShort && <div className="alert alert-light" role="alert"><span className="h6">Search Requires 2 Characters</span></div>}
            <Accordion activeKey={activeKey} className="goal-accordion shadow-lg w-100" flush onSelect={setActiveKey}>
                {sortedResults.map((result, index) => {
                    const key = index.toString()
                    const [linkPath, linkQuery] = result.link.split('?')
                    const videoId = linkPath.replace(/^\//, '')
                    const linkParams = new URLSearchParams((linkQuery || '').replace(/&amp;/g, '&'))
                    const start = linkParams.get('start')
                    const end = linkParams.get('end')
                    const [goalInt, goalDec] = result.goal.toString().split('.')
                    return (
                    <Accordion.Item key={result.goal} data-jersey={result.jersey} data-league={LEAGUE[result.league]} eventKey={key}>
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
                                    <span className="badge text-bg-secondary">{result.time}</span>
                                    <span className="badge text-bg-secondary">{PERIOD_NAME[result.period] ?? result.period}</span>
                                    {result.a1 && <span className="assist badge">{result.a1}</span>}
                                    {result.a2 && <span className="assist badge">{result.a2}</span>}
                                </small>
                            </div>
                            {activeKey === key
                                ? <YoutubeFrame videoId={videoId} autoplay={autoplay} start={start} end={end} />
                                : <div className="iframe w-100" />
                            }
                            <small className="bottom-0 link position-absolute px-1 start-0 text-bg-dark"><strong>ovechkin.app/?{result.goal}</strong></small>
                        </Accordion.Body>
                    </Accordion.Item>
                    )
                })}
            </Accordion>
            {noResults && (isIdle ? <WelcomeMessage jsonData={jsonData} disabledLeagues={disabledLeagues} onGoalSelect={onGoalSelect} /> : <NoResults />)}
        </div>
    )
}
