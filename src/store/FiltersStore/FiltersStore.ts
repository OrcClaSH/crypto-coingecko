import {
    makeObservable,
    observable,
    computed,
    action,
    runInAction,
} from 'mobx';

import { API_ENDPOINTS, SORT_TYPES, VS_CURRENCY_DEFAULT } from '@/config';
import ApiStore from '../RootStore/ApiStore';
import {
    CollectionModel,
    getInitialCollectionModel,
    linearizeCollection,
    normalizeCollection
} from '../models/shared/collection';
import {
    ActiveFeaturedCategory,
    CategoryItemApi,
    CategoryItemModel,
    normalizeCategoryItem
} from '../models/filters';
import { ILocalStore } from '@/hooks/useLocalStore';
import { FEATURED_CATEGORIES, Meta } from '@/utils/enums';
import { HTTPMethod } from '../RootStore/ApiStore/types';
import rootStore from '../RootStore';
import { Option } from '@/components/MultiDropdown/MultiDropdown';

type PrivateFields =
    | '_meta'
    | '_page'
    | '_categories'
    | '_currencies'
    | '_searchValue'
    | '_selectedCurrency'
    | '_selectedCategory'
    | '_activeFeaturedCategory'

export default class FiltersStore implements ILocalStore {
    private readonly _apiStore = new ApiStore(API_ENDPOINTS.BASE_URL);

    private _categories: CollectionModel<string, CategoryItemModel> = getInitialCollectionModel();
    private _currencies: string[] = []
    private _meta: Meta = Meta.initial;
    private _selectedCurrency: Option = VS_CURRENCY_DEFAULT;
    private _selectedCategory: Option[] = [];
    private _searchValue: string = '';
    private _activeFeaturedCategory: ActiveFeaturedCategory = FEATURED_CATEGORIES.Default
    private _page: string = ''

    constructor() {
        makeObservable<FiltersStore, PrivateFields>(this, {
            _categories: observable.ref,
            _currencies: observable.ref,
            _meta: observable,
            _selectedCurrency: observable,
            _selectedCategory: observable,
            _searchValue: observable,
            _activeFeaturedCategory: observable,
            _page: observable,
            meta: computed,
            categories: computed,
            currencies: computed,
            selectedCurrency: computed,
            selectedCategory: computed,
            searchValue: computed,
            selectedFeatureCategory: computed,
            page: computed,
            getCategoriesList: action,
            getCurrenciesList: action,
            setSelectedCurrency: action,
            setSelectedCategory: action,
            setSearchValue: action,
            setActiveFeaturedCategory: action,
            setPage: action,
        })
    }

    get categories() {
        return linearizeCollection(this._categories);
    };

    get currencies() {
        return this._currencies;
    }

    get meta() {
        return this._meta;
    }

    get selectedCurrency() {
        return this._selectedCurrency;
    }

    get selectedCategory() {
        return this._selectedCategory;
    }

    get searchValue() {
        return this._searchValue;
    }

    get selectedFeatureCategory() {
        return this._activeFeaturedCategory
    }

    get page() {
        return this._page;
    }

    setSelectedCurrency = (currency: Option): void => {
        runInAction(() => {
            this._selectedCurrency = currency;
            rootStore.query.setParamsFromStores({ vs_currency: currency.key })
        })
    }

    setSelectedCategory = (category: Option, isResetPage = false): void => {
        const categoryInSelected = this._selectedCategory.find(item => item.key === category.key)
        runInAction(() => {
            if (categoryInSelected) {
                this._selectedCategory = this._selectedCategory.filter(item => item.key !== category.key);
            } else {
                this._selectedCategory = [category];
            }
            const params: { category: string, page?: string } =
                { category: this._selectedCategory.map(item => item.key).join(',') }
            if (isResetPage) params.page = '1'
            rootStore.query.setParamsFromStores(params)
        })
    }

    setSearchValue = (value: string): void => {
        this._searchValue = value;
        runInAction(() => {
            rootStore.query.setParamsFromStores({ query: value, page: '1' })
            if (!value) rootStore.query.setParamsFromStores({ ids: '' })
        })
    }

    setActiveFeaturedCategory = (value: FEATURED_CATEGORIES, isResetPage = false): void => {
        const params = isResetPage
            ? { feature: value, order: '', page: '1' }
            : { feature: value, order: '' }
        switch (value) {
            case FEATURED_CATEGORIES.Gainer:
            case FEATURED_CATEGORIES.Loser:
                params.order = SORT_TYPES[value]
                break;
            default:
        }
        runInAction(() => {
            this._activeFeaturedCategory = value;
            rootStore.query.setParamsFromStores(params)
        })
    }

    setPage = (pageNow: string): void => {
        runInAction(() => {
            this._page = pageNow;
            rootStore.query.setParamsFromStores({ page: pageNow })
        })
    }

    async getCategoriesList(): Promise<void> {
        this._meta = Meta.loading;
        this._categories = getInitialCollectionModel();

        const response = await this._apiStore.request<CategoryItemApi[]>({
            method: HTTPMethod.GET,
            data: {},
            headers: {},
            endpoint: API_ENDPOINTS.CATEGORIES,
            params: {},
        });

        runInAction(() => {
            if (!response.status) {
                this._meta = Meta.error;
            }

            try {
                const categories: CategoryItemModel[] = []
                for (const item of response.data as CategoryItemApi[]) {
                    categories.push(normalizeCategoryItem(item))
                }
                this._meta = Meta.success;
                this._categories = normalizeCollection(categories, (item) => item.categoryId)
                return;
            } catch (e) {
                this._meta = Meta.error;
                rootStore.error.setErrorText((e as Error).message)
                this._categories = getInitialCollectionModel();
            }
        })
    };

    async getCurrenciesList(): Promise<void> {
        this._meta = Meta.loading;
        this._currencies = [];

        const response = await this._apiStore.request<string[]>({
            method: HTTPMethod.GET,
            data: {},
            headers: {},
            endpoint: API_ENDPOINTS.CURRENCIES,
            params: {},
        });

        runInAction(() => {
            if (!response.status) {
                this._meta = Meta.error;
            }

            try {
                this._meta = Meta.success;
                this._currencies = response.data as string[];
                return;
            } catch (e) {
                this._meta = Meta.error;
                rootStore.error.setErrorText((e as Error).message)
                this._currencies = [];
            }
        })
    };

    // private readonly _qpReaction: IReactionDisposer = reaction(
    //     () => rootStore.query.getParam(),
    //     (search) => {
    //         console.log('_qpReaction', search);
    //     }
    // );

    destroy() {
        // this._qpReaction();
    };
};
