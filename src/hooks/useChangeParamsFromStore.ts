import { useEffect } from 'react';
import { runInAction, toJS } from 'mobx';
import * as qs from 'qs';

import { parseParams } from '@/utils';
import rootStore from '@/store/RootStore';

export const useChangeParamsFromStore = () => {
    const paramsFromStores = rootStore.query.paramsFromStores

    useEffect(() => {
        runInAction(() => {
            window.history.replaceState(
                null,
                '',
                `?${qs.stringify(parseParams(paramsFromStores))}`)
        })
    }, [
        paramsFromStores.vs_currency,
        paramsFromStores.category,
        paramsFromStores.query,
        paramsFromStores.order,
        paramsFromStores.feature,
        paramsFromStores.page,
        paramsFromStores.per_page,
    ])
};
