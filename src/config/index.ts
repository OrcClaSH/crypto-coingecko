export const API_ENDPOINTS = {
  BASE_URL:
    (import.meta.env.VITE_BASE_URL as string) || 'https://api.coingecko.com/api/v3',
  MOCK_URL:
    (import.meta.env.VITE_MOCK_URL as string) ||
    'https://crypto-mock-json-server-1.vercel.app',
  CURRENCIES: '/simple/supported_vs_currencies',
  CATEGORIES: '/coins/categories/list',
  MARKET_STATUS: '/global',
  PER_PAGE: '8',
  SEARCH: '/search',
  COINS: '/coins/markets',
  GAINER: '/search/trending',
  CURRENT_DATA: '/coins',
};

export const COLORS = {
  positive: '#21BF73',
  negative: '#D90429',
};

export const VS_CURRENCY_DEFAULT = { key: 'usd' };

export const PERIOD_COMMENTS = {
  '1 H': 'Period one hour',
  '24 H': 'Period one day',
  '7 D': 'Period week',
  '14 D': 'Period two week',
  '30 D': 'Period month',
  '60 D': 'Period two month',
  '200 D': 'Period two hundred days',
  '1 Y': 'Period one year',
  All: 'Period all',
};

export const SORT_TYPES = {
  Gainer: 'gecko_desc',
  Loser: 'gecko_asc',
};

// ================
// export const SPARKLINE_DAYS = 7

// graph_data = 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1'
// https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7&interval=daily
// https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=2&sparkline=true&price_change_percentage=7d

// https://api.coingecko.com/api/v3/coins/bitcoin?sparkline=true
