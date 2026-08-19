import ActiveTags from './ActiveTags'

export default function NoResults({terms, disabledLeagues}) {
    return (
        <div className="alert alert-light" role="alert">
            <p className="h5 mb-3">No Results</p>
            <div className="mb-3"><ActiveTags terms={terms} disabledLeagues={disabledLeagues} /></div>
            <p><a href="/help.html">Help</a></p>
        </div>
    )
}
