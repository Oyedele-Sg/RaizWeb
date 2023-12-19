import { formatNumberToK } from '@/utils/helpers';
import React from 'react';
import { Text } from 'recharts';

export const CustomYAxisTick = (props: any) => {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <Text
        x={0}
        y={0}
        textAnchor="end"
        fontSize={16}
        fontWeight={500}
        fill="#BFABD3"
        className="custom-axis-tick"
      >
        {`#${formatNumberToK(payload.value)}`}
      </Text>
    </g>
  );
};
