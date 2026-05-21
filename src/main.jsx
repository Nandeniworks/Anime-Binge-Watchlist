import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import WatchlistProvider from './context/WatchlistContext.jsx'
import ThemeProvider from './context/ThemeContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <WatchlistProvider>
        <App />
      </WatchlistProvider>
    </ThemeProvider>
  </React.StrictMode>,
)