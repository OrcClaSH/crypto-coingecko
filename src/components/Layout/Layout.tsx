import { FC, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import MockdataInformation from '@/components/MockdataInformation/MockdataInformation';
import rootStore from "@/store/RootStore/instance";

const Layout: FC = () => {
    const [isMockedData, setIsMockedData] = useState(false)

    useEffect(() => {
        if (!rootStore.status.baseUrl.includes('api.coingecko.com')) {
            setIsMockedData(true)
        }

    }, [rootStore.status.baseUrl])

    return (
        <div className='wrapper'>
            {isMockedData && <MockdataInformation />}
            <Outlet />
        </div>
    );
};

export default Layout;
