import { FC } from 'react';
import { observer } from 'mobx-react-lite';

import Coins from './components/Coins/Coins';
import FeaturedCategories from './components/FeaturedCoins';
import Pagination from '@/components/Pagination';
import rootStore from '@/store/RootStore/instance';
import { FEATURED_CATEGORIES } from '@/utils/enums';

import st from './CoinsPage.module.scss';

const CoinsPage: FC = () => {
    const isFavoritesCategory = rootStore.query.paramsFromStores.feature === FEATURED_CATEGORIES.Favorites

    return (
        <div className={st.coins}>
            <FeaturedCategories />
            <div className={st.coins__items}>
                <Coins />
                {!isFavoritesCategory && <Pagination />}
            </div>
        </div>
    )
}

export default observer(CoinsPage);
