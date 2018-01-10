var cacheName = 'ppy-regist-01'
var cacheList = [
  '/',
  'index.html',
  'dist/app.js',
  'static/img/p_007vin.png',
]

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll(cacheList))
      .then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', e => {
  e.waitUntil(
    Promise.all(
      caches.keys().then(keys => (
        keys.map(key => {
          if(key !== cacheName) {
            return caches.delete(key)
          }
        })
      ))
    ).then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request)
      .then(res => res || fetch(e.request.url))
  )
})