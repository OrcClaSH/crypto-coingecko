import React, { FC, useEffect, useState } from 'react';

import cn from 'classnames';
import { observer } from 'mobx-react-lite';

import st from './FeaturedCategories.module.scss';

import { useStoresContext } from '@/App/pages/Home/Home';
import { FEATURED_CATEGORIES } from '@/utils/enums';

const FeaturedCategories: FC = () => {
  const filtersStore = useStoresContext().filters;
  const activeFilter = filtersStore.selectedFeatureCategory;
  const setActiveFilter = filtersStore.setActiveFeaturedCategory;
  const isSearchValue = Boolean(filtersStore.searchValue.length);
  const isSelectedCategory = Boolean(
    filtersStore.selectedCategory.filter((item) => item.key.length).length,
  ); // TODO
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClick = (item: FEATURED_CATEGORIES): void => {
    if (!isDisabled) setActiveFilter(item, true);
  };

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLLIElement>,
    item: FEATURED_CATEGORIES,
  ): void => {
    if (event.key === 'Enter') {
      if (!isDisabled) setActiveFilter(item, true);
    }
  };

  useEffect(() => {
    setIsDisabled(isSearchValue || isSelectedCategory);
  }, [isSearchValue, isSelectedCategory]);

  useEffect(() => {
    if (activeFilter !== 'Default') {
      setActiveFilter(FEATURED_CATEGORIES.Default, true);
    }
  }, [isSearchValue]);

  return (
    <ul className={cn(st.filter, isDisabled ? st.disable : '')} role="menu">
      {Object.values(FEATURED_CATEGORIES).map((item) => (
        <li
          className={cn(st.filter__item, item === activeFilter ? st.active : '')}
          onClick={() => handleClick(item)}
          key={item}
          role="menuitem"
          onKeyPress={(event) => handleKeyPress(event, item)}
          tabIndex={0}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

export default observer(FeaturedCategories);
