import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router-dom';

import './config/configureMobX';

import App from './App';
import ErrorPage from './App/pages/ErrorPage/ErrorPage';

import '@/assets/scss/main.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <ErrorBoundary fallback={<ErrorPage />}>
      <App />
    </ErrorBoundary>
  </BrowserRouter>,
);
