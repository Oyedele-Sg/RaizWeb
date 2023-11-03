"use client"

import { userService } from "@/services"
import { Loading, TransactiontDataInterface, WhiteTileWrap } from "@/shared"
import Image from "next/image"
import Link from "next/link"
import React, { useContext, useEffect, useState } from "react"
import { RecentTransactionDefault } from "../default"
import { toast } from "../ui/use-toast"
import moment from "moment"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { formatDateToISOString } from "@/utils/helpers"
import { useUser } from "@/hooks/user/useUser"

import { DateRangePicker, DateRangePickerValue } from "@tremor/react"
import { CurrentUserContext } from "@/providers/CurrentUserProvider"

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

  const { currentUser } = useContext(CurrentUserContext)

  const currentDate = new Date()

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
      <WhiteTileWrap extraStyle=' p-8 min-h-full  flex flex-col lg:gap-[54px] lg:max-h-[333px] '>
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
                  className=' flex justify-between items-center bug '
                >
                  <div className=' flex flex-col gap-1  '>
                    <h3 className=' text-purple text-[18px] font-semi-mid    '>
                      {transaction.third_party_name}
                    </h3>
                    <p className=' text-neutral-70 font-title__medium '>
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
                    }  font-title__large  mr-4`}
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
                    className=' flex justify-between items-center'
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
                      } ₦ ${transaction.transaction_amount.toLocaleString()} `}
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

// seacrh component to be integrated later
{
  /* <div className='  hidden  font bg-grey py-3 px-4  rounded-lg lg:flex items-center gap-4  '>
          <IconSearch />
          <input
            type='search'
            name=''
            id=''
            className=' form-input outline-none bg-transparent border-none w-[20.125rem] max-h-[3rem] placeholder:text-neutral-70 placeholder:font-body__large   '
            placeholder='Search for transaction, people, etc.'
          />
        </div> */
}
