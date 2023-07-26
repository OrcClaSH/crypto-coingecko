import { FC, useCallback, useEffect, useState } from 'react';

import debounce from 'lodash.debounce';
import { observer } from 'mobx-react-lite';

import ListParamsBtn from '../ListParamsBtn';

import st from './CoinsHeader.module.scss';

import CoinsDropdown from '@/App/pages/CoinsPage/components/CoinsDropdown';
import MarketStatus from '@/App/pages/CoinsPage/components/MarketStatus';
import { useStoresContext } from '@/App/pages/Home/Home';
import { ReactComponent as SearchImg } from '@/assets/img/search.svg';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { useChangeFromParams } from '@/hooks/useChangeFromParams';
import { useChangeParamsFromStore } from '@/hooks/useChangeParamsFromStore';

const CoinsHeader: FC = () => {
  const [searchActive, setSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const filtersStore = useStoresContext().filters;
  const searchValueInStorage = filtersStore.searchValue;

  useChangeFromParams();

  useChangeParamsFromStore();

  const debounceSearch = useCallback(
    debounce((searchText: string) => {
      filtersStore.setSearchValue(searchText);
    }, 700),
    [],
  );

  useEffect(() => {
    if (searchValueInStorage !== searchValue) {
      debounceSearch(searchValue);
    }
  }, [searchValue]);

  useEffect(() => {
    setSearchValue(searchValueInStorage);
  }, [searchValueInStorage]);

  return (
    <>
      <div className={st.search}>
        {searchActive ? (
          <div className={st.search__input}>
            <Input
              value={searchValue}
              onChange={setSearchValue}
              className={st.search__input}
              placeholder="Search Cryptocurrency"
            />
          </div>
        ) : (
          <MarketStatus />
        )}
        <Button
          className={searchActive ? st.active : st.search__btn}
          onClick={() => setSearchActive((prev) => !prev)}
        >
          <SearchImg className={st['search__btn-icon']} />
        </Button>
      </div>
      <CoinsDropdown searchActive={searchActive} />
      <ListParamsBtn />
    </>
  );
};

export default observer(CoinsHeader);
