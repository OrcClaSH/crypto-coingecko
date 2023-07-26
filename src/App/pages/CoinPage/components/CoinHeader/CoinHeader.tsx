import { FC, useState, useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import st from './CoinHeader.module.scss';

import { ReactComponent as ArrowLeft } from '@/assets/img/arrow_left.svg';
import { ReactComponent as Star } from '@/assets/img/star.svg';
import { CoinDetailModel } from '@/store/models/coinDetail';

interface ICoinHeaderProps {
  coin: CoinDetailModel;
}

const CoinHeader: FC<ICoinHeaderProps> = ({ coin }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || '/';
  const { id } = coin;

  const handleFavoriteClick = (): void => {
    let favoriteIds: string[] = localStorage.getItem('favorites')?.split(',') || [];

    if (favoriteIds.includes(id)) {
      favoriteIds = favoriteIds.filter((item) => item !== id);
    } else {
      favoriteIds.push(id);
    }
    localStorage.setItem('favorites', favoriteIds.join(',').replace(/^,/, ''));
    setIsFavorite((prev) => !prev);
  };

  useEffect(() => {
    setIsFavorite(Boolean(localStorage.getItem('favorites')?.split(',').includes(id)));
  }, [id]);

  return (
    <div className={st['coin-header']}>
      <ArrowLeft className={st['coin-header-btn']} onClick={() => navigate(fromPage)} />
      <img className={st['coin-header-logo']} src={coin.image} alt="coin-logo" />
      <h3 className={st['coin-header-title']}>{coin.name}</h3>
      <p className={st['coin-header-subtitle']}>({coin.symbol.toLocaleUpperCase()})</p>
      <Star
        className={st['coin-header-logo--favorite']}
        onClick={handleFavoriteClick}
        fill={isFavorite ? '#FFA500' : '#343A40'}
      />
    </div>
  );
};

export default CoinHeader;
