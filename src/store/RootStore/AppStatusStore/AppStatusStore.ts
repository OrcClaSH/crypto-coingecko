import { API_ENDPOINTS } from "@/config";
import { action, computed, makeObservable, observable } from "mobx"

type PrivateFields =
    | '_errorText'
    | '_isLimitRate'
    // | '_baseUrl'

export default class AppStatusStore {
    private _baseUrl = API_ENDPOINTS.BASE_URL || API_ENDPOINTS.MOCK_URL;
    // private _baseUrl = API_ENDPOINTS.MOCK_URL;
    private _errorText = '';
    private _isLimitRate = false;

    constructor() {
        makeObservable<AppStatusStore, PrivateFields>(this, {
            // _baseUrl: observable,
            _errorText: observable,
            _isLimitRate: observable,
            errorText: computed,
            isLimitRate: computed,
            // baseUrl: computed,
            setErrorText: action,
            setIsLimitRate: action,
            setBaseUrl: action,
        })
    };

    get errorText() {
        return this._errorText;
    };

    get isLimitRate() {
        return this._isLimitRate;
    }

    get baseUrl() {
        return this._baseUrl
    }

    setErrorText = (error: string) => {
        this._errorText = error
    }

    setIsLimitRate = (status: boolean) => {
        this._isLimitRate = status;
    }

    setBaseUrl = (url: string) => {
        this._baseUrl = url;
    }
};
