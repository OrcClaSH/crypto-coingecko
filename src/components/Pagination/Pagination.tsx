import { FC } from "react";
import { observer } from "mobx-react-lite";

import rootStore from "@/store/RootStore/instance";

import st from './Pagination.module.scss';

const Pagination: FC = () => {
    const pageNow = rootStore.query.paramsFromStores.page || 1

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
            >
                &#62;
            </button>
        </div>
    )
}

export default observer(Pagination);
