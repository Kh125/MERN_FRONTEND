const static_cache_name = "app_cache_v1"
const dynamic_cache_name = "dynamic_app_cache_v1"
const public_key = 'BM8TS8LROkfyBsbGvSE8z7BjYZyNkgyxI_x7T6b22qDbKkWYK4Up9ljpYtA6n7kZzqsuQMuL2eRP6Bb0Oq0NYP4'
var schedule_data = null
// Set up the interval to call the periodic function
const interval = 1 * 60 * 1000; // 1 minutes

const urls_to_cache = [
    '/',
    'vite.svg',
    'relax.svg',
    'location.svg',
    'person.svg',
    'clock.svg',
    '/schedule'
]

//  install event
self.addEventListener("install", (evt) => {
  console.log("Service worker has been installed");
  evt.waitUntil(
    caches.open(static_cache_name).then((cache) => {
      console.log("Caching all assets!");
      cache.addAll(urls_to_cache);
    })
  );
});

// activate event
self.addEventListener("activate", (evt) => {
  evt.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter(
            (key) => key !== static_cache_name && key != dynamic_cache_name
          )
          .map((key) => caches.delete(key))
      );
    })
  );
  console.log("Service worker has been activated!");
});

//fetch event handler
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        return response;
      })
      .catch(() => {
        return caches.match(event.request)
          .then((response) => {
            if (response) {
              return response;
            } else {
              console.log('No match in cache for:', event.request.url);
            }
          });
      })
  );
  console.log("Fetch Event Activated.");
});

self.addEventListener('notificationclick', function (event) {
  // Handle notification click event, e.g., open a specific page
  event.notification.close();
  // Add your custom logic here
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

setInterval(() => {
  showNotification("Hello", "From Service worker")
}, interval);