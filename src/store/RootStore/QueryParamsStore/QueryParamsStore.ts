import { API_ENDPOINTS, VS_CURRENCY_DEFAULT } from '@/config';
import { action, computed, makeObservable, observable, remove, toJS } from 'mobx';
import * as qs from 'qs';
import { ParamsFromStores } from './types';

type PrivateFields =
    | '_params'
    | '_paramsFromStores';

export default class QueryParamsStore {
    private _params: qs.ParsedQs = {};
    private _queryString: string = '';
    private _paramsFromStores: ParamsFromStores = {
        vs_currency: VS_CURRENCY_DEFAULT.key,
        per_page: API_ENDPOINTS.PER_PAGE,
        page: '1',
    };

    constructor() {
        makeObservable<QueryParamsStore, PrivateFields>(this, {
            _params: observable.ref,
            _paramsFromStores: observable,
            paramsFromStores: computed,
            setSearch: action,
            setParamsFromStores: action,
        });
    }

    get paramsFromStores() {
        return this._paramsFromStores;
    }

    getParam(
        key: string = ''
    ): undefined | string | string[] | qs.ParsedQs | qs.ParsedQs[] {
        if (key) {
            return this._params[key];
        }
        return this._params;
    }

    setSearch(queryString: string): void {
        queryString = queryString.startsWith('?') ? queryString.slice(1) : queryString;

        if (this._queryString !== queryString) {
            this._queryString = queryString;
            this._params = qs.parse(queryString);
        }
    }

    setParamsFromStores = (param: ParamsFromStores) => {
        this._paramsFromStores = { ...this._paramsFromStores, ...param }
        Object.keys(this._paramsFromStores).forEach((key) => {
            if (!this._paramsFromStores[key]) {
                remove(this._paramsFromStores, key);
            }
        });
    }
};
