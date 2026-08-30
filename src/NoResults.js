import {useTranslation} from 'react-i18next'

export default function NoResults() {
    const {t} = useTranslation()
    return (
        <div className="alert alert-light border-radius-0" role="alert">
            <p className="h5 mb-3">{t('noResults.title')}</p>
            <p><a href="/help.html">{t('noResults.help')}</a></p>
        </div>
    )
}
