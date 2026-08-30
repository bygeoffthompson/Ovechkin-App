import {useState, useEffect} from 'react'
import Accordion from 'react-bootstrap/Accordion'
import {useTranslation} from 'react-i18next'
import {LEAGUE, PERIOD_NAME} from './constants'
import YoutubeFrame from './YoutubeFrame'

export default function GoalAccordions({ sortedResults, tooShort, ga, votedGoalId, onVote, onActiveGoal }) {
    const {t} = useTranslation()
    const [activeKey, setActiveKey] = useState(null)
    useEffect(() => {
        setActiveKey(sortedResults.length > 0 ? '0' : null)
    }, [sortedResults])
    useEffect(() => {
        const result = sortedResults[parseInt(activeKey)]
        if (result != null) onActiveGoal?.(result.goal)
    }, [activeKey, sortedResults, onActiveGoal])
    useEffect(() => {
        const result = sortedResults[parseInt(activeKey)]
        const leagueLabel = result != null ? LEAGUE[result.league] : null
        if (leagueLabel) document.body.setAttribute('data-league', leagueLabel)
    }, [activeKey, sortedResults])
    useEffect(() => () => document.body.removeAttribute('data-league'), [])
    return (
        <>
            {tooShort && <div className="alert alert-light" role="alert"><span className="h6">{t('search.twoChars')}</span></div>}
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
                                        {result.league !== 1 && result.league !== 2 && <small className="fw-bold me-1">{t(`leagueLabel.${result.league}`)}</small>}
                                        <span>{goalDec ? (goalDec.length === 1 ? goalDec + '0' : goalDec) : (result.league ? goalInt : '')}</span>
                                    </strong>
                                    <div className="align-items-center d-flex justify-content-center">
                                        <img alt="Goal Siren icon" src="/icons/goal-siren.svg" width="40" height="40"/>
                                        <strong className="position-absolute type">{result.type}</strong>
                                    </div>
                                    <div className="align-items-center d-flex justify-content-center team-logo">
                                        <img alt={result.team} className="logo" src={'/teams/' + result.team + '.svg'} width="48" height="48" title={result.team}/>
                                    </div>
                                    {result.goalie && <span className="d-none d-sm-inline fw-bold h6 m-0">{result.goalie}</span>}
                                    <span className="badge date">{result.month}/{result.day}/{result.year}</span>
                                </div>
                            {index > 0 && <strong className="bottom-0 indexer p-1 position-absolute">{index + 1}</strong>}
                            </Accordion.Button>
                        </div>
                        <Accordion.Body className="p-0 position-relative">
                            <div className="align-items-start align-items-sm-center d-flex flex-wrap gap-1 p-2">
                                {result.goalie && <span className="d-inline d-sm-none h6 m-0">{result.goalie}</span>}
                                {result.series && <span className="badge text-bg-warning">{t(`series.${result.series}`)}</span>}
                                {result.game && <span className="badge text-bg-warning">G{result.game}</span>}
                                <span className={`badge ${result.result === 1 ? 'text-bg-success' : 'text-bg-dark'}`}>{result.result === 1 ? t('goal.win') : result.result === 0 ? t('goal.loss') : null}</span>
                                <span className="badge text-bg-secondary">{result.time}</span>
                                <span className="badge text-bg-secondary">{PERIOD_NAME[result.period] ?? result.period}</span>
                                {result.a1 && <span className="assist badge">{result.a1}</span>}
                                {result.a2 && <span className="assist badge">{result.a2}</span>}
                                <button
                                    className={`align-items-center d-flex small vote ${String(result.goal) === votedGoalId ? 'text-bg-danger' : ''}`}
                                    disabled={String(result.goal) === votedGoalId}
                                    data-ga="Vote" onClick={() => onVote(String(result.goal))} title="Vote"
                                >{String(result.goal) === votedGoalId ? t('goal.voted') : t('goal.vote')}</button>
                            </div>

                            {activeKey === key
                                ? <YoutubeFrame videoId={videoId} start={start} end={end} />
                                : <div className="iframe w-100" />
                            }
                            <small className="bottom-0 link position-absolute px-1 start-0 text-bg-dark"><strong>ovechkin.app/?{result.goal}</strong></small>
                        </Accordion.Body>
                    </Accordion.Item>
                    )
                })}
            </Accordion>
        </>
    )
}
