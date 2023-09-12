"use client"

import { userService } from "@/services"
import { Loading, TransactiontDataInterface, WhiteTileWrap } from "@/shared"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { RecentTransactionDefault } from "../default"
import { toast } from "../ui/use-toast"
import moment from "moment"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { calculateNewDateRange, formatDateToISOString } from "@/utils/helpers"
import { useUser } from "@/hooks/user/useUser"
import { DateRange } from "react-day-picker"
import {
  DateRangePicker,
  DateRangePickerItem,
  DateRangePickerValue,
} from "@tremor/react"

export const RecentTransaction = () => {
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


  const user = useUser()

  const currentDate = new Date()

  const data = async () => {
    if (user && !user?.is_bvn_verified && !user?.is_phone_verified) return

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

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth <= 768
  )
  const [showTransaction, setShowTransaction] = useState(false)

  useEffect(() => {
    // Update the isMobile state when the window is resized
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth <= 768)
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize)
    }

    return () => {
      // Clean up the event listener when the component unmounts
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize)
      }
    }
  }, [])

  useEffect(() => {
    data()
  }, [date])
  return (
    <>
      <Loading />
      <WhiteTileWrap extraStyle=' p-8 h-full  flex flex-col lg:gap-[54px] lg:max-h-[400px] '>
        <div className=' flex items-center justify-between '>
          <h3 className=' text-neutral-100 font-title__medium   '>
            Recent Transactions
          </h3>

          <div className=' hidden lg:block  '>
        

            <DateRangePicker
              className='max-w-md mx-auto bg-transparent'
              value={date}
              onValueChange={setDate}
              selectPlaceholder='Select a range'
              color='rose'
            />
          </div>
          <div
            className=' lg:hidden '
            onClick={() => setShowTransaction(!showTransaction)}
          >
            <Image
              src='/icons/arrow-down-mobile.svg'
              alt='arrow'
              width={20}
              height={20}
              className=' cursor-pointer '
            />
          </div>
        </div>
        {transactions && transactions?.length !== 0 ? (
          <div className=' overflow-auto mt-[24px] lg:mt-0 '>
            <div className=' hidden  lg:flex flex-col gap-8  overflow-auto   '>
              {transactions?.map((transaction, index) => (
                <div
                  key={index}
                  className=' flex justify-between items-center '
                >
                  <div className=' flex flex-col gap-1  '>
                    <h3 className=' text-purple text-[18px] font-semi-mid    '>
                      {transaction.third_party_name}
                    </h3>
                    <p className=' text-neutral-70 font-title__medium   '>
                      {" "}
                      {moment(transaction.transaction_date_time).format(
                        "DD MMMM YYYY, h:mmA"
                      )}{" "}
                    </p>
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
                    } ₦${transaction.transaction_amount.toLocaleString()} `}
                  </h2>
                </div>
              ))}
            </div>
            {showTransaction && (
              <div className='lg:hidden flex flex-col gap-8  overflow-auto '>
                {transactions?.map((transaction, index) => (
                  <div
                    key={index}
                    className=' flex justify-between items-center '
                  >
                    <div className=' flex flex-col gap-1  '>
                      <h3 className=' text-purple text-[18px] font-semi-mid    '>
                        {transaction.third_party_name}
                      </h3>

                      <p className=' text-neutral-70 font-title__medium   '>
                        {" "}
                        {moment(transaction.transaction_date_time).format(
                          "DD MMMM YYYY, h:mmA"
                        )}{" "}
                      </p>
                    </div>

                    <h2
                      className={` ${
                        transaction.transaction_type.transaction_type ===
                        `debit`
                          ? ` text-neutral-70`
                          : `text-purple`
                      }  font-title__large  `}
                    >
                      {`${
                        transaction.transaction_type.transaction_type ===
                        `debit`
                          ? `-`
                          : `+`
                      } ₦${transaction.transaction_amount.toLocaleString()} `}
                    </h2>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className=''>
            <div className=' hidden lg:block '>
              <RecentTransactionDefault />
            </div>
            {showTransaction && (
              <div className='  lg:hidden mt-10 '>
                <RecentTransactionDefault />
              </div>
            )}
          </div>
        )}
      </WhiteTileWrap>
    </>
  )
}

{
  /* <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[175px] justify-center text-center font-normal  bg-transparent border-[1px] border-neutral-40    ",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className='mr-2 h-4 w-4' />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='flex w-auto flex-col space-y-2 p-2'>
              <Select
                onValueChange={(value) =>
                  setDate(addDays(new Date(), parseInt(value)))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select' />
                </SelectTrigger>
                <SelectContent position='popper'>
                  <SelectItem value='0'>Today</SelectItem>
                  <SelectItem value='1'>Tomorrow</SelectItem>
                  <SelectItem value='3'>In 3 days</SelectItem>
                  <SelectItem value='7'>In a week</SelectItem>
                </SelectContent>
              </Select>
              <div className='rounded-md border'>
                <Calendar mode='single' selected={date} onSelect={setDate} />
              </div>
            </PopoverContent>
          </Popover> */
}
