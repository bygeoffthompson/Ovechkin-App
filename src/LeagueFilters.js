import {LEAGUE_ORDER, LEAGUE_META} from './constants'

const LEAGUES = LEAGUE_ORDER.map(key => ({ key, ...LEAGUE_META[key] }))

export default function LeagueFilters({ leagueCounts, disabledLeagues, isAnimating, anim, totalDisplay, activeLeagueGoals, toggleLeague, randomGoal, jsonData }) {
    return (
        <div className="d-flex flex-wrap gap-1 mb-3">
            {LEAGUES.map(({ key, label, title }) => (
                <div key={key} className={`d-flex flex-column align-items-center${disabledLeagues[key] ? ' excluded' : ''}`}>
                    <button className="button counter" disabled={isAnimating || !!disabledLeagues[key]} onClick={() => randomGoal(jsonData.filter(item => item.league === key))} title={title} type="button">
                        <div className="h4 m-0" data-goals={leagueCounts[key]}>{anim(leagueCounts[key])}</div>
                        <div>{label}</div>
                    </button>
                    <button className={`button exclude${disabledLeagues[key] ? ' include' : ''}`} disabled={isAnimating} onClick={() => toggleLeague(key)} title={disabledLeagues[key] ? 'Include' : 'Exclude'} type="button">
                        <small>{disabledLeagues[key] ? 'Include' : 'Exclude'}</small>
                    </button>
                </div>
            ))}
            <div className="d-flex flex-column align-items-center">
                <button className="button h-100" disabled={isAnimating || activeLeagueGoals.length === 0} onClick={() => randomGoal(activeLeagueGoals)} title="Total" type="button">
                    <span className="h1 m-0" data-goals={activeLeagueGoals.length}>{isAnimating ? anim(activeLeagueGoals.length) : totalDisplay}</span>
                </button>
            </div>
        </div>
    )
}
