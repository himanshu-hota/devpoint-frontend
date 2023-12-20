import React from 'react'
import ReactDOM from 'react-dom/client'
import {QueryClientProvider} from '@tanstack/react-query'
import App from './App.jsx'
import AuthProvider from './context/Auth/AuthProvider.jsx'
import './index.css';
import { ThemeProvider } from './context/ThemeContext/ThemeContext.jsx';
import { queryClient } from './query/api.js'
// Create a client


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
