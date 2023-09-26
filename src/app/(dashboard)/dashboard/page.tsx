"use client"

import {
  AnalyticReport,
  CardTile,
  ExpenseTile,
  IncomeSummary,
  Menucard,
  RecentTransaction,
  SpendingTile,
} from "@/components"
import { useUser } from "@/hooks/user/useUser"
import { CurrentUserContext } from "@/providers/CurrentUserProvider"

import { BtnMain, Loading, TimelineSelect, WhiteTileWrap } from "@/shared"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { useContext } from "react"

function page() {
  // const user = useUser()
  const Router = useRouter()

  return (
    <>
      <div className=' flex gap-6 pb-[100px] lg:pb-0 '>
        <div className=' flex flex-col gap-6 w-full lg:basis-[396px] '>
          <Menucard />
          <div className=' lg:hidden '>
            <RecentTransaction />
          </div>
          <CardTile />
        </div>
        <div className=' flex-1 lg:flex flex-col gap-6 justify-around hidden '>
          <div className=' hidden lg:flex gap-6 min-h-[30.1875rem] '>
            <div className=' flex-1 flex flex-col   gap-5   '>
              <div className=' basis-[126px] '>
                <IncomeSummary />
              </div>
              <div className=' h-full  '>
                <AnalyticReport />
              </div>
            </div>
            <div className=' basis-[218px] '>
              <ExpenseTile />
            </div>
          </div>

          <div className='hidden lg:block  h-full '>
            <RecentTransaction />
          </div>
        </div>
      </div>
    </>
  )
}

export default page
