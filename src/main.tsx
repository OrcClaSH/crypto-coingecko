import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client'

import './config/configureMobX'
import App from './App'

import '@/assets/scss/main.scss';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorPage from './App/pages/ErrorPage/ErrorPage';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <BrowserRouter>
    <ErrorBoundary fallback={<ErrorPage />}>
      <App />
    </ErrorBoundary>
  </BrowserRouter>
  // </React.StrictMode>,
)
