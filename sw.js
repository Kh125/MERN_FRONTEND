const static_cache_name = "app_cache_v1"
const dynamic_cache_name = "dynamic_app_cache_v1"
const public_key = 'BM8TS8LROkfyBsbGvSE8z7BjYZyNkgyxI_x7T6b22qDbKkWYK4Up9ljpYtA6n7kZzqsuQMuL2eRP6Bb0Oq0NYP4'

const urls_to_cache = [
    '/',
    'vite.svg',
]

//  install event
self.addEventListener('install', evt => {
    console.log("Service worker has been installed")
    evt.waitUntil(
        caches.open(static_cache_name)
            .then(cache => {
                console.log("Caching all assets!")
                cache.addAll(urls_to_cache)
            })
    )
})

// activate event
self.addEventListener('activate', evt => {
    evt.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== static_cache_name && key != dynamic_cache_name)
                    .map(key => caches.delete(key))
            )
        })
    )
    console.log("Service worker has been activated!")
})

//fetch event handler
self.addEventListener('fetch', evt => {
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            // Check if the request URL starts with 'http://openweathermap.org/img' and store it for offline use
            if (evt.request.url.startsWith('http://openweathermap.org/img')) {
              return cacheRes || fetch(evt.request).then(fetchRes => {
                  return caches.open(dynamic_cache_name).then(cache => {
                      cache.put(evt.request.url, fetchRes.clone())
                      return fetchRes
                  })
              })
            } else {
              // For other requests, don't cache them
              return fetch(evt.request);
            }
        }).catch(() => {
            console.log("Failed to fetch!");
        })
      )
})

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.action === 'subscribeUser') {
    // Function to subscribe the user for push notifications
    const subscribeUser = () => {
        return self.registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: public_key,
        });
    }

    // Subscribe the user
    subscribeUser()
      .then((subscription) => {
        console.log('User subscribed:', subscription);
      })
      .catch((error) => {
        console.error('Failed to subscribe user:', error);
      });
  }
});

// Periodic function with push notification
function showNotification(title, message) {
  // Send a push notification
  self.registration.showNotification(title, {
    body: message,
    icon: 'vite.svg', // Path to the notification icon
  });
}