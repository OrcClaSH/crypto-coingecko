import { FC, useEffect } from 'react';

import getSymbolFromCurrency from 'currency-symbol-map';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import { useStoresContext } from '../../../Home/Home';

import Card from '@/components/Card';
import rootStore from '@/store/RootStore/instance';

const FoundCoins: FC = () => {
  const CoinsStore = useStoresContext().coins;
  const vsCurrency = useStoresContext().filters.selectedCurrency;
  const navigate = useNavigate();

  useEffect(() => {
    CoinsStore.getFoundCoinsList();
  }, [rootStore.query.paramsFromStores]);

  const handleOnClick = (id: string): void => {
    navigate(`/coins/${id}`);
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {CoinsStore.meta === 'success' &&
        CoinsStore.coins.map((item) => (
          <Card
            key={item.id}
            id={item.id}
            image={item.image}
            title={item.name}
            subtitle={item.symbol.toUpperCase()}
            currencySymbol={getSymbolFromCurrency(vsCurrency.key)}
            price={item.currentPrice.toLocaleString([], { currency: vsCurrency.key })}
            priceChange={item.priceChangePercentage24h?.toFixed(2) ?? 0}
            graphData={item.sparkline}
            onClick={() => handleOnClick(item.id)}
          />
        ))}
    </>
  );
};

export default observer(FoundCoins);
