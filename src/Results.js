export default function Results({showResults, terms, excludedLabels, resultCount, showSort, sortOrder, setSortOrder}) {
    if (!showResults) return null
    const termBadges = terms?.map(t => <strong key={t} className="badge bg-white text-dark">{t}</strong>)
    const excludedBadges = excludedLabels?.map(l => <strong key={l} className="badge text-bg-danger">✕&nbsp;{l}</strong>)
    return (
        <div className="align-items-start d-flex flex-column flex-sm-row gap-1 justify-content-between mb-3 p-2 shadow-sm text-bg-light w-100" id="results">
            {showSort && <select className="form-select py-0 w-auto" name="Sort" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                <option value="asc">Ascend</option>
                <option value="desc">Descend</option>
            </select>}
            <div className="align-items-center d-flex flex-row flex-wrap gap-1">
                {resultCount >= 1 && <strong className="badge text-bg-dark" data-count={resultCount}>{`${resultCount} Result${resultCount !== 1 ? 's' : ''}`}</strong>}
                {termBadges}
                {excludedBadges}
            </div>
        </div>
    )
}
