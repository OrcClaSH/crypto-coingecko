import { API_ENDPOINTS, VS_CURRENCY_DEFAULT } from "@/config";
import { ParamsEnum, ParamsFromStores, ParamsFromStoresRaw } from "@/store/RootStore/QueryParamsStore/types";
import { toJS } from "mobx";
import { TimeRangesEnum } from "./enums";
import * as qs from 'qs';
import { FEATURED_CATEGORIES } from "./enums";
import rootStore from "@/store/RootStore/instance";

export const removeKeyValue = (param: ParamsFromStoresRaw): ParamsFromStoresRaw => {
    const result: ParamsFromStoresRaw = { ...param };
    if (result.category) {
        result.category = result.category.map(({ key }) => ({ key }));
    }
    if (result.vs_currency) {
        result.vs_currency = result.vs_currency;
    }
    return result;
};

export const parseParams = (params: ParamsFromStores): ParamsFromStores => {
    const result: ParamsFromStores = { vs_currency: VS_CURRENCY_DEFAULT.key }
    for (const el in params) {
        switch (el) {
            case ParamsEnum.CATEGORY:
                if (params[el]?.length) {
                    result[ParamsEnum.CATEGORY] = params[el]
                }
                break
            case ParamsEnum.VS_CURRENCY:
                result[ParamsEnum.VS_CURRENCY] = params[ParamsEnum.VS_CURRENCY]
                break
            case ParamsEnum.IDS:
            case ParamsEnum.FILTER:
            case ParamsEnum.QUERY:
            case ParamsEnum.PAGE:
            case ParamsEnum.PER_PAGE:
            case ParamsEnum.FEATURE:
            case ParamsEnum.ORDER:
                result[el] = params[el]
                break;
        }
    }

    return result;
};

export const getSecondsInRange = (range: TimeRangesEnum): { start: number, end: number } => {
    const MS_IN_HOUR = 60 * 60 * 1000;
    const MS_IN_DAY = 24 * MS_IN_HOUR;
    const end = Date.now();
    let start = end;

    switch (range) {
        case TimeRangesEnum["1h"]:
            start -= MS_IN_HOUR;
            break;
        case TimeRangesEnum["24h"]:
            start -= MS_IN_DAY;
            break;
        case TimeRangesEnum["7d"]:
            start -= 7 * MS_IN_DAY;
            break;
        case TimeRangesEnum["14d"]:
            start -= 14 * MS_IN_DAY;
            break;
        case TimeRangesEnum["30d"]:
            start -= 30 * MS_IN_DAY;
            break;
        case TimeRangesEnum["60d"]:
            start -= 60 * MS_IN_DAY;
            break;
        case TimeRangesEnum["200d"]:
            start -= 200 * MS_IN_DAY;
            break;
        case TimeRangesEnum["1y"]:
            start -= 365 * MS_IN_DAY;
            break;
        case TimeRangesEnum.all:
            start = 0;
            break;
        default:
            start -= MS_IN_HOUR;
            break;
    }

    return {
        start: Math.floor(start / 1000),
        end: Math.floor(end / 1000),
    };
};

// TODO
export const formationEndpoint = (parsedParams: ParamsFromStores): string => {
    const isFavorites = parsedParams.feature === FEATURED_CATEGORIES.Favorites
    const ids = localStorage.getItem('favorites') ?? ''

    if (isFavorites && !ids) return ''
    if (parsedParams.query && !parsedParams.ids) return ''

    let endpoint = `${API_ENDPOINTS.COINS}?${qs.stringify(parsedParams)}`
        + `&sparkline=true&price_change_percentage=1h%2C24h%2C7d`;
    if (isFavorites) {
        endpoint += `&ids=${ids}`
    }

    return endpoint;
};

export const formationGraphEndpoint = (id: string, range: TimeRangesEnum) => {
    const { start, end } = getSecondsInRange(range)
    const vsCurrency = rootStore.query.paramsFromStores.vs_currency
        ? rootStore.query.paramsFromStores.vs_currency
        : VS_CURRENCY_DEFAULT.key
    const endpoint = `${API_ENDPOINTS.CURRENT_DATA}/${id}/market_chart/range` +
        `?vs_currency=${vsCurrency}&from=${start}&to=${end}`

    return endpoint;
};
