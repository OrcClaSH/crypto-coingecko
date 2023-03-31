import { runInAction } from 'mobx';
import { useEffect, useRef } from 'react';

import rootStore from '@/store/RootStore';
import { FEATURED_CATEGORIES } from '@/utils/enums';
import { useStoresContext } from '@/App/pages/Home/Home';
import { Option } from '@/components/MultiDropdown/MultiDropdown';
import { ParamsEnum, ParamsFromStores } from '@/store/RootStore/QueryParamsStore/types';

export const useChangeFromParams = () => {
    const isRendered = useRef(false)
    const params = rootStore.query.getParam() as ParamsFromStores
    const filtersStore = useStoresContext().filters

    useEffect(() => {
        runInAction(() => {
            const paramsFromStores = rootStore.query.paramsFromStores
            if (!isRendered.current) {
                rootStore.query.setParamsFromStores({ ...paramsFromStores, ...params })

                for (const el in params) {
                    switch (el) {
                        case ParamsEnum.VS_CURRENCY:
                            filtersStore.setSelectedCurrency({ key: params[el] } as Option)
                            break;
                        case ParamsEnum.CATEGORY:
                            filtersStore.setSelectedCategory({ key: params[el] } as Option)
                            break;
                        case ParamsEnum.QUERY:
                            filtersStore.setSearchValue(params[el] as string)
                            break;
                        case ParamsEnum.FEATURE:
                            filtersStore.setActiveFeaturedCategory(params[el] as FEATURED_CATEGORIES)
                            break
                        case ParamsEnum.PAGE:
                            filtersStore.setPage(params[el] as string)
                            break
                    }
                }
            }
        })
        isRendered.current = true
    }, [])
};
