export const requestNotificationPermission = () => {
  if ("Notification" in window) {
    Notification.requestPermission().then(function (permission) {
      if (permission === "granted") {
        // User granted permission, send a message to the service worker to subscribe the user
        if (navigator?.serviceWorker?.controller) {
          navigator.serviceWorker.controller.postMessage({
            action: "subscribeUser",
          });
        }
      }
    });
  }
};
