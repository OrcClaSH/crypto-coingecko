import { action, computed, makeObservable, observable } from "mobx"

type PrivateFields = '_errorText'

export default class ErrorStore {
    private _errorText = '';

    constructor() {
        makeObservable<ErrorStore, PrivateFields>(this, {
            _errorText: observable,
            errorText: computed,
            setErrorText: action,
        })
    };

    get errorText() {
        return this._errorText;
    };

    setErrorText = (error: string) => {
        this._errorText = error
    }
};
