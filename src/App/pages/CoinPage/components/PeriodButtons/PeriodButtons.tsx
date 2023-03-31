import cn from 'classnames';
import { FC } from 'react';
import { TimeRangesEnum } from '@/utils/enums';

import st from './PeriodButtons.module.scss';
import { useStoresContext } from '@/App/pages/Home/Home';
import { observer } from 'mobx-react-lite';
import { PERIOD_COMMENTS } from '@/config';

const PeriodButtons: FC = () => {
    const graphStore = useStoresContext().graph

    return (

        <div className={st.period}>
            {Object.entries(TimeRangesEnum).map(item => (
                <button
                    className={cn(
                        st.period__btn,
                        graphStore.period === item[1]
                            ? st['period__btn--active']
                            : ''
                    )}
                    key={item[0]}
                    onClick={() => graphStore.setPeriod(item[1])}
                    data-hint={PERIOD_COMMENTS[item[1]]}
                >
                    {item[1]}
                </button>
            ))}
        </div>
    )
}

export default observer(PeriodButtons);
