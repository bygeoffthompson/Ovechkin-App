/* eslint-disable no-restricted-globals */
import { clientsClaim } from 'workbox-core'
import { ExpirationPlugin } from 'workbox-expiration'
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { StaleWhileRevalidate } from 'workbox-strategies'

clientsClaim()

// Precache all build assets (JS, CSS, etc.) — manifest injected by CRA at build time
precacheAndRoute(self.__WB_MANIFEST)

// SPA fallback: return index.html for any navigate request
const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$')
registerRoute(
    ({ request, url }) => {
        if (request.mode !== 'navigate') return false
        if (url.pathname.startsWith('/_')) return false
        if (url.pathname.match(fileExtensionRegexp)) return false
        return true
    },
    createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html')
)

// goals.json: serve cached copy immediately, refresh in background
registerRoute(
    ({ url }) => url.pathname.endsWith('/goals.json'),
    new StaleWhileRevalidate({
        cacheName: 'goals-data',
        plugins: [new ExpirationPlugin({ maxEntries: 1, maxAgeSeconds: 7 * 24 * 60 * 60 })]
    })
)
