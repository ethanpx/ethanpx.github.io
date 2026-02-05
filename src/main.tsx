import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'

import '@/static/styles/index.css'

createRoot(document.getElementById('app-root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
