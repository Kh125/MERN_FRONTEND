import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RecoilRoot } from 'recoil';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js') // Adjust the path to your service worker file
    .then(() => {
      console.log("Service Worker is registered successfully!")
    })
    .catch((err) => console.log("Service Worker not registered.", err));
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>
);