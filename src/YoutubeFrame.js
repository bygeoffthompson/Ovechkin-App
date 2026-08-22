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

export default function YoutubeFrame({ videoId, autoplay, start, end }) {
  const wrapperRef = useRef(null)
  const playerRef = useRef(null)
  const readyRef = useRef(false)
  const autoplayRef = useRef(autoplay)
  autoplayRef.current = autoplay
  useEffect(() => {
    if (!videoId || !wrapperRef.current) return
    const autoplay = autoplayRef.current
    let cancelled = false

    const div = document.createElement('div')
    wrapperRef.current.appendChild(div)

    onYtReady(() => {
      if (cancelled) return
      playerRef.current = new window.YT.Player(div, {
        host: 'https://www.youtube-nocookie.com',
        playerVars: {
          rel: 0,
          playsinline: 1,
          origin: window.location.origin,
          ...(autoplay ? { mute: 1 } : {}),
        },
        events: {
          onReady: (e) => {
            if (cancelled) return
            readyRef.current = true
            const iframe = e.target.getIframe()
            iframe.classList.add('w-100')
            iframe.removeAttribute('height')
            iframe.removeAttribute('width')
            const opts = {
              videoId,
              ...(start ? { startSeconds: Number(start) } : {}),
              ...(end ? { endSeconds: Number(end) } : {}),
            }
            autoplay ? e.target.loadVideoById(opts) : e.target.cueVideoById(opts)
          },
        },
      })
    })

    return () => {
      cancelled = true
      readyRef.current = false
      playerRef.current?.destroy()
      playerRef.current = null
      if (div.parentNode) div.parentNode.removeChild(div)
    }
  }, [videoId, start, end])

  useEffect(() => {
    if (autoplay && readyRef.current) playerRef.current?.playVideo()
  }, [autoplay])

  return <div ref={wrapperRef} className="bg-black h-100 w-100" />
}
