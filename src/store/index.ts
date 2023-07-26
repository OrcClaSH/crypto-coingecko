import { createContext } from 'react';

import CoinDetailStore from './CoinDetailStore/CoinDetailStore';
import CoinsStore from './CoinsStore/CoinsStore';
import FiltersStore from './FiltersStore/FiltersStore';
import GraphStore from './GraphStore/GraphStore';

export class LocalStores {
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
