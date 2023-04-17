import { FC } from "react";
import { observer } from "mobx-react-lite";

import { API_ENDPOINTS } from "@/config";
import rootStore from "@/store/RootStore/instance";
import { useStoresContext } from "@/App/pages/Home/Home";

import st from './Pagination.module.scss';

const Pagination: FC = () => {
    const pageNow = rootStore.query.paramsFromStores.page || 1
    const coinsNumber = useStoresContext().coins.coins.length
    const perPage = rootStore.query.paramsFromStores.per_page || API_ENDPOINTS.PER_PAGE

    return (
        <div className={st.pagination}>
            <button
                className={st.pagination__btn}
                onClick={() => rootStore.query.setParamsFromStores({ page: (+pageNow - 1).toString() })}
                disabled={+pageNow < 2}
            >
                &#60;
            </button>
            <span className={st.pagination__page}>{pageNow}</span>
            <button
                className={st.pagination__btn}
                onClick={() => rootStore.query.setParamsFromStores({ page: (+pageNow + 1).toString() })}
                disabled={+perPage > coinsNumber}
            >
                &#62;
            </button>
        </div>
    )
}

export default observer(Pagination);
