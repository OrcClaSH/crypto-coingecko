import { FC, useContext } from 'react';

import CoinsPage from '../CoinsPage';
import CoinsHeader from '../CoinsPage/components/CoinsHeader/CoinsHeader';

import st from './Home.module.scss';

import { Provider } from '@/components/LocalStoragesProvider/LocalStoragesProvider';
import { LocalStores, localStoresContext } from '@/store';

export const useStoresContext = (): LocalStores => useContext(localStoresContext);

const Home: FC = () => {
  return (
    <div className={st.App}>
      <Provider>
        <CoinsHeader />
        <CoinsPage />
      </Provider>
    </div>
  );
};

export default Home;
