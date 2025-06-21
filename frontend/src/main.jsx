 import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// 1. Import all the necessary providers
import { ThemeProvider } from './context/ThemeContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { GamificationProvider } from './context/GamificationContext.jsx';

 ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* ThemeProvider   */}
    <ThemeProvider>
      {/* AuthProvider   */}
      <AuthProvider>
        {/* GamificationProvider  */}
        <GamificationProvider>
          <App />
        </GamificationProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
);