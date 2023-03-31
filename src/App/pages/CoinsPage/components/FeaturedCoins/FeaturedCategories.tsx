import { FC } from "react";
import cn from 'classnames';
import { observer } from "mobx-react-lite";

import { FEATURED_CATEGORIES } from "@/utils/enums";
import { useStoresContext } from "@/App/pages/Home/Home";

import st from './FeaturedCategories.module.scss';

const FeaturedCategories: FC = () => {
    const activeFilter = useStoresContext().filters.selectedFeatureCategory
    const setActiveFilter = useStoresContext().filters.setActiveFeaturedCategory

    return (
        <ul className={st.filter}>
            {Object.values(FEATURED_CATEGORIES).map(item => (
                <li
                    className={cn(st.filter__item, item === activeFilter ? st.active : '')}
                    onClick={() => setActiveFilter(item, true)}
                    key={item}
                >
                    {item}
                </li>
            ))}
        </ul>
    );
};

export default observer(FeaturedCategories);
