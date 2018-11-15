import App from "../common/App";
import BrowserRouter from "react-router-dom/BrowserRouter";
import React from "react";
import { hydrate } from "react-dom";
let deferredPrompt;

window.addEventListener("beforeinstallprompt", e => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  // e.preventDefault();
  console.log(e);
  deferredPrompt = e;
  deferredPrompt.prompt();
});

window.addEventListener("appinstalled", evt => {
  console.log(evt);
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js");
}

hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept();
}
