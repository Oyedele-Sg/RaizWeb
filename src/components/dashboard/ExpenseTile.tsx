"use client"
import { userService } from "@/services"
import {
  BtnMain,
  ExpenseChartInterface,
  IconAddCircle,
  IconMore,
  TimelineSelect,
  WhiteTileWrap,
} from "@/shared"
import Image from "next/image"
import { useEffect } from "react"
import { toast } from "../ui/use-toast"
import { useRouter } from "next/navigation"
import { useUser } from "@/hooks/user/useUser"
import React, { PureComponent } from "react"
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts"
import { DonutChart } from "@tremor/react"

export const ExpenseTile = () => {
  const Router = useRouter()
 
  const [date, setDate] = React.useState<Date>()

  const chartData = [
    {
      name: "convenience",
      total_amount: 20002.0,
      value: 40.0,
    },
    {
      name: "invest",
      total_amount: 20002.0,
      value: 25.0,
    },
    {
      name: "invest",
      total_amount: 20002.0,
      value: 15.0,
    },
    {
      name: "Others",
      total_amount: 0.0,
      value: 20.0,
    },
  ]

  const user = useUser()
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]


  return (
    <div className='   h-[30.1875rem] '>
      <WhiteTileWrap extraStyle=' pt-[22px]  pb-[31px] px-4  flex flex-col gap-4 h-full  '>
        <div className=' flex justify-between items-center  '>
          <h3 className=' text-neutral-100 font-title__medium   '>
            All Expenses
          </h3>
          <IconMore />
        </div>
        <div className='  flex flex-col gap-12 '>
        

          <DonutChart
            className='mt-6'
            data={chartData}
            category='value'
            index='name'
           
            colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
          />

          <div>
            {chartData.map((item, index) => (
              <div>
                <div className=''></div>
              </div>
            ))}
          </div>
        </div>
      </WhiteTileWrap>
    </div>
  )
}
