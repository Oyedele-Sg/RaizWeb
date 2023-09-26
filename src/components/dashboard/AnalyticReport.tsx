"use client"
import { CurrentUserContext } from "@/providers/CurrentUserProvider"
import {
  BtnMain,
  DailyAnalysistChartInterface,
  DailyAnalysistDataInterface,
  TimelineSelect,
  WhiteTileWrap,
} from "@/shared"
import { addDays, format } from "date-fns"
import Image from "next/image"
import { useContext, useEffect, useState } from "react"
import { formatDateToISOString } from "@/utils/helpers"
import { userService } from "@/services"
import { toast } from "../ui/use-toast"
// import { Card, Title, BarChart, Subtitle } from "@tremor/react"
import { differenceInDays } from "date-fns"
import React, { PureComponent } from "react"
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import moment from "moment"

export function AnalyticReport() {
  const [selectedRange, setSelectedRange] = useState<
    { from: Date; to: Date } | undefined
  >(() => {
    const currentDate = new Date()
    const fromDate = new Date()
    fromDate.setDate(currentDate.getDate() - 20)

    return {
      from: fromDate,
      to: addDays(currentDate, 20),
    }
  })

  const [chartData, setChartData] =
    React.useState<DailyAnalysistChartInterface>()

  const { currentUser } = useContext(CurrentUserContext)

  const data = async () => {
    try {
      if (
        currentUser &&
        !currentUser?.is_bvn_verified &&
        !currentUser?.is_phone_verified
      )
        return

      const numberOfDays = selectedRange
        ? differenceInDays(selectedRange.to, selectedRange.from)
        : 0

      const res = await userService.getDailyAnalysisReport(numberOfDays)

      setChartData(res)
    } catch (error) {
      toast({
        title: "Something Went Wrong",
        description: `${error}`,
        variant: "destructive",
        style: {
          backgroundColor: "#f44336",
          color: "#fff",
          top: "20px",
          right: "20px",
        },
      })
    }
  }

  const formatXAxisTick = (date: Date) => moment(date).format("DD-MMM")

  useEffect(() => {
    data()
  }, [selectedRange])

  return (
    <div className='h-full'>
      <WhiteTileWrap extraStyle=' pt-8  pb-[22px] px-[34px]  flex flex-col gap-6 h-full '>
        <div className=' flex justify-between items-center  '>
          <h3 className=' text-neutral-100 font-title__medium   '>
            Analytics Report
          </h3>
          <TimelineSelect
            setSelectedRange={setSelectedRange}
            selectedRange={selectedRange}
          />
          {/* <BtnMain
            btnText=' Top-Up '
            btnStyle=' py-2 px-4 bg-purple text-grey rounded-lg font-label__large  '
            // onClick={() => Router.push("/add-funds")}
          /> */}
        </div>

        <div className='h-full'>
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart
              // width={500}
              // height={300}
              data={chartData?.account_analysis}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray='3' />
              <XAxis dataKey='date' tickFormatter={formatXAxisTick} />
              <YAxis stroke='' />
              <Tooltip />
              {/* <Legend /> */}
              <Bar dataKey='credit' fill='#0496FF' barSize={25} />
              <Bar dataKey='debit' fill='#4B0082' barSize={25} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </WhiteTileWrap>
    </div>
  )
}

{
  /* <div className='  relative h-full'>
          <Image
            src='/dummy/chart.svg'
            // width={566.72}
            style={{ objectFit: "contain" }}
            fill={true}
            alt='analytics'
          />
        </div> */
}
