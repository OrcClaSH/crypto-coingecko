import {
    action,
    computed,
    makeObservable,
    observable,
    runInAction,
} from "mobx"

import { Meta } from "@/utils/enums"
import ApiStore from "../RootStore/ApiStore"
import { ILocalStore } from "@/hooks/useLocalStore"
import { HTTPMethod } from "../RootStore/ApiStore/types"
import {
    CoinDetailApi,
    CoinDetailModel,
    normalizeCoinDetail
} from "../models/coinDetail/coinDetailItem"

type PrivateFields = '_coin' | '_meta'

export default class CoinDetailStore implements ILocalStore {
    private readonly _apiStore: ApiStore = new ApiStore()
    private _coin = {} as CoinDetailModel
    private _meta = Meta.initial

    constructor() {
        makeObservable<CoinDetailStore, PrivateFields>(this, {
            _coin: observable.ref,
            _meta: observable,
            coin: computed,
            meta: computed,
            getCoin: action,
        })
    }

    get meta(): Meta {
        return this._meta
    }

    get coin(): CoinDetailModel {
        return this._coin
    }

    async getCoin(id: string) {
        this._meta = Meta.loading

        const response = await this._apiStore.request<CoinDetailApi>({
            method: HTTPMethod.GET,
            endpoint: `/coins/${id}?sparkline=true`,
        })

        runInAction(() => {
            if (!response.success) {
                this._meta = Meta.error
            }

            try {
                this._coin = normalizeCoinDetail(response.data as CoinDetailApi)
                this._meta = Meta.success
            } catch (e) {
                console.log('[ERROR', e) //TODO delete
                this._meta = Meta.error
                this._coin = {} as CoinDetailModel
            }
        })

    }

    destroy(): void {

    }
}