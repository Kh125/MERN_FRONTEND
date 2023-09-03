import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RecoilRoot } from "recoil";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js") // Adjust the path to your service worker file
    .then((registration) => {
      console.log("Service Worker is registered successfully!");

      // Call a separate function to request notification permission
      requestNotificationPermission(registration);
    })
    .catch((err) => console.log("Service Worker not registered.", err));
}

function requestNotificationPermission(registration) {
  if ("Notification" in window) {
    Notification.requestPermission().then(function (permission) {
      if (permission === "granted") {
        // User granted permission, send a message to the service worker to subscribe the user
        if (registration.active) {
          registration.active.postMessage({ action: "subscribeUser" });
        }
      }
    });
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>
);
