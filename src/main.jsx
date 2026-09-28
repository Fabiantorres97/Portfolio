import React from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource-variable/manrope'
import '@fontsource-variable/plus-jakarta-sans'
import App from './App.jsx'
import './index.css'

// Scroll reveals only hide content once JS is running, so the page stays readable if scripts fail.
document.documentElement.classList.add('js')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
