export type RoiApi = {
    times: number;
    currency: string;
    percentage: number;
}

export type RoiModel = {
    times: number;
    currency: string;
    percentage: number;
}

export type CoinItemSearchApi = {
    id: string;
    name: string;
    api_symbol: string;
    symbol: string,
    market_cap_rank: number;
    thumb: string;
    large: string;
}

export type CoinsItemSearchApi = {
    coins: CoinItemSearchApi[];
}

export type CoinItemSearchModel = {
    id: string;
    name: string;
    apiSymbol: string;
    symbol: string,
    marketCapRank: number;
    thumb: string;
    large: string;
    image: string;
}

export type CoinItemApi = {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
    fully_diluted_valuation: number;
    total_volume: number;
    high_24h: number;
    low_24h: number
    price_change_24h: number;
    price_change_percentage_24h: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    ath: number;
    ath_change_percentage: number;
    ath_date: string;
    atl: number;
    atl_change_percentage: number;
    atl_date: string;
    roi: null | RoiApi,
    last_updated: string;
    sparkline_in_7d: {
        price: number[]
    };
    price_change_percentage_7d_in_currency: number;
};

export type CoinItemModel = {
    id: string;
    symbol: string;
    name: string;
    image: string;
    currentPrice: number;
    marketCap: number;
    marketCapRank: number;
    fullyDilutedValuation: number;
    totalVolume: number;
    high24h: number;
    low24h: number
    priceChange24h: number;
    priceChangePercentage24h: number;
    marketCapChange24h: number;
    marketCapChangePercentage24h: number;
    circulatingSupply: number;
    totalSupply: number;
    maxSupply: number;
    ath: number;
    athChangePercentage: number;
    ath_date: string;
    atl: number;
    atlChangePercentage: number;
    atlDate: string;
    roi: null | RoiModel,
    lastUpdated: string;
    sparkline: number[];
    priceChangePercentage7d: number;
};

export const normalizeCoinItem = (from: CoinItemApi): CoinItemModel => ({
    id: from.id,
    symbol: from.symbol,
    name: from.name,
    image: from.image,
    currentPrice: from.current_price,
    marketCap: from.market_cap,
    marketCapRank: from.market_cap_rank,
    fullyDilutedValuation: from.fully_diluted_valuation,
    totalVolume: from.total_volume,
    high24h: from.high_24h,
    low24h: from.low_24h,
    priceChange24h: from.price_change_24h,
    priceChangePercentage24h: from.price_change_percentage_24h,
    marketCapChange24h: from.market_cap_change_24h,
    marketCapChangePercentage24h: from.market_cap_change_percentage_24h,
    circulatingSupply: from.circulating_supply,
    totalSupply: from.total_supply,
    maxSupply: from.max_supply,
    ath: from.ath,
    athChangePercentage: from.ath_change_percentage,
    ath_date: from.ath_date,
    atl: from.atl,
    atlChangePercentage: from.atl_change_percentage,
    atlDate: from.atl_date,
    roi: from.roi,
    lastUpdated: from.last_updated,
    sparkline: from.sparkline_in_7d.price,
    priceChangePercentage7d: from.price_change_percentage_7d_in_currency,
});

export const normalizeCoinItemSearch = (from: CoinItemSearchApi): CoinItemSearchModel => ({
    id: from.id,
    name: from.name,
    apiSymbol: from.api_symbol,
    symbol: from.symbol,
    marketCapRank: from.market_cap_rank,
    thumb: from.thumb,
    large: from.large,
    image: from.large,
})
