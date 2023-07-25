"use client"

import {
  CardTile,
  ExpenseTile,
  Menucard,
  RecentTransaction,
  SpendingTile,
} from "@/components"
import { useUser } from "@/hooks/user/useUser"
import {
  BtnMain,
  TimelineSelect,
  WhiteTileWrap,
} from "@/shared"
import React from "react"

function page() {
  const spendingTrackingData = [
    {
      type: "income",
      amount: 10000,
      icon: "income",
    },
    {
      type: "spending",
      amount: 10000,
      icon: "spending",
    },
    {
      type: "spending limit",
      amount: 10000,
      icon: "limit",
    },
  ]

  const user = useUser()

  console.log("user", user)

  return (
    <>
      <div className=' grid grid-rows-[30.1875rem_1fr] grid-cols-[1fr_2.5fr] gap-[24px] '>
        <div className=' w-full min-w-[300px]  '>
          <Menucard />
        </div>
        <div className='  grid grid-cols-[1fr_218px] gap-6 h-[30.1875rem]   '>
          <div className=' grid grid-rows-[1fr_2fr] gap-6   '>
            <div className='  flex gap-8  '>
              {spendingTrackingData.map((data, index) => (
                <SpendingTile
                  key={index}
                  data={data}
                  style={index === 2 ? "basis-[150px]" : "basis-[120px]"}
                />
              ))}
            </div>
            <div className=''>
              <WhiteTileWrap extraStyle=' pt-8  pb-[22px] px-[34px] h-full flex flex-col gap-6  '>
                <div className=' flex justify-between items-center  '>
                  <h3 className=' text-neutral-100 font-title__medium   '>
                    Analytics Report
                  </h3>
                  <TimelineSelect />
                  <BtnMain
                    btnText=' Top-Up '
                    btnStyle=' py-2 px-4 bg-purple text-grey rounded-lg font-label__large  '
                  />
                </div>
              </WhiteTileWrap>
            </div>
          </div>
          <div className='  '>
            <ExpenseTile />
          </div>
        </div>

        <div className='  '>
          <CardTile />
        </div>
        <div className='  '>
          <RecentTransaction />
        </div>
      </div>
    </>
  )
}

export default page
