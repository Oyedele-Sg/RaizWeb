"use client"
import { userService } from "@/services"
import { Loading, TransactiontDataInterface, WhiteTileWrap } from "@/shared"
import Image from "next/image"
import Link from "next/link"
import React, { useContext, useEffect, useState } from "react"

import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { formatDateToISOString } from "@/utils/helpers"
import { useUser } from "@/hooks/user/useUser"

import { DateRangePicker, DateRangePickerValue } from "@tremor/react"
import { CurrentUserContext } from "@/providers/CurrentUserProvider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "@/components/ui/use-toast"
import { ContentWrap } from "@/components/settings"
import moment from "moment"

function page() {
  const { currentUser } = useContext(CurrentUserContext)

  const [transactions, setTransactions] =
    React.useState<TransactiontDataInterface[]>()
  const [date, setDate] = React.useState<DateRangePickerValue>(() => {
    const currentDate = new Date()
    const fromDate = new Date()
    fromDate.setDate(currentDate.getDate() - 20)

    return {
      from: fromDate,
      to: addDays(currentDate, 20),
    }
  })
  const data = async () => {
    if (
      currentUser &&
      !currentUser?.is_bvn_verified &&
      !currentUser?.is_phone_verified
    )
      return

    if (!date?.from || !date?.to) return

    try {
      const res = await userService.getRecentTransactions(
        formatDateToISOString(date?.from as Date),
        formatDateToISOString(date?.to as Date)
      )
      setTransactions(res)
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
    const fetchData = async () => {
      try {
        await data()
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
    fetchData()
    const intervalId = setInterval(fetchData, 30000)

    return () => clearInterval(intervalId)
  }, [date])
  return (
    <ContentWrap title='Transactions' transactions>
      <div className=' flex flex-col gap-8  overflow-auto '>
        {transactions?.map((transaction, index) => (
          <div
            key={index}
            className=' flex justify-between items-center gap-2  '
          >
            <div className=' flex items-center gap-2   '>
              <Avatar className=' cursor-default border-neutral-30 border-[2px] w-[40px] h-[40px]  '>
                <AvatarImage src={transaction.third_party_profile_image_url} />
                <AvatarFallback className=' text-purple font-bold  uppercase '>
                  NA
                </AvatarFallback>
              </Avatar>
              <div className=' flex flex-col gap-1  '>
                <h3 className=' text-purple text-[16px] font-semi-mid    '>
                  {transaction.third_party_name}
                </h3>
                <p className=' text-neutral-70 font-title__medium   '>
                  {" "}
                  {moment(transaction.transaction_date_time).format(
                    "DD MMMM YYYY, h:mmA"
                  )}{" "}
                </p>
              </div>
            </div>

            <h2
              className={` ${
                transaction.transaction_type.transaction_type === `debit`
                  ? ` text-neutral-70`
                  : `text-purple`
              }  font-title__large  `}
            >
              {`${
                transaction.transaction_type.transaction_type === `debit`
                  ? `-`
                  : `+`
              } ₦ ${transaction.transaction_amount.toLocaleString()} `}
            </h2>
          </div>
        ))}
      </div>
    </ContentWrap>
  )
}

export default page
