import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import ErrorBoundary from '@/components/ErrorBoundary'
import '@/index.css'

const container = document.getElementById('root')
if (!container) {
  throw new Error('Root element "#root" not found — cannot mount the application.')
}

ReactDOM.createRoot(container).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
)
