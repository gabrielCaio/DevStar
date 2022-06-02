import React from 'react'
import ReactDOM from 'react-dom/client'

// Routes
import { BrowserRouter } from 'react-router-dom'
import { Router } from './pages/routes'

import GlobalStyle from '../globalStyles'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalStyle />
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </React.StrictMode>
)
