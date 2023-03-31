import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FC, useEffect, useState } from "react";

import Button from "@/components/Button";

import st from './ErrorPage.module.scss';

interface IErrorPage {
    errorMessage?: string;
}

const ErrorPage: FC<IErrorPage> = ({ errorMessage }) => {
    const [timeLeft, setTimeLeft] = useState(120)
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const handleCLick = () => {
        if (pathname === '/error') {
            navigate('/', {replace: true})
        }
        window.location.reload()
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(prev => prev - 1)
        }, 1000);

        return () => clearTimeout(timer)
    }, [timeLeft])

    useEffect(() => {
        if (timeLeft <= 0) {
            handleCLick()
        }
    }, [timeLeft])

    return (
        <div className={st.error}>
            <h1 className={st.error__title}>Error</h1>
            <p className={st.error__message}>{errorMessage}</p>
            <p className={st.error__text}>
                Free API* has a <span className={st['error__text--red']}>rate limit</span> of 10-30 calls/minute.
            </p>
            <p className={st.error__text}>
                Wait a minute+ and try again.
            </p>
            <Button
                className={st.error__btn}
                onClick={handleCLick}
            >
                &#x2190; Refresh the page
                <span className={st['error__btn-timer']}>{timeLeft}</span>
            </Button>
            <Link
                className={st.error__link}
                to='/'
                replace
            >
                🚪 Back to Home Page
            </Link>
        </div>
    )
};

export default ErrorPage;
