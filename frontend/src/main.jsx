// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';

// import App from './App.jsx';
// import './App.css';

// console.log("✅ main.jsx is running!");

// const rootElement = document.getElementById('root');

// if (!rootElement) {
//     console.error("❌ Root element not found! Check index.html.");
// } else {
//     ReactDOM.createRoot(rootElement).render(
//         <BrowserRouter>
//             <App />
//         </BrowserRouter>
//     );
// }
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import App from './App.jsx';
import './App.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
