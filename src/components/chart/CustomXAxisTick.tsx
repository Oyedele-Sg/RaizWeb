import moment from 'moment';
import React from 'react';
import { Text } from 'recharts';

export const CustomXAxisTick = (props: any) => {
  const { x, y, yearRange, payload } = props;
  const formatMonthYear = (dateString: string) => {
    const [month, year] = dateString.split('-');

    // Map the numeric month to its abbreviated name
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const monthName = monthNames[parseInt(month, 10) - 1];

    // Get the last two digits of the year
    const lastTwoDigitsOfYear = year.slice(-2);

    // Format the result
    return `${monthName} '${lastTwoDigitsOfYear}`;
  };
  const formatXAxisTick = yearRange
    ? (date: string) => formatMonthYear(date)
    : (date: string) => moment(date).format('DD-MMM');

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
