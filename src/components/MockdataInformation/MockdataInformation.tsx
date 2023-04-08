import { FC } from "react";
import cn from 'classnames';

import Button from "@/components/Button";
import { API_ENDPOINTS } from "@/config";
import rootStore from "@/store/RootStore/instance";

import st from './MockdataInformation.module.scss';

interface IErrorPage {
    errorMessage?: string;
}

const MockdataInformation: FC<IErrorPage> = ({ errorMessage }) => {

    const handleCLick = () => {
        rootStore.status.setBaseUrl(API_ENDPOINTS.BASE_URL)
        window.location.reload()
    }

    return (
        <div className={st.mockinf}>
            <h1 className={st.mockinf__title}>This mocked data</h1>
            <p className={st.mockinf__message}>{errorMessage}</p>
            <p className={st.mockinf__text}>
                Free API* has a <span className={st['mockinf__text--red']}>rate limit</span>.
            </p>
            <p className={cn(st.mockinf__text, st['mockinf__text--blue'])}>
                Wait a minute+ and try again.
            </p>
            <span className={st.mockinf__comment}>
                If you click on the button, then change it to real data (perhaps the limit will still be in effect and will automatically change back to mocked data)
            </span>
            <Button
                className={st.mockinf__btn}
                onClick={handleCLick}
            >
                &#x2190; Refresh the page
            </Button>
        </div>
    )
};

export default MockdataInformation;
