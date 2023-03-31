import { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import MultiDropdown from '@/components/MultiDropdown';
import { useStoresContext } from '@/App/pages/Home/Home';
import { Option } from '@/components/MultiDropdown/MultiDropdown';

import st from './CoinsDropdown.module.scss';

interface ICoinsDropdownProps {
    searchActive: boolean;
};

const CoinsDropdown: FC<ICoinsDropdownProps> = ({ searchActive }) => {
    const FiltersStore = useStoresContext().filters
    const isDisabled = Boolean(FiltersStore.searchValue) && searchActive

    useEffect(() => {
        FiltersStore.getCategoriesList();
    }, []);

    useEffect(() => {
        FiltersStore.getCurrenciesList();
    }, []);

    const handleSelected = (el: Option) => {
        if (searchActive) {
            FiltersStore.setSelectedCategory(el, true)
        } else {
            FiltersStore.setSelectedCurrency(el)
        }
    };

    const handlerOptions = () => {
        const options = searchActive
            ? FiltersStore.categories.map(item => ({
                key: item.categoryId,
                value: item.name
            }))
            : FiltersStore.currencies.map(item => ({
                key: item,
                value: `Market - ${item.toUpperCase()}`
            }));

        const value = searchActive
            ? FiltersStore.selectedCategory
            : [FiltersStore.selectedCurrency]

        const onChange = handleSelected;

        const pluralizeOptions = searchActive
            ? (values: Option[]) => !values[0]?.key
                ? 'Choose category'
                : `Selected: ${values.map(item => item.key).join(', ')}`
            : (values: Option[]) => values.length === 0
                ? 'Choose currency'
                : `Market - ${values.map(item => item.key).join(', ').toLocaleUpperCase()}`;

        return { options, value, onChange, pluralizeOptions, isSmall: !searchActive };
    };

    return (
        <div className={st['coins-dropdown']}>
            <h1 className={st['coins-dropdown__title']}>Coins</h1>
            <MultiDropdown {...handlerOptions()} disabled={isDisabled} />
        </div>
    );
};

export default observer(CoinsDropdown);
