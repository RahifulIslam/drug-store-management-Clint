import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleReCaptchaProvider reCaptchaKey="6Lff5iIqAAAAAOYAJZcJIjCigX-n1d3L5ijMEym3">
      <App />
    </GoogleReCaptchaProvider>
  </React.StrictMode>,
)