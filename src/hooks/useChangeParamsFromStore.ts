import { useEffect } from 'react';

import { runInAction } from 'mobx';
import * as qs from 'qs';

import rootStore from '@/store/RootStore';
import { parseParams } from '@/utils';

export const useChangeParamsFromStore = (): void => {
  const { paramsFromStores } = rootStore.query;

  useEffect(() => {
    runInAction(() => {
      window.history.replaceState(
        null,
        '',
        `?${qs.stringify(parseParams(paramsFromStores))}`,
      );
    });
  }, [
    paramsFromStores.vs_currency,
    paramsFromStores.category,
    paramsFromStores.query,
    paramsFromStores.order,
    paramsFromStores.feature,
    paramsFromStores.page,
    paramsFromStores.per_page,
  ]);
};
