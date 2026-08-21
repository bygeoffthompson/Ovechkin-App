import {LEAGUE_LABEL} from './constants'

export default function ActiveTags({terms, disabledLeagues}) {
    const excluded = Object.entries(disabledLeagues ?? {}).filter(([, v]) => v).map(([k]) => LEAGUE_LABEL[k]).filter(Boolean)
    const termBadges = terms?.flatMap(t => t.split(' + ')).map(t => <strong key={t} className="badge text-bg-dark">{t}</strong>)
    if (!terms?.length && !excluded.length) return null
    return (
        <div className="d-flex flex-column gap-1">
            {terms?.length > 0 && (
                <div className="align-items-center d-flex flex-row gap-1">
                    <small>Search</small>
                    {termBadges}
                </div>
            )}
            {excluded.length > 0 && (
                <div className="align-items-center d-flex flex-row gap-1">
                    <small>Excluding</small>
                    {excluded.map(l => <strong key={l} className="badge text-bg-danger">{l}</strong>)}
                </div>
            )}
        </div>
    )
}
