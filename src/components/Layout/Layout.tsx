import { FC, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { observer } from "mobx-react-lite";

import rootStore from "@/store/RootStore/instance";
import MockdataInformation from '@/components/MockdataInformation/MockdataInformation';

const Layout: FC = () => {
    const [isMockedData, setIsMockedData] = useState(false)
    const isLimitedRate = rootStore.status.isLimitRate

    useEffect(() => {
        if (isLimitedRate) {
            setIsMockedData(true)
        }

    }, [isLimitedRate])

    return (
        <div className='wrapper'>
            {isMockedData && <MockdataInformation />}
            <Outlet />
        </div>
    );
};

export default observer(Layout);
