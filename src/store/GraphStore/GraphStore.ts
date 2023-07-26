/* eslint-disable no-underscore-dangle */
import { action, computed, makeObservable, observable, runInAction } from 'mobx';

import { normalizeGraphItem, GraphItemModel, GraphItemApi } from '../models/graph';
import ApiStore from '../RootStore/ApiStore';
import { HTTPMethod } from '../RootStore/ApiStore/types';

import { ILocalStore } from '@/hooks/useLocalStore';
import { formationGraphEndpoint } from '@/utils';
import { Meta, TimeRangesEnum } from '@/utils/enums';

type PrivateFields = '_meta' | '_graphData' | '_period';

export default class GraphStore implements ILocalStore {
  private readonly _apiStore = new ApiStore();

  private _graphData = {} as GraphItemModel;

  private _meta = Meta.initial;

  private _period = TimeRangesEnum['1h'];

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
    });
  }

  get meta(): Meta {
    return this._meta;
  }

  get graphData(): GraphItemModel {
    return this._graphData;
  }

  get period(): TimeRangesEnum {
    return this._period;
  }

  setPeriod = (period: TimeRangesEnum): void => {
    this._period = period;
  };

  async getGraphData(id: string, range: TimeRangesEnum = this._period): Promise<void> {
    const response = await this._apiStore.request({
      method: HTTPMethod.GET,
      endpoint: formationGraphEndpoint(id, range),
    });

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
    });
  }

  // eslint-disable-next-line class-methods-use-this
  destroy(): void {}
}
