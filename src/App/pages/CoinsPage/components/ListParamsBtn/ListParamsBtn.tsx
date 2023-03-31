import { FC } from "react";
import { observer } from "mobx-react-lite";

import { useStoresContext } from "@/App/pages/Home/Home";

import st from './ListParamsBtn.module.scss';

const ListParamsBtn: FC = () => {
    const filtersStore = useStoresContext().filters
    const category = filtersStore.selectedCategory.map(item => item.key).join(',')
    const query = filtersStore.searchValue

    if (!category && !query) {
        return null
    }

    return (
        <div className={st.params}>
            <div className={st.params__items}>
                {category && <p className={st.params__item}>
                    <span className={st['params__item-title']}>category:</span>
                    {category}
                    <span
                        className={st['params__item--delete']}
                        onClick={() => filtersStore.setSelectedCategory({key: ''})}
                    >
                        x
                    </span>
                </p>}
                {query && <p className={st.params__item}>
                    <span className={st['params__item-title']}>search:</span>
                    {query}
                    <span
                        className={st['params__item--delete']}
                        onClick={() => filtersStore.setSearchValue('')}
                    >
                        x
                    </span>
                </p>}
            </div>
        </div>
    )
}

export default observer(ListParamsBtn);
