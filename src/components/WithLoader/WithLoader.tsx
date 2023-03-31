import React, { FC } from "react"

import Loader from "../Loader";

export type WithLoaderProps = React.PropsWithChildren<{ loading: boolean }>;

const WithLoader: FC<WithLoaderProps> = ({ loading, children }) => {
    return (
        <div>
            {loading && <Loader />}
            {children}
        </div>
    )
};

export default WithLoader;
