import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const metaThemeColor = document.querySelector("meta[name=theme-color]");
if (metaThemeColor) {
    metaThemeColor.setAttribute("content", "#000000");
}

const metaColorScheme = document.querySelector("meta[name=color-scheme]");
if (metaColorScheme) {
    metaColorScheme.setAttribute("content", "dark");
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
