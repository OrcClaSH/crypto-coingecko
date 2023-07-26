import { FC, useEffect } from 'react';

import getSymbolFromCurrency from 'currency-symbol-map';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import { useStoresContext } from '../../../Home/Home';

import Card from '@/components/Card';
import SkeletonCard from '@/components/SkeletonCard';
import { API_ENDPOINTS } from '@/config';
import rootStore from '@/store/RootStore/instance';
import { Meta } from '@/utils/enums';

const Coins: FC = () => {
  const CoinsStore = useStoresContext().coins;
  const vsCurrency = useStoresContext().filters.selectedCurrency;
  const isSearch = Boolean(rootStore.query.paramsFromStores.query);
  const navigate = useNavigate();

  const handleOnClick = (id: string): void => {
    navigate(`/coins/${id}`);
  };

  useEffect(() => {
    CoinsStore.getCoinsList();
  }, [rootStore.query.paramsFromStores]);

  useEffect(() => {
    if (isSearch) {
      CoinsStore.getFoundCoinsList();
    }
  }, [rootStore.query.paramsFromStores.query]);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {CoinsStore.meta === Meta.success
        ? CoinsStore.coins.map((item) => (
            <Card
              key={item.id}
              id={item.id}
              image={item.image}
              title={item.name}
              subtitle={item.symbol.toUpperCase()}
              currencySymbol={getSymbolFromCurrency(vsCurrency.key)}
              price={
                item.currentPrice?.toLocaleString([], { currency: vsCurrency.key }) ?? 0
              }
              priceChange={item.priceChangePercentage24h?.toFixed(2) ?? 0}
              graphData={item.sparkline}
              onClick={() => handleOnClick(item.id)}
            />
          ))
        : [...Array(+API_ENDPOINTS.PER_PAGE).keys()].map((item) => (
            <SkeletonCard key={item} />
          ))}
    </>
  );
};

export default observer(Coins);
