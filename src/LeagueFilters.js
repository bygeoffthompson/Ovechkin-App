import {LEAGUE_ORDER, LEAGUE_META} from './constants'

const LEAGUES = LEAGUE_ORDER.map(key => ({ key, ...LEAGUE_META[key] }))

export default function LeagueFilters({ leagueCounts, disabledLeagues, isAnimating, anim, totalDisplay, activeLeagueGoals, randomGoal, jsonData, searchGoal, handleGoalNumber }) {
    return (
        <div className="d-flex flex-wrap align-items-stretch gap-1 mb-3">
            {LEAGUES.map(({ key, label, title }) => (
                <button key={key} className="button counter" disabled={isAnimating || !!disabledLeagues[key]} onClick={() => randomGoal(jsonData.filter(item => item.league === key))} title={title} type="button">
                    <div className="h4 m-0" data-goals={leagueCounts[key]}>{anim(leagueCounts[key])}</div>
                    <div>{label}</div>
                </button>
            ))}
            <button className="button" disabled={isAnimating || activeLeagueGoals.length === 0} onClick={() => randomGoal(activeLeagueGoals)} title="Total" type="button">
                <span className="h2 m-0" data-goals={activeLeagueGoals.length}>{isAnimating ? anim(activeLeagueGoals.length) : totalDisplay}</span>
            </button>
            <label htmlFor="goal-number" hidden>Goal</label>
            <input className="fw-bold text-center" id="goal-number" min={0} max={leagueCounts[1]} placeholder="#" step="any" type="number" value={searchGoal} onChange={handleGoalNumber}/>
        </div>
    )
}
