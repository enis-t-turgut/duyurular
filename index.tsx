// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';

// const rootElement = document.getElementById('root');
// if (!rootElement) {
//   throw new Error("Could not find root element to mount to");
// }

// const root = ReactDOM.createRoot(rootElement);
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// --- DIAGNOSTIC TEST ---
// This code is a simple test to confirm if this script file is being loaded and executed at all.
// If you see the message below on your deployed page, it means the script loading is working,
// and the problem is likely within the React application itself.
// If you still see a blank page, the issue is with loading this file.
console.log("index.tsx diagnostic test is running...");
document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = '<h1 style="text-align: center; margin-top: 50px; font-family: sans-serif; color: #333;">Test Başarılı! Script çalışıyor.</h1>';
});
