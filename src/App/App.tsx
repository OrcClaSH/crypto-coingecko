import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Route, Routes, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import CoinPage from './pages/CoinPage';
import Layout from '@/components/Layout';
import ErrorPage from './pages/ErrorPage';
import rootStore from '@/store/RootStore/instance';
import { useQueryParamsStoreInit } from '@/store/RootStore/hooks/useQueryParamsStoreInit';

const App: FC = () => {
  const error = rootStore.status.errorText;
  // if (error) {
  //   return <ErrorPage errorMessage={error}/>
  // };

  useQueryParamsStoreInit();

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='coins'>
          <Route path=':id' element={<CoinPage />} />
        </Route>
        <Route path='/error' element={<ErrorPage errorMessage={error}/>}/>
        <Route path='*' element={<Navigate to='/' replace />} />
      </Route>
    </Routes>
  );
};

export default observer(App);
