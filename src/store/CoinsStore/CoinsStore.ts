import {
    computed,
    makeObservable,
    observable,
    runInAction,
    action,
} from 'mobx';
import * as qs from 'qs';

import { Meta } from '@/utils/enums';
import { API_ENDPOINTS } from '@/config';
import {
    CoinItemApi,
    CoinItemModel,
    CoinItemSearchModel,
    CoinsItemSearchApi,
    normalizeCoinItem,
    normalizeCoinItemSearch
} from '../models/coin';
import {
    CollectionModel,
    getInitialCollectionModel,
    linearizeCollection,
    normalizeCollection
} from '../models/shared/collection';
import ApiStore from '../RootStore/ApiStore';
import rootStore from '../RootStore/instance';
import { ILocalStore } from '@/hooks/useLocalStore';
import { formationEndpoint, parseParams } from '@/utils';
import { HTTPMethod } from '../RootStore/ApiStore/types';

type PrivateFields =
    | '_coins'
    | '_meta'
    | '_marketStatus'

export default class CoinsStore implements ILocalStore {
    private readonly _apiStore: ApiStore = new ApiStore()
    private _coins: CollectionModel<string, CoinItemModel> = getInitialCollectionModel();
    private _marketStatus: number | null = null;
    private _meta: Meta = Meta.initial;

    constructor() {
        makeObservable<CoinsStore, PrivateFields>(this, {
            _coins: observable.ref,
            _meta: observable,
            _marketStatus: observable,
            coins: computed,
            marketStatus: computed,
            meta: computed,
            getCoinsList: action,
            getFoundCoinsList: action,
            getMarketStatus: action,
            destroy: action,
        })
    };

    get coins(): CoinItemModel[] {
        return linearizeCollection(this._coins);
    };

    get marketStatus(): number | null {
        return this._marketStatus;
    }

    get meta(): Meta {
        return this._meta;
    };

    async getCoinsList(): Promise<void> {
        this._meta = Meta.loading;
        this._coins = getInitialCollectionModel();
        const paramsFromStores = rootStore.query.paramsFromStores;
        const parsedParams = parseParams(paramsFromStores);
        const endpoint = formationEndpoint(parsedParams);

        if (!endpoint) {
            this._meta = Meta.success;
            this._coins = getInitialCollectionModel();
            return;
        };

        const response = await this._apiStore.request<CoinItemApi[] | CoinsItemSearchApi>({
            method: HTTPMethod.GET,
            endpoint: endpoint,
        });

        runInAction(() => {
            if (!response.success) {
                this._meta = Meta.error;
                // console.error(response.status) // TODO error handler;
                return;
            }

            try {
                const coins: CoinItemModel[] = [];
                for (const item of response.data as CoinItemApi[]) {
                    coins.push(normalizeCoinItem(item));
                };

                this._meta = Meta.success;
                this._coins = normalizeCollection(coins, (coinItem) => coinItem.id);
                return;
            } catch (e) {
                // console.error('[ERROR]', e) // TODO remove
                this._meta = Meta.error;
                this._coins = getInitialCollectionModel();
            };
        });
    };

    async getFoundCoinsList(): Promise<void> {
        this._meta = Meta.loading
        const paramsFromStores = rootStore.query.paramsFromStores
        const parsedParams = parseParams(paramsFromStores)

        const response = await this._apiStore.request<CoinsItemSearchApi>({
            method: HTTPMethod.GET,
            endpoint: `${API_ENDPOINTS.SEARCH}?${qs.stringify(parsedParams)}`
        })

        runInAction(() => {
            if (!response.success) {
                this._meta = Meta.error
                console.error(response.status) // TODO error handler
                return
            }

            try {
                const foundCoins: CoinItemSearchModel[] = []
                for (const item of (response.data as CoinsItemSearchApi).coins) {
                    foundCoins.push(normalizeCoinItemSearch(item));
                }
                if (foundCoins.length) {
                    const foundCoinsNormalized = normalizeCollection(foundCoins, (coinItem) => coinItem.id);
                    rootStore.query.setParamsFromStores({ ids: foundCoinsNormalized.order.join(',') });
                } else {
                    this._coins = getInitialCollectionModel();
                }
                this._meta = Meta.success
            } catch (e) {
                // console.error('[ERROR]', e) // TODO remove
                this._meta = Meta.error;
            }
        })
    }

    async getMarketStatus(): Promise<void> {
        const response = await this._apiStore.request<{ data: { market_cap_change_percentage_24h_usd: number } }>({
            method: HTTPMethod.GET,
            endpoint: API_ENDPOINTS.MARKET_STATUS,
        })

        runInAction(() => {
            try {
                if (!(response.data instanceof Error) && response.data.data?.market_cap_change_percentage_24h_usd) {
                    this._marketStatus = response.data.data?.market_cap_change_percentage_24h_usd
                }
            } catch (e) {
                // console.error('[ERROR]', e) // TODO remove
            }
        })
    }

    destroy(): void {
        this._meta = Meta.initial;
        this._coins = getInitialCollectionModel();
    };
};
