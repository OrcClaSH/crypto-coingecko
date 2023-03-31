import { createContext } from 'react';

import CoinsStore from "./CoinsStore/CoinsStore";
import FiltersStore from "./FiltersStore/FiltersStore";
import CoinDetailStore from './CoinDetailStore/CoinDetailStore';
import GraphStore from './GraphStore/GraphStore';

class LocalStores {
    coins: CoinsStore;
    coinDetail: CoinDetailStore;
    filters: FiltersStore;
    graph: GraphStore;

    constructor() {
        this.coins = new CoinsStore();
        this.coinDetail = new CoinDetailStore();
        this.filters = new FiltersStore();
        this.graph = new GraphStore();
    }
}

const localStores = new LocalStores();
export const localStoresContext = createContext(localStores);

export default localStores;
