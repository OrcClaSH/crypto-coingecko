import { FC } from "react";

import cn from 'classnames';

import st from './Loader.module.scss';

export enum LoaderSize {
    s = 's',
    m = 'm',
    l = 'l'
};

export type LoaderProps = {
    loading?: boolean;
    size?: LoaderSize;
    className?: string;
};

const Loader: FC<LoaderProps> = ({
    loading = true,
    size = LoaderSize.s,
    className
}) => {

    const classLoader = cn(
        className,
        st.loader,
        st[`loader-${size}`],
    );

    if (!loading) {
        return null
    };

    return (
        <img
            className={classLoader}
            src={`./loader-${size}.svg`}
            alt=""
        />
    );
};

export default Loader;
