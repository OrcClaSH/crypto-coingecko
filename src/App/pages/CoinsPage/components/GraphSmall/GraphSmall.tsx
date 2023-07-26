import { FC } from 'react';

import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';

interface IGraphSmallProps {
  data?: number[];
  color: string;
}

const GraphSmall: FC<IGraphSmallProps> = ({ data, color }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <YAxis domain={['auto', 'auto']} hide />
        <Line
          type="monotone"
          dataKey={(item) => item}
          stroke={color}
          strokeWidth={1.5}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default GraphSmall;
