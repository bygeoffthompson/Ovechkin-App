export default function YoutubeFrame({ videoId, start, end }) {
    const params = new URLSearchParams({ rel: 0, playsinline: 1 })
    if (start) params.set('start', Math.floor(Number(start)))
    if (end) params.set('end', Math.floor(Number(end)))
    return (
        <iframe
            className="iframe w-100"
            src={`https://www.youtube-nocookie.com/embed/${videoId}?${params}`}
            allowFullScreen
            title="Goal"
        />
    )
}
