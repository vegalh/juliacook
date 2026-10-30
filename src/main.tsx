import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { LocaleProvider } from './i18n'
import { AgeGroupProvider } from './context/AgeGroupContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LocaleProvider>
      <AgeGroupProvider>
        <App />
      </AgeGroupProvider>
    </LocaleProvider>
  </StrictMode>,
)
