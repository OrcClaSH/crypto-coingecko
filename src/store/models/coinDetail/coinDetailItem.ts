export type CoinDetailApi = {
    id: string;
    symbol: string;
    name: string;
    image: {
        large: string,
    };
    description: Record<string, string>;
    hashing_algorithm: string;
    genesis_date: string;
    market_cap_rank: number;
    public_interest_score: number;
    market_data: {
        current_price: Record<string, number>;
        price_change_24h_in_currency: Record<string, number>;
        price_change_percentage_1h_in_currency: Record<string, number>;
        price_change_percentage_24h_in_currency: Record<string, number>;
        price_change_percentage_7d_in_currency: Record<string, number>;
        price_change_percentage_14d_in_currency: Record<string, number>;
        price_change_percentage_30d_in_currency: Record<string, number>;
        price_change_percentage_60d_in_currency: Record<string, number>;
        price_change_percentage_200d_in_currency: Record<string, number>;
        price_change_percentage_1y_in_currency: Record<string, number>;
        sparkline_7d: {
            price: number[];
        };
        last_updated: string;
    };
};

export type CoinDetailModel = {
    id: string;
    symbol: string;
    name: string;
    image: string;
    currentPrice: Record<string, number>;
    description: Record<string, string>;
    hashingAlgorithm: string;
    genesisDate: string;
    marketCapRank: number;
    publicInterestScore: number;
    priceChange_24hInCurrency: Record<string, number>;
    priceChangePercentage_1hInCurrency: Record<string, number>;
    priceChangePercentage_24hInCurrency: Record<string, number>;
    priceChangePercentage_7dInCurrency: Record<string, number>;
    priceChangePercentage_14dInCurrency: Record<string, number>;
    priceChangePercentage_30dInCurrency: Record<string, number>;
    priceChangePercentage_60dInCurrency: Record<string, number>;
    priceChangePercentage_200dInCurrency: Record<string, number>;
    priceChangePercentage_1yInCurrency: Record<string, number>;
    sparkline_7d: number[];
    lastUpdated: string;
};

export const normalizeCoinDetail = (from: CoinDetailApi): CoinDetailModel => ({
    id: from.id,
    symbol: from.symbol,
    name: from.name,
    image: from.image.large,
    currentPrice: from.market_data.current_price,
    description: from.description,
    hashingAlgorithm: from.hashing_algorithm,
    genesisDate: from.genesis_date,
    marketCapRank: from.market_cap_rank,
    publicInterestScore: from.public_interest_score,
    priceChange_24hInCurrency: from.market_data.price_change_24h_in_currency,
    priceChangePercentage_1hInCurrency: from.market_data.price_change_percentage_1h_in_currency,
    priceChangePercentage_24hInCurrency: from.market_data.price_change_percentage_24h_in_currency,
    priceChangePercentage_7dInCurrency: from.market_data.price_change_percentage_7d_in_currency,
    priceChangePercentage_14dInCurrency: from.market_data.price_change_percentage_14d_in_currency,
    priceChangePercentage_30dInCurrency: from.market_data.price_change_percentage_30d_in_currency,
    priceChangePercentage_60dInCurrency: from.market_data.price_change_percentage_60d_in_currency,
    priceChangePercentage_200dInCurrency: from.market_data.price_change_percentage_200d_in_currency,
    priceChangePercentage_1yInCurrency: from.market_data.price_change_percentage_1y_in_currency,
    sparkline_7d: from.market_data.sparkline_7d.price,
    lastUpdated: from.market_data.last_updated,
});
