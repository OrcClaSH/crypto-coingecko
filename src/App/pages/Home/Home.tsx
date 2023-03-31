import { FC, useContext } from 'react';

import CoinsPage from '../CoinsPage';
import localStores, { localStoresContext } from '@/store';
import CoinsHeader from '@/App/pages/CoinsPage/components/CoinsHeader';

import st from './Home.module.scss';

export const useStoresContext = () => useContext(localStoresContext);

const Home: FC = () => {

    const Provider = ({ children }: any) => {
        return (
            <localStoresContext.Provider value={localStores}>
                {children}
            </localStoresContext.Provider>
        )
    };

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
