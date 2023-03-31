import { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import getSymbolFromCurrency from 'currency-symbol-map';

import Card from '@/components/Card';
import rootStore from '@/store/RootStore/instance';
import { useStoresContext } from '../../../Home/Home';

const FoundCoins: FC = () => {
    const CoinsStore = useStoresContext().coins
    const vsCurrency = useStoresContext().filters.selectedCurrency
    const navigate = useNavigate()

    useEffect(() => {
        CoinsStore.getFoundCoinsList();
    }, [rootStore.query.paramsFromStores]);

    const handleOnClick = (id: string) => {
        navigate(`/coins/${id}`)
    }

    return (
        <>
            {CoinsStore.meta === 'success'
                && CoinsStore.coins.map(item => (
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
    )
};

export default observer(FoundCoins);
