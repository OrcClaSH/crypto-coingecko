import { FC, useEffect } from 'react';

import getSymbolFromCurrency from 'currency-symbol-map';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

import { useStoresContext } from '../Home/Home';

import st from './CoinPage.module.scss';
import CoinHeader from './components/CoinHeader';
import Description from './components/Description';
import Graph from './components/Graph';
import PeriodButtons from './components/PeriodButtons';
import PriceTag from './components/PriceTag';
import Skeleton from './components/Skeleton';

import Card from '@/components/Card';
import { VS_CURRENCY_DEFAULT } from '@/config';
import rootStore from '@/store/RootStore';
import { Meta } from '@/utils/enums';

const CoinPage: FC = () => {
  const { id } = useParams();
  const coinStore = useStoresContext().coinDetail;
  const { coin } = coinStore;
  const vsCurrency = rootStore.query.paramsFromStores.vs_currency
    ? rootStore.query.paramsFromStores.vs_currency
    : VS_CURRENCY_DEFAULT.key;

  useEffect(() => {
    if (id) {
      coinStore.getCoin(id);
    }
  }, [id]);

  if (coinStore.meta === Meta.loading) return <Skeleton />;
  if (coinStore.meta !== Meta.success || !id) return null;

  return (
    <div className={st['coin-detail']}>
      <CoinHeader coin={coin} />
      <PriceTag coin={coin} vsCurrency={vsCurrency} />
      <div className={st['coin-detail__graph']}>
        <Graph id={id} />
      </div>
      <PeriodButtons />
      <Card
        image={coin.image}
        price={coin.currentPrice[vsCurrency].toLocaleString([], { currency: vsCurrency })}
        currencySymbol={getSymbolFromCurrency(vsCurrency)}
        priceChange={coin.priceChangePercentage_24hInCurrency[vsCurrency]
          .toFixed(2)
          .toString()}
        title={coin.name}
        subtitle={coin.symbol}
      />
      <Description coin={coin} />
    </div>
  );
};

export default observer(CoinPage);
