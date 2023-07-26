import { FC, useEffect } from 'react';

import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

import st from './CoinsDropdown.module.scss';

import { useStoresContext } from '@/App/pages/Home/Home';
import MultiDropdown from '@/components/MultiDropdown';
import rootStore from '@/store/RootStore/instance';
import { handlerCoinsDropdownOptions } from '@/utils';

interface ICoinsDropdownProps {
  searchActive: boolean;
}

const CoinsDropdown: FC<ICoinsDropdownProps> = ({ searchActive }) => {
  const filtersStore = useStoresContext().filters;
  const isDisabled = Boolean(filtersStore.searchValue) && searchActive;
  const isRateLimit = rootStore.status.isLimitRate;

  useEffect(() => {
    filtersStore.getCategoriesList(isRateLimit);
  }, [isRateLimit]);

  useEffect(() => {
    filtersStore.getCurrenciesList(isRateLimit);
  }, [isRateLimit]);

  return (
    <div className={st['coins-dropdown']}>
      <Link to="/" replace>
        <h1 className={st['coins-dropdown__title']}>Coins</h1>
      </Link>
      <MultiDropdown
        {...handlerCoinsDropdownOptions(searchActive, filtersStore)}
        disabled={isDisabled}
      />
    </div>
  );
};

export default observer(CoinsDropdown);
