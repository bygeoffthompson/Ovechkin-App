import {useOnThisDay} from './useOnThisDay'
import {LEAGUE_META, random} from './constants'

export default function WelcomeMessage({jsonData, onGoalSelect}) {
    const { onThisDayGoals, month, day, dotwName, dotwMatches } = useOnThisDay(jsonData)
    return (
        <div className="alert alert-secondary border-radius-0 shadow-lg text-bg-light w-100" role="alert">
            <p className="alert-heading h1 mb-3">Welcome</p>
            <div className="align-items-start d-flex flex-column flex-sm-row gap-2">
                <img alt="Recording Light" height="30" src="/gifs/record-light.gif" width="30" />
                <p className="m-0">Click or search to watch goals</p>
            </div>
            <hr className="my-3"/>
            <div className="align-items-center d-flex flex-row flex-wrap gap-3 mb-3">
                <span className="h6 m-0">DOTW</span>
                Watch a
                <button className="button dotw" disabled={dotwMatches.length === 0} title={`${dotwName} Goal`} type="button" onClick={() => {
                    if (!dotwMatches.length) return
                    onGoalSelect(dotwMatches[random(0, dotwMatches.length - 1)].goal)
                }}>{dotwName} Goal</button>
            </div>
            <hr className="my-3"/>
            <div className="align-items-center d-flex flex-row flex-wrap gap-3">
                <span className="h6 m-0">OTD</span><span className="badge p-2">{month}/{day}</span>
                {onThisDayGoals.length > 0 && <p className="m-0">Year</p>}
                {onThisDayGoals.length > 0 ? onThisDayGoals.map(goal => (
                    <button className="button" key={goal.goal} onClick={() => onGoalSelect(goal.goal)} title="On This Day" type="button">
                        {goal.year} {LEAGUE_META[goal.league]?.label}
                    </button>
                )) : (
                    <button className="button" disabled>No Goals</button>
                )}
            </div>
        </div>
    )
}
