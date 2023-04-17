import { FC } from 'react';

import Coins from './components/Coins/Coins';
import Pagination from '@/components/Pagination';
import FeaturedCategories from './components/FeaturedCoins';

import st from './CoinsPage.module.scss';

const CoinsPage: FC = () => {

    return (
        <div className={st.coins}>
            <FeaturedCategories />
            <div className={st.coins__items}>
                <Coins />
                <Pagination />
            </div>
        </div>
    )
}

export default CoinsPage
