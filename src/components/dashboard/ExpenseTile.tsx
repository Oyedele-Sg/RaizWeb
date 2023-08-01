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
import React, { useEffect } from "react"
import { toast } from "../ui/use-toast"
import { useRouter } from "next/navigation"

export const ExpenseTile = () => {
  const Router = useRouter()
  const [chartData, setChartData] = React.useState<ExpenseChartInterface>()
  const [date, setDate] = React.useState<Date>()

  const data = async () => {
    try {
      const res = await userService.getExpenseChart()
      console.log("expense", res)
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

  // console.log("transactions", transactions)

  useEffect(() => {
    data()
  }, [])
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
          <div className=' mx-auto '>
            <Image
              src={`/illustrations/expenses-dummy.svg`}
              width={174}
              height={174}
              alt=''
            />
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
