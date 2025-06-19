 import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx' // <-- IMPORT HERE

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider> {/* <-- WRAP APP WITH AUTH PROVIDER */}
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
)