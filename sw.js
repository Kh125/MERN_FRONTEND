const static_cache_name = "app_cache_v1"
const dynamic_cache_name = "dynamic_app_cache_v1"
const public_key = 'BM8TS8LROkfyBsbGvSE8z7BjYZyNkgyxI_x7T6b22qDbKkWYK4Up9ljpYtA6n7kZzqsuQMuL2eRP6Bb0Oq0NYP4'
var schedule_data = null
// Set up the interval to call the periodic function
const interval = 0.25 * 60 * 1000; // 1 minutes
let intervalId;

const urls_to_cache = [
    '/',
    'vite.svg',
    'notification-icon.svg',
    '/schedule'
]

//  install event
self.addEventListener("install", (evt) => {
  console.log("Service worker has been installed");
  evt.waitUntil(
    caches.open(static_cache_name).then((cache) => {
      console.log("Caching all assets!");
      try {
        cache.addAll(urls_to_cache);
      } catch (error) {
        console.error('Error caching resources:', error);
      }
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
        console.log("Can't fetch request");
      })
  );
  console.log("Fetch Event Activated.");
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close(); // Close the notification

  const customData = event.notification.data; // Access the custom data

  const url = `http://localhost:5173/location/${customData.id}`;

  event.waitUntil(
    clients.openWindow(url)
  );
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

  if (event.data && event.data.action === 'logout') {
    console.log("Interval Cleared");
    clearInterval(intervalId)
  }

  if (event.data && event.data.action === 'login') {
    console.log("Interval Started");
    startInterval()
  }
});

// Periodic function with push notification
function showNotification(title, message, id) {
  // Send a push notification
  self.registration.showNotification(title, {
    body: message,
    icon: 'notification-icon.svg', // Path to the notification icon
    data: {
      id
    }
  });
}

const startInterval = () => {
  intervalId = setInterval(() => {
    retrieveCurrentDateDataFromIndexedDB()
      .then(({ currentDayData, triggeredPeriods }) => {
        if(isWithinCustomizedTimeInterval()) {
          const period = retrieveComingPeriodData(currentDayData, 15);
          
          if (period && !isMatched(period.Period, triggeredPeriods)) {
                const alertMessage = `Class "${period.Subject}" is starting in 15 minutes at ${period.Location}.`;
                showNotification('Upcoming Class', alertMessage, period.Period);
                storeTriggeredPeriodToIndexedDB(period)
          } else if (!period) {
            showNotification('No classes');
          }
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, interval);
}

const isMatched = (inputPeriod, triggeredPeriods) => {
  for (const period of triggeredPeriods) {
    if (period.id === inputPeriod) {
      return true
    }
  }

  return false
}

//#region Private Methods
const retrieveCurrentDateDataFromIndexedDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('uniNotify');

    request.onupgradeneeded = function(event) {
      const db = event.target.result;
    
      // Create object store if it doesn't exist
      if (!db.objectStoreNames.contains('triggeredPeriods')) {
        db.createObjectStore('triggeredPeriods', { keyPath: 'id' });
      }

      if (!db.objectStoreNames.contains('schedule')) {
        db.createObjectStore('schedule', { keyPath: 'id', autoIncrement: true });
      }
    };

    request.onsuccess = function(event) {
      const db = event.target.result;
      const transaction = db.transaction(['schedule'], 'readonly');
      const objectStore = transaction.objectStore('schedule');
      const getRequest = objectStore.get(1);

      const currentDay = getCurrentDayString();

      getRequest.onsuccess = function(event) {
        const data = event.target.result;

        if (data && data.schedule) {
          const currentDayData = data.schedule[currentDay];

          // Open a new transaction for triggeredPeriods
          const triggeredTransaction = db.transaction(['triggeredPeriods'], 'readonly');
          const triggeredObjectStore = triggeredTransaction.objectStore('triggeredPeriods');
          const getTriggeredRequest = triggeredObjectStore.getAll();

          getTriggeredRequest.onsuccess = function(event) {
            const triggeredPeriods = event.target.result;

            console.log(currentDayData, triggeredPeriods);
            resolve({
              currentDayData: currentDayData,
              triggeredPeriods: triggeredPeriods
            });
          };

          getTriggeredRequest.onerror = function(event) {
            reject(event.target.error);
          };
        } else {
          reject(new Error('No data for the current day'));
        }
      };

      getRequest.onerror = function(event) {
        reject(event.target.error);
      };
    };

    request.onerror = function(event) {
      reject(event.target.error);
    };
  });
};

const retrieveComingPeriodData = (periodList, minutes) => {
  const currentTimestamp = Date.now()
  const nextTimeStamp = currentTimestamp + (minutes * 60 * 1000) // 15 minute in milliseconds

  for(const period of periodList) {
    const fromTimestamp = getTimestamp(period.from)

    if(fromTimestamp >= currentTimestamp && fromTimestamp <= nextTimeStamp){
      return period
    }
  }

  return false
}

const getCurrentDayString = () => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDate = new Date();
  return daysOfWeek[currentDate.getDay()];
}

// Generate timestamp format for input time
function getTimestamp(timeString) {
  // Split the time string into hours and minutes
  const [time, period] = timeString.split(' ');
  const [hours, minutes] = time.split(':').map(Number);

  // Create a new Date object with today's date and the specified time
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);

  // Adjust for AM/PM by adding 12 hour for 24 hour format
  if ((period === "PM" || period === "pm") && hours !== 12) {
    date.setHours(date.getHours() + 12);
  }

  // Return the timestamp for input time eg. 7:30 AM
  return date.getTime();
}

function isTimeWithinInterval(startHour, startMinute, endHour, endMinute) {
  const now = new Date();
  const startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), startHour, startMinute);
  const endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), endHour, endMinute);

  return now >= startTime && now <= endTime;
}

function isWithinCustomizedTimeInterval() {
  return isTimeWithinInterval(8, 15, 8, 30) ||
  isTimeWithinInterval(9, 25, 9, 40) ||
  isTimeWithinInterval(10, 35, 10, 50) ||
  isTimeWithinInterval(12, 25, 12, 40) ||
  isTimeWithinInterval(13, 35, 13, 50) ||
  isTimeWithinInterval(14, 45, 15, 0)
}

function storeTriggeredPeriodToIndexedDB(period) {
  const request = indexedDB.open('uniNotify', 2);

  request.onsuccess = function(event) {
    const db = event.target.result;

    const transaction = db.transaction(['triggeredPeriods'], 'readwrite');
    const objectStore = transaction.objectStore('triggeredPeriods');
    // current timestamp
    const timestamp = new Date().getTime();

    objectStore.add({ 
      id: period.Period,
      lecture: period.Lecture,
      location: period.Location,
      subject: period.Subject,
      subjectId: period.SubjectID,
      teacher: period.Teacher,
      teacherPhNo: period.TeacherPhNo,
      from: period.from,
      to: period.to,
      timestamp
    });
  };

  request.onerror = function(event) {
    console.error('Error opening database:', event.target.error);
  };
}
//#endregion