import { action, computed, makeObservable, observable, runInAction } from "mobx";

import ApiStore from "../RootStore/ApiStore";
import { formationGraphEndpoint } from "@/utils";
import { ILocalStore } from "@/hooks/useLocalStore";
import { Meta, TimeRangesEnum } from "@/utils/enums";
import { normalizeGraphItem } from "../models/graph";
import { HTTPMethod } from "../RootStore/ApiStore/types";
import { GraphItemModel, GraphItemApi } from "../models/graph";

type PrivateFields =
    | '_meta'
    | '_graphData'
    | '_period'

export default class GraphStore implements ILocalStore {
    private readonly _apiStore = new ApiStore();
    private _graphData = {} as GraphItemModel;
    private _meta = Meta.initial;
    private _period = TimeRangesEnum["1h"];

    constructor() {
        makeObservable<GraphStore, PrivateFields>(this, {
            _meta: observable,
            _graphData: observable,
            _period: observable,
            meta: computed,
            graphData: computed,
            period: computed,
            getGraphData: action,
            setPeriod: action,
        })
    }

    get meta() {
        return this._meta;
    }

    get graphData() {
        return this._graphData;
    }

    get period() {
        return this._period;
    }

    setPeriod = (period: TimeRangesEnum) => {
        this._period = period;
    }

    async getGraphData(id: string, range: TimeRangesEnum = this._period) {
        const response = await this._apiStore.request({
            method: HTTPMethod.GET,
            endpoint: formationGraphEndpoint(id, range)
        })

        runInAction(() => {
            if (!response.success) {
                this._meta = Meta.error;
            }

            try {
                this._graphData = normalizeGraphItem(response.data as GraphItemApi);
                this._meta = Meta.success;
            } catch (e) {
                this._meta = Meta.error;
            }
        })
    }

    destroy(): void {

    }
};
