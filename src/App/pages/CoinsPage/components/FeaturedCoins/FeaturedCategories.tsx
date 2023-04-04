import { FC, useEffect, useState } from "react";
import cn from 'classnames';
import { observer } from "mobx-react-lite";

import { FEATURED_CATEGORIES } from "@/utils/enums";
import { useStoresContext } from "@/App/pages/Home/Home";

import st from './FeaturedCategories.module.scss';
import { toJS } from "mobx";

const FeaturedCategories: FC = () => {
    const filtersStore = useStoresContext().filters
    const activeFilter = filtersStore.selectedFeatureCategory
    const setActiveFilter = filtersStore.setActiveFeaturedCategory
    const isSearchValue = Boolean(filtersStore.searchValue.length)
    const isSelectedCategory = Boolean(filtersStore.selectedCategory.filter(item => item.key.length).length) // TODO
    const [isDisabled, setIsDisabled] = useState(false);

    const handleClick = (item: FEATURED_CATEGORIES) => {
        if (!isDisabled) setActiveFilter(item, true)
    }

    useEffect(() => {
        setIsDisabled(isSearchValue || isSelectedCategory)
    }, [isSearchValue, isSelectedCategory])

    useEffect(() => {
        if (activeFilter !== 'Default') {
            setActiveFilter(FEATURED_CATEGORIES.Default, true)
        }
    }, [isSearchValue])

    return (
        <ul className={cn(st.filter, isDisabled ? st.disable : '')}>
            {Object.values(FEATURED_CATEGORIES).map(item => (
                <li
                    className={cn(st.filter__item, item === activeFilter ? st.active : '')}
                    onClick={() => handleClick(item)}
                    key={item}
                >
                    {item}
                </li>
            ))}
        </ul>
    );
};

export default observer(FeaturedCategories);
