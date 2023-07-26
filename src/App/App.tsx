import { FC } from 'react';

import { observer } from 'mobx-react-lite';
import { Route, Routes, Navigate } from 'react-router-dom';

import CoinPage from './pages/CoinPage';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';

import Layout from '@/components/Layout';
import { useQueryParamsStoreInit } from '@/store/RootStore/hooks/useQueryParamsStoreInit';
import rootStore from '@/store/RootStore/instance';

const App: FC = () => {
  const error = rootStore.status.errorText;

  useQueryParamsStoreInit();

  if (error) {
    return <ErrorPage errorMessage={error} />;
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="coins">
          <Route path=":id" element={<CoinPage />} />
        </Route>
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default observer(App);
