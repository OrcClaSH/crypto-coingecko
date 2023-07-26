export type GraphItemApi = {
  prices: number[][];
  market_caps: number[][];
  total_volumes: number[][];
};

export type GraphItemModel = {
  prices: number[][];
  marketCaps: number[][];
  totalVolumes: number[][];
};

export const normalizeGraphItem = (from: GraphItemApi): GraphItemModel => ({
  prices: from.prices,
  marketCaps: from.market_caps,
  totalVolumes: from.total_volumes,
});
