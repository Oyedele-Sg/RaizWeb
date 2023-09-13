"use client"
import { CurrentUserContext } from "@/providers/CurrentUserProvider"
import {
  DailyAnalysistChartInterface,
  DailyAnalysistDataInterface,
  TimelineSelect,
  WhiteTileWrap,
} from "@/shared"
import { addDays } from "date-fns"
import Image from "next/image"
import React, { useContext, useEffect, useState } from "react"
import { formatDateToISOString } from "@/utils/helpers"
import { userService } from "@/services"
import { toast } from "../ui/use-toast"
import { Card, Title, BarChart, Subtitle } from "@tremor/react"

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

      const res = await userService.getDailyAnalysisReport()

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

  useEffect(() => {
    data()
  }, [selectedRange])

  return (
    <div className=''>
      <WhiteTileWrap extraStyle=' pt-8  pb-[22px] px-[34px] h-full flex flex-col gap-6 '>
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
        onClick={() => Router.push("/add-funds")}
      /> */}
        </div>
        {/* <div className='  relative h-full'>
          <Image
            src='/dummy/chart.svg'
            // width={566.72}
            style={{ objectFit: "contain" }}
            fill={true}
            alt='analytics'
          />
        </div> */}
        {/* <BarChart
          className='mt-6'
          data={chartData?.account_analysis as DailyAnalysistDataInterface[]}
          index='date'
          categories={[
            "Group A",
            "Group B",
            "Group C",
            "Group D",
            "Group E",
            "Group F",
          ]}
          colors={["blue", "teal", "amber", "rose", "indigo", "emerald"]}
          // valueFormatter={dataFormatter}
          yAxisWidth={48}
        /> */}
      </WhiteTileWrap>
    </div>
  )
}
