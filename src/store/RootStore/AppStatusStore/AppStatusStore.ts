/* eslint-disable no-underscore-dangle */
import { action, computed, makeObservable, observable } from 'mobx';

import { API_ENDPOINTS } from '@/config';

type PrivateFields = '_errorText' | '_isLimitRate';

export default class AppStatusStore {
  private _baseUrl = API_ENDPOINTS.BASE_URL || API_ENDPOINTS.MOCK_URL;

  private _errorText = '';

  private _isLimitRate = false;

  constructor() {
    makeObservable<AppStatusStore, PrivateFields>(this, {
      _errorText: observable,
      _isLimitRate: observable,
      errorText: computed,
      isLimitRate: computed,
      setErrorText: action,
      setIsLimitRate: action,
      setBaseUrl: action,
    });
  }

  get errorText(): string {
    return this._errorText;
  }

  get isLimitRate(): boolean {
    return this._isLimitRate;
  }

  get baseUrl(): string {
    return this._baseUrl;
  }

  setErrorText = (error: string): void => {
    this._errorText = error;
  };

  setIsLimitRate = (status: boolean): void => {
    this._isLimitRate = status;
  };

  setBaseUrl = (url: string): void => {
    this._baseUrl = url;
  };
}
