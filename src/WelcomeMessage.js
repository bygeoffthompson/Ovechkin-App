import Accordion from 'react-bootstrap/Accordion'
import {useOnThisDay} from './useOnThisDay'
import {LEAGUE_LABEL, random} from './constants'

export default function WelcomeMessage({jsonData, disabledLeagues, onGoalSelect}) {
    const { onThisDayGoals, month, day, dotwName, dotwMatches } = useOnThisDay(jsonData)
    const activeDotwMatches = dotwMatches.filter(g => !disabledLeagues[g.league])
    return (
        <Accordion className="shadow-lg w-100" defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <div className="accordion-header"><Accordion.Button className="fw-bold">Welcome to Ovechkin App</Accordion.Button></div>
                <Accordion.Body>
                    <div className="align-items-start d-flex flex-column flex-sm-row gap-2">
                        <p className="lead m-0">Click or search to watch goals</p>
                        <img alt="Recording Light" height="30" src="/gifs/record-light.gif" width="30" />
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-cursor" viewBox="0 0 16 16">
                                <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103zM2.25 8.184l3.897 1.67a.5.5 0 0 1 .262.263l1.67 3.897L12.743 3.52z"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-type me-2" viewBox="0 0 16 16">
                                <path d="m2.244 13.081.943-2.803H6.66l.944 2.803H8.86L5.54 3.75H4.322L1 13.081zm2.7-7.923L6.34 9.314H3.51l1.4-4.156zm9.146 7.027h.035v.896h1.128V8.125c0-1.51-1.114-2.345-2.646-2.345-1.736 0-2.59.916-2.666 2.174h1.108c.068-.718.595-1.19 1.517-1.19.971 0 1.518.52 1.518 1.464v.731H12.19c-1.647.007-2.522.8-2.522 2.058 0 1.319.957 2.18 2.345 2.18 1.06 0 1.716-.43 2.078-1.011zm-1.763.035c-.752 0-1.456-.397-1.456-1.244 0-.65.424-1.115 1.408-1.115h1.805v.834c0 .896-.752 1.525-1.757 1.525"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-film" viewBox="0 0 16 16">
                                <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm4 0v6h8V1zm8 8H4v6h8zM1 1v2h2V1zm2 3H1v2h2zM1 7v2h2V7zm2 3H1v2h2zm-2 3v2h2v-2zM15 1h-2v2h2zm-2 3v2h2V4zm2 3h-2v2h2zm-2 3v2h2v-2zm2 3h-2v2h2z"/>
                            </svg>
                        </div>
                    </div>
                    <hr className="my-3"/>
                    <div className="align-items-center d-flex flex-row flex-wrap gap-3 mb-3">
                        <span className="h6 m-0">DOTW</span>
                        Watch a
                        <button className="button dotw" disabled={activeDotwMatches.length === 0} title={`${dotwName} Goal`} type="button" onClick={() => {
                            if (!activeDotwMatches.length) return
                            onGoalSelect(activeDotwMatches[random(0, activeDotwMatches.length - 1)].goal)
                        }}>{dotwName} Goal</button>
                    </div>
                    <hr className="my-3"/>
                    <div className="align-items-center d-flex flex-row flex-wrap gap-3">
                        <span className="h6 m-0">OTD</span><span className="badge p-2">{month}/{day}</span>
                        {onThisDayGoals.length > 0 && <p className="m-0">Year</p>}
                        {onThisDayGoals.length > 0 ? onThisDayGoals.map(goal => (
                            <button className="button" disabled={!!disabledLeagues[goal.league]} key={goal.goal} onClick={() => onGoalSelect(goal.goal)} title="On This Day" type="button">
                                {goal.year} {LEAGUE_LABEL[goal.league]}
                            </button>
                        )) : (
                            <button className="button" disabled>No Goals</button>
                        )}
                    </div>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}
