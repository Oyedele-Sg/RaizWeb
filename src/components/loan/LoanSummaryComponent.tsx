import { userService } from "@/services"
import { LoanSummaryDataInterface } from "@/shared"
import React, { useEffect } from "react"
import { toast } from "../ui/use-toast"
import Image from "next/image"
import { useAppSelector } from "@/shared/redux/types"
import { colors } from "@mui/material"

export function LoanSummaryComponent() {
  const [summary, setSummary] = React.useState<LoanSummaryDataInterface>()
  const revealBalance = useAppSelector((state) => state.balanceReveal.state)

  const summaryData = [
    {
      type: "total loans",
      amount: summary?.total_loans,
      icon: "loan",
      color: "text-error",
    },
    {
      type: "total paid",
      amount: summary?.total_loans_repaid,
      icon: "paid",
      color: "text-loan-paid",
    },
    {
      type: "total unpaid",
      amount: summary?.total_loans_unpaid,
      icon: "balance",
      color: "gradient-text__gold",
    },
  ]

  const data = async () => {
    try {
      const res = await userService.getLoanSummary()
      setSummary(res)
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
  }, [])

  return (
    <div className=' flex justify-between gap-[52px]  '>
      {summaryData.map((data, index) => (
        <div
          key={index}
          className=' rounded-r-8  p-6  flex flex-col justify gap-[18px] flex-1 bg-grey '
        >
          <Image
            src={`/icons/dashboard/finance-tile/${data.icon}.svg`}
            width={32}
            height={32}
            alt=''
          />
          <div className=' flex flex-col gap-1 '>
            <h4 className=' capitalize text-neutral-70 text-[18px] '>
              {data.type}
            </h4>

            <h3 className={`  font-semibold text-[20px]  ${data.color}   `}>
              {" "}
              ₦ {data.amount?.toLocaleString() || `0`}
            </h3>
          </div>
        </div>
      ))}
    </div>
  )
}
