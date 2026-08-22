import {LEAGUE_META, LEAGUE_ORDER} from './constants'

export default function Results({terms, disabledLeagues, resultCount, showSort, sortOrder, setSortOrder}) {
    const excluded = LEAGUE_ORDER.filter(k => disabledLeagues?.[k]).map(k => LEAGUE_META[k]?.label).filter(Boolean)
    const termBadges = terms?.flatMap(t => t.split(' + ')).map(t => <strong key={t} className="badge">{t}</strong>)
    const excludedBadges = excluded.map(l => <strong key={l} className="badge text-bg-danger">✕&nbsp;{l}</strong>)
    if (resultCount < 1 && !excluded.length) return null
    return (
        <div className="align-items-start border-2 border-bottom d-flex flex-column flex-sm-row gap-1 justify-content-between p-2 text-bg-light w-100" id="results">
            {(terms?.length > 0 || excluded.length > 0) && (
                <div className="align-items-center d-flex flex-row flex-wrap gap-1">
                    {resultCount >= 1 && <strong className="badge text-bg-dark" data-count={resultCount}>{`${resultCount} Result${resultCount !== 1 ? 's' : ''}`}</strong>}

                    {termBadges}
                    {excludedBadges}
                </div>
            )}
            {showSort && <select className="form-select py-0 w-auto" name="Sort" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                <option value="asc">Ascend</option>
                <option value="desc">Descend</option>
            </select>}
        </div>
    )
}
