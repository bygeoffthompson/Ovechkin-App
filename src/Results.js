import {useTranslation} from 'react-i18next'

export default function Results({showResults, terms, resultCount, showSort, sortOrder, setSortOrder}) {
    const {t} = useTranslation()
    if (!showResults) return null
    const termBadges = terms?.map(term => <strong key={term} className="badge text-bg-dark">{term}</strong>)
    return (
        <div className="align-items-start d-flex flex-column flex-sm-row gap-1 justify-content-between p-2 text-bg-light w-100" id="results">
            <div className="align-items-center d-flex flex-row flex-wrap gap-1">
                {resultCount >= 0 && <strong className="badge text-bg-danger" data-count={resultCount}>{`${resultCount} ${t(resultCount !== 1 ? 'results.results' : 'results.result')}`}</strong>}
                {termBadges?.length > 0 && <small><small>{t('results.for')}</small></small>}
                {termBadges}
            </div>
            {showSort && <select className="form-select py-0 w-auto" name="Sort" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                <option value="asc">{t('results.ascend')}</option>
                <option value="desc">{t('results.descend')}</option>
            </select>}
        </div>
    )
}
