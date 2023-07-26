import { FC } from 'react';

import cn from 'classnames';
import getSymbolFromCurrency from 'currency-symbol-map';

import st from './PriceTag.module.scss';

import { CoinDetailModel } from '@/store/models/coinDetail';

interface IPriceTagProps {
  vsCurrency: string;
  coin: CoinDetailModel;
}

const PriceTag: FC<IPriceTagProps> = ({ vsCurrency, coin }) => {
  const currentPrice = `${getSymbolFromCurrency(vsCurrency)} ${coin.currentPrice[
    vsCurrency
  ].toLocaleString([], { currency: vsCurrency })}`;
  const percent = coin.priceChangePercentage_24hInCurrency[vsCurrency];
  const isPositive = percent > 0;
  const classesPercent = cn(
    st.pricetag__percent,
    isPositive ? st['pricetag__percent--positive'] : st['pricetag__percent--negative'],
  );

  return (
    <div className={st.pricetag}>
      <h3 className={st.pricetag__price}>{currentPrice}</h3>
      <p className={classesPercent}>
        {isPositive && '+'}
        {`${coin.priceChange_24hInCurrency[vsCurrency].toFixed(3)} `}({percent.toFixed(2)}
        %)
      </p>
      <p className={st.pricetag__text}>In the past 24 hours</p>
    </div>
  );
};

export default PriceTag;
