import moment from 'moment';
import React from 'react';
import { Text } from 'recharts';

export const CustomXAxisTick = (props: any) => {
  const { x, y, payload } = props;
  const formatXAxisTick = (date: string) => moment(date).format('DD-MMM');

  return (
    <g transform={`translate(${x},${y})`}>
      <Text
        x={40}
        y={0}
        dy={10}
        textAnchor="end"
        fontSize={16}
        fontWeight={500}
        fill="#BFABD3"
        className="custom-axis-tick"
      >
        {formatXAxisTick(payload.value)}
      </Text>
    </g>
  );
};
