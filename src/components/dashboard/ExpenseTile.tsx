"use client"
import { userService } from "@/services"
import {
  BtnMain,
  ExpenseChartDataInterface,
  ExpenseChartInterface,
  IconAddCircle,
  IconMore,
  TimelineSelect,
  WhiteTileWrap,
} from "@/shared"
import Image from "next/image"
import { useContext, useEffect, useState } from "react"
import { toast } from "../ui/use-toast"
import { useRouter } from "next/navigation"
import { useUser } from "@/hooks/user/useUser"
import React, { PureComponent } from "react"
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts"
import { DonutChart } from "@tremor/react"
import { ExpenseTileDummy } from "./ExpenseTileDummy"
import { formatDateToISOString } from "@/utils/helpers"
import { addDays, format } from "date-fns"
import { CurrentUserContext } from "@/providers/CurrentUserProvider"

export const ExpenseTile = () => {
  const Router = useRouter()

  const [chartData, setChartData] = React.useState<ExpenseChartInterface>()

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

  const { currentUser } = useContext(CurrentUserContext)

  const data = async () => {
    if (
      currentUser &&
      !currentUser?.is_bvn_verified &&
      !currentUser?.is_phone_verified
    )
      return
    try {
      const res = await userService.getExpenseChart(
        formatDateToISOString(selectedRange?.from as Date),
        formatDateToISOString(selectedRange?.to as Date)
      )

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

  const COLORS = [
    "bg-[#64748b]",
    "bg-[#8b5cf6]",
    "bg-[#6366f1]",
    "bg-[#f43f5e]",
  ]

  useEffect(() => {
    data()
  }, [selectedRange])

  return (
    <div className='   max-w-[218px] h-full '>
      <WhiteTileWrap extraStyle=' py-[22px]  pb-[31px] px-4  flex flex-col gap-4 h-full  '>
        <div className=' flex justify-between items-center  '>
          <h3 className=' text-neutral-100 font-title__medium   '>
            All Expenses
          </h3>
          <IconMore />
        </div>

        <TimelineSelect
          setSelectedRange={setSelectedRange}
          selectedRange={selectedRange}
        />

        {chartData?.chart_data.length === 0 ? (
          <ExpenseTileDummy />
        ) : (
          <div className='  flex flex-col gap-16  h-full '>
            <DonutChart
              className='mt-6'
              data={chartData?.chart_data as ExpenseChartDataInterface[]}
              category='total_amount'
              index='category_name'
              // valueFormatter={valueFormatter}
              colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
              showTooltip={true}
            />

            <div className=' flex flex-col gap-5 '>
              {chartData?.chart_data.map((item, index) => (
                <div className='  flex items-center justify-between '>
                  <div className=' flex items-center gap-2 '>
                    <div
                      className={` h-[12px] w-[12px] rounded-full ${COLORS[index]}`}
                    >
                      {" "}
                    </div>
                    <div className=' capitalize text-neutral-80 font-body__large  '>
                      {item.category_name}
                    </div>
                  </div>
                  <div className=' gradient-text font-semi-mid      '>
                    ₦
                    {item.total_amount >= 1000
                      ? `${(item.total_amount / 1000).toFixed(1)}K`
                      : item.total_amount}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </WhiteTileWrap>
    </div>
  )
}
