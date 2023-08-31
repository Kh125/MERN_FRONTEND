const cache_name = "app_cache"
const dynamicCacheName = "dynamic_app_cache"

const urls_to_cache = [
]

//  install event
self.addEventListener('install', evt => {
    console.log("Service worker has been installed")
    evt.waitUntil(
        caches.open(cache_name)
            .then(cache => {
                console.log("Caching all assets!")
                //now we using dynamic caching process to be more flexible instead of manually adding caching assets
                cache.addAll(urls_to_cache)
            })
    )
})

// activate event
self.addEventListener('activate', evt => {
    console.log("Service worker has been activated!")
})

//fetch event handler
self.addEventListener('fetch', evt => {
    console.log("Fetch event", evt);
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request).then(fetchRes => {
                return caches.open(dynamicCacheName).then(cache => {
                        cache.put(evt.request.url, fetchRes.clone())
                        return fetchRes
                })
            })
        }).catch(() => console.log("Error on fetching!"))
    )
})