import {LEAGUE_LABEL, LEAGUE_ORDER} from './constants'

export default function Results({terms, disabledLeagues, resultCount, showSort, sortOrder, setSortOrder}) {
    const excluded = LEAGUE_ORDER.filter(k => disabledLeagues?.[k]).map(k => LEAGUE_LABEL[k]).filter(Boolean)
    const termBadges = terms?.flatMap(t => t.split(' + ')).map(t => <strong key={t} className="badge">{t}</strong>)
    const excludedBadges = excluded.map(l => <strong key={l} className="badge text-bg-danger">✕&nbsp;{l}</strong>)
    if (resultCount < 1 && !excluded.length) return null
    return (
        <div className="align-items-start align-items-sm-center d-flex flex-column flex-sm-row gap-1 justify-content-start p-2 rounded-top text-bg-light w-100" id="results">
            {showSort && <select className="form-select w-auto" name="Sort" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                <option value="asc">Ascend</option>
                <option value="desc">Descend</option>
            </select>}
            {resultCount >= 1 && <strong className="badge text-bg-dark" data-count={resultCount}>{`${resultCount} Result${resultCount !== 1 ? 's' : ''}`}</strong>}
            {(terms?.length > 0 || excluded.length > 0) && (
                <div className="align-items-center d-flex flex-row flex-wrap gap-1">
                    {termBadges}
                    {excludedBadges}
                </div>
            )}
        </div>
    )
}
