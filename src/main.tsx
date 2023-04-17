import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';

import App from './App'
import './config/configureMobX'
import { ErrorBoundary } from 'react-error-boundary';
import ErrorPage from './App/pages/ErrorPage/ErrorPage';

import '@/assets/scss/main.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <ErrorBoundary fallback={<ErrorPage />}>
      <App />
    </ErrorBoundary>
  </BrowserRouter>
)
