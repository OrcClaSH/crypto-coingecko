import { FC, useState } from 'react';

import cn from 'classnames';
import DOMPurify from 'dompurify';

import st from './Description.module.scss';

import { CoinDetailModel } from '@/store/models/coinDetail';

interface IDescription {
  coin: CoinDetailModel;
}

const info = {
  hashingAlgorithm: 'hashing algorithm',
  genesisDate: 'genesis date',
  marketCapRank: 'market cap rank',
  publicInterestScore: 'public interest score',
};

const Description: FC<IDescription> = ({ coin }) => {
  const [readMore, setReadMore] = useState(false);
  const classesDescription = cn(
    st['coin-detail__description'],
    readMore ? st['coin-detail__description--active'] : '',
  );

  function createMarkup(): { __html: string } {
    return { __html: DOMPurify.sanitize(coin.description.en) };
  }

  return (
    <div className={st['coin-detail']}>
      <div className={st['coin-detail__info']}>
        {Object.keys(info).map((item) => {
          const propName = item as keyof typeof info;
          const propValue = coin[propName];

          if (propValue) {
            return (
              <p className={st['coin-detail__info-text']} key={item}>
                {info[propName]}: <span>{propValue}</span>
              </p>
            );
          }

          return null;
        })}
      </div>
      <div className={classesDescription} dangerouslySetInnerHTML={createMarkup()} />
      <button
        className={st['coin-detail__description-btn']}
        onClick={() => setReadMore((prev) => !prev)}
        type="button"
      >
        {readMore ? 'Read less' : 'Read more...'}
      </button>
    </div>
  );
};

export default Description;
