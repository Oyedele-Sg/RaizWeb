'use client';
import { CurrentUserContext } from '@/providers/CurrentUserProvider';
import {
  DailyAnalysistChartInterface,
  TimelineSelect,
  WhiteTileWrap,
} from '@/shared';
import { useContext, useEffect, useState } from 'react';
import { userService } from '@/services';
import { toast } from '../ui/use-toast';
import { differenceInDays } from 'date-fns';
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import moment from 'moment';
import { CustomXAxisTick, CustomYAxisTick } from '../chart';

export function AnalyticReport() {
  const [selectedRange, setSelectedRange] = useState<
    { from: Date; to: Date } | undefined
  >(() => {
    const currentDate = new Date();
    const fromDate = new Date();
    fromDate.setDate(currentDate.getDate() - 14);

    return {
      from: fromDate,
      to: currentDate,
    };
  });

  const [chartData, setChartData] =
    React.useState<DailyAnalysistChartInterface>();

  const { currentUser } = useContext(CurrentUserContext);

  const data = async () => {
    try {
      const currentDate = new Date();
      if (
        currentUser &&
        !currentUser?.is_bvn_verified &&
        !currentUser?.is_phone_verified
      )
        return;

      const numberOfDays = selectedRange
        ? differenceInDays(selectedRange.to, selectedRange.from)
        : 0;

      let res = await userService.getDailyAnalysisReport(numberOfDays);
      setChartData(res);
    } catch (error) {
      toast({
        title: 'Something Went Wrong',
        description: `${error}`,
        variant: 'destructive',
        style: {
          backgroundColor: '#f44336',
          color: '#fff',
          top: '20px',
          right: '20px',
        },
      });
    }
  };

  const formatXAxisTick = (date: string) => moment(date).format('DD-MMM');

  useEffect(() => {
    data();
  }, [selectedRange]);

  return (
    <div className="h-full">
      <WhiteTileWrap extraStyle=" pt-8  pb-[22px] px-[34px]  flex flex-col gap-6 h-full ">
        <div className=" flex justify-between items-center  ">
          <h3 className=" text-neutral-100 font-title__medium   ">
            Analytics Report
          </h3>
          <TimelineSelect
            setSelectedRange={setSelectedRange}
            selectedRange={selectedRange}
          />
        </div>

        <div className="h-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData?.account_analysis}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3" />
              <XAxis
                stroke="#BFABD3"
                dataKey="date"
                tick={
                  <CustomXAxisTick
                    yearRange={chartData?.account_analysis.length === 12}
                  />
                }
              />
              <YAxis stroke="#BFABD3" tick={<CustomYAxisTick />} />
              <Tooltip />
              {/* <Legend /> */}
              <Bar
                dataKey="credit"
                fill="#0496FF"
                barSize={25}
                radius={[10, 10, 10, 10]}
              />
              <Bar
                dataKey="debit"
                fill="#4B0082"
                barSize={25}
                radius={[10, 10, 10, 10]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </WhiteTileWrap>
    </div>
  );
}
