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

export const ExpenseTile = () => {
  const Router = useRouter()
  // const [chartData, setChartData] = React.useState<ExpenseChartInterface>()
  // console.log("chart data", chartData)
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

  // const data = async () => {
  //   try {
  //     if (user && !user?.is_bvn_verified && !user?.is_phone_verified) return

  //     const res = await userService.getExpenseChart()

  //     // setChartData(res)
  //   } catch (error) {
  //     toast({
  //       title: "Something Went Wrong",
  //       description: `${error}`,
  //       variant: "destructive",
  //       style: {
  //         backgroundColor: "#f44336",
  //         color: "#fff",
  //         top: "20px",
  //         right: "20px",
  //       },
  //     })
  //   }
  // }

  // const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  // useEffect(() => {
  //   data()
  // }, [])
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
          <TimelineSelect />
          <div className=' mx-auto bug flex items-center justify-center '>
            <Image
              src={`/illustrations/expenses-dummy.svg`}
              width={174}
              height={174}
              alt=''
            />
            {/* <PieChart width={800} height={400}>
              <Pie
                data={chartData}
                cx={120}
                cy={200}
                innerRadius={60}
                outerRadius={80}
                fill='#8884d8'
                paddingAngle={5}
                dataKey='value'
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Pie
                data={chartData}
                cx={420}
                cy={200}
                startAngle={180}
                endAngle={0}
                innerRadius={60}
                outerRadius={80}
                fill='#8884d8'
                paddingAngle={5}
                dataKey='value'
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart> */}
          </div>
          <div className=' flex flex-col items-center gap-3 '>
            <h4 className=' text-[18px] gradient-text font-semi-mid '>
              No Expenses Recorded
            </h4>
            <BtnMain
              btnText=' Top Up '
              btnStyle=' flex items-center  justify-center w-full  gap-2 text-purple font-body__medium  bg-neutral-30 py-3   '
              onClick={() => Router.push("/add-funds")}
            >
              <IconAddCircle />
            </BtnMain>
          </div>
        </div>
      </WhiteTileWrap>
    </div>
  )
}
