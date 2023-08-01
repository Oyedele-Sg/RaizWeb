"use client"
import React, { useEffect } from "react"

import { SpendingTile } from "./SpendingTile"
import { userService } from "@/services"
import { toast } from "../ui/use-toast"
import { IncomeSummarytDataInterface } from "@/shared"

export const IncomeSummary = () => {
  const [summary, setSummary] = React.useState<IncomeSummarytDataInterface>()
  const spendingTrackingData = [
    {
      type: "income",
      amount: summary?.total_income,
      icon: "spending",
    },
    {
      type: "spending",
      amount: summary?.total_expense,
      icon: "income",
    },
    {
      type: "Total Balance",
      amount: summary?.total_balance,
      icon: "limit",
    },
  ]

  const data = async () => {
    try {
      const res = await userService.getIncomeSummary()
      console.log("income", res)
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
    <div className='  flex gap-8  '>
      {spendingTrackingData.map((data, index) => (
        <SpendingTile
          key={index}
          data={data}
          style={index === 2 ? "basis-[150px]" : "basis-[120px]"}
        />
      ))}
    </div>
  )
}

export default IncomeSummary
