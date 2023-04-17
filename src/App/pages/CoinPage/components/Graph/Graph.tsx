import { toJS } from 'mobx';
import { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import {
    AreaChart,
    Area,
    ResponsiveContainer,
    YAxis,
    XAxis,
    Tooltip,
    CartesianGrid
} from 'recharts';

import { Meta } from '@/utils/enums';
import { useStoresContext } from '@/App/pages/Home/Home';

interface IGraphProps {
    id: string | undefined;
}

const Graph: FC<IGraphProps> = ({ id }) => {
    const graphStore = useStoresContext().graph

    useEffect(() => {
        if (id) {
            graphStore.getGraphData(id)
        }
    }, [id, graphStore.period])

    if (graphStore.meta !== Meta.success) {
        return null
    }

    const data = toJS(graphStore.graphData.prices).map((item: number[]) => ({
        time: new Date(item[0]).toLocaleString([], {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        }),
        price: item[1],
    }));

    return (
        <ResponsiveContainer width="100%" height="100%" >
            <AreaChart
                data={data}
                margin={{ top: 0, right: 0, bottom: 5, left: -15 }}
            >
                <XAxis
                    dataKey='time'
                    fontSize={10}
                    tickCount={data.length}
                    angle={-15}
                    textAnchor="end"
                />
                <YAxis
                    domain={['auto', 'auto']}
                    fontSize={8}
                    tickCount={data.length}
                />
                <Area
                    type="monotone"
                    dataKey='price'
                    stroke='#0063F5'
                    strokeWidth={1.5}
                    dot={false}
                    isAnimationActive={true}
                />
                <Tooltip />
                <CartesianGrid strokeDasharray='3 3' />
            </AreaChart>
        </ResponsiveContainer>
    )
}

export default observer(Graph);
