import cn from 'classnames';
import { FC, useEffect } from "react";
import { observer } from 'mobx-react-lite';

import Loader from '@/components/Loader';
import { useStoresContext } from '@/App/pages/Home/Home';

import st from './MarketStatus.module.scss';

const MarketStatus: FC = () => {
    const coinsStore = useStoresContext().coins
    const value = coinsStore.marketStatus

    const status = value !== null && value < 0
        ? 'down'
        : 'up'

    const classesValue = cn(
        st['market-status__value'],
        status === 'up' ? st['market-status--up'] : st['market-status--down'],
    )

    useEffect(() => {
        coinsStore.getMarketStatus()
    }, [])

    return (
        <div className={st['market-status']}>
            <p className={st['market-status__title']}>
                Market is {status}
            </p>
            <span className={classesValue}>
                {value ? value.toFixed(2) : <Loader />}%
            </span>
            <p className={st['market-status__subtitle']}>
                In the past 24 hours
            </p>
        </div>
    )
};

export default observer(MarketStatus);
