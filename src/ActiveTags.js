import {LEAGUE_LABEL} from './constants'

export default function ActiveTags({terms, disabledLeagues}) {
    const LEAGUE_ORDER = [1, 2, 7, 3, 4, 5, 6]
    const excluded = LEAGUE_ORDER.filter(k => disabledLeagues?.[k]).map(k => LEAGUE_LABEL[k]).filter(Boolean)
    const termBadges = terms?.flatMap(t => t.split(' + ')).map(t => <strong key={t} className="badge">{t}</strong>)
    const excludedBadges = excluded.map(l => <strong key={l} className="badge text-bg-danger">✕&nbsp;{l}</strong>)
    if (!terms?.length && !excluded.length) return null
    return (
        <div className="d-flex flex-row flex-wrap gap-1">
            {(terms?.length > 0 || excluded.length > 0) && (
                <div className="align-items-center d-flex flex-row flex-wrap gap-1">
                    {termBadges}
                    {excludedBadges}
                </div>
            )}
        </div>
    )
}
