import { useEffect, useRef } from 'react'

let ytState = 'idle'
let ytQueue = []

function onYtReady(cb) {
  if (window.YT?.Player || ytState === 'ready') {
    ytState = 'ready'
    cb()
    return
  }
  ytQueue.push(cb)
  if (ytState === 'idle') {
    ytState = 'loading'
    window.onYouTubeIframeAPIReady = () => {
      ytState = 'ready'
      ytQueue.forEach(fn => fn())
      ytQueue = []
    }
    const s = document.createElement('script')
    s.src = 'https://www.youtube.com/iframe_api'
    document.head.appendChild(s)
  }
}

export default function YoutubeFrame({ videoId, autoplay }) {
  const wrapperRef = useRef(null)
  const playerRef = useRef(null)
  useEffect(() => {
    if (!videoId || !wrapperRef.current) return
    let cancelled = false

    const div = document.createElement('div')
    wrapperRef.current.appendChild(div)

    onYtReady(() => {
      if (cancelled) return
      playerRef.current = new window.YT.Player(div, {
        videoId,
        host: 'https://www.youtube-nocookie.com',
        playerVars: {
          autohide: 0,
          rel: 0,
          modestbranding: 1,
          ...(autoplay ? { autoplay: 1, mute: 1 } : {}),
        },
        events: {
          onReady: (e) => {
            if (cancelled) return
            const iframe = e.target.getIframe()
            iframe.classList.add('w-100')
            iframe.removeAttribute('height')
            iframe.removeAttribute('width')
          },
        },
      })
    })

    return () => {
      cancelled = true
      playerRef.current?.destroy()
      playerRef.current = null
      if (div.parentNode) div.parentNode.removeChild(div)
    }
  }, [videoId, autoplay]) // eslint-disable-line react-hooks/exhaustive-deps

  return <div ref={wrapperRef} className="bg-black h-100 w-100" />
}
