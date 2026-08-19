const LEAGUES = [
    { key: 1, label: 'NHL',       title: 'NHL Regular Season' },
    { key: 2, label: 'Playoffs',  title: 'NHL Playoffs' },
    { key: 7, label: 'All Star',  title: 'All Star' },
    { key: 3, label: 'KHL',       title: 'KHL',                extraClass: 'khl' },
    { key: 4, label: 'Olympics',  title: 'Olympics' },
    { key: 5, label: 'Worlds',    title: 'World Championships', extraClass: 'gold' },
    { key: 6, label: 'World Cup', title: 'World Cup',           small: true },
]

export default function LeagueFilters({ leagueCounts, disabledLeagues, isAnimating, anim, totalDisplay, activeLeagueGoals, toggleLeague, randomGoal, jsonData }) {
    return (
        <div className="d-flex flex-wrap gap-2 mb-3">
            {LEAGUES.map(({ key, label, title, extraClass, small }) => (
                <div key={key} className={`d-flex flex-column align-items-center${disabledLeagues[key] ? ' excluded' : ''}`}>
                    <button className={`button counter${extraClass ? ` ${extraClass}` : ''}`} disabled={isAnimating || !!disabledLeagues[key]} onClick={() => randomGoal(jsonData.filter(item => item.league === key))} title={title} type="button">
                        <div className="h4 m-0" data-goals={leagueCounts[key]}>{anim(leagueCounts[key])}</div>
                        {small ? <small>{label}</small> : <div>{label}</div>}
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
