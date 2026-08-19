import {LEAGUE_LABEL} from './constants'

export default function NoResults({terms, disabledLeagues}) {
    const excluded = Object.entries(disabledLeagues ?? {}).filter(([, v]) => v).map(([k]) => LEAGUE_LABEL[k]).filter(Boolean)
    const termBadges = terms?.flatMap(t => t.split(' + ')).map(t => <strong key={t} className="badge text-bg-dark">{t}</strong>)
    const excludedBadges = excluded.length > 0 && <div className="align-items-center d-flex flex-row gap-1">{excluded.map(l => <strong key={l} className="badge">✕ {l}</strong>)}</div>
    return (
        <div className="alert alert-light" role="alert">
            <p>No results for</p>
            {terms?.length > 0 && <div className="align-items-center d-flex flex-row gap-1 mb-3">{termBadges}{excludedBadges}</div>}
            <p><a href="/help.html">Help</a></p>
        </div>
    )
}
