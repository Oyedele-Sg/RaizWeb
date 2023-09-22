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
      <div className=' grid grid-rows-[30.1875rem_1fr] lg:grid-cols-[1fr_2fr] gap-[24px]  pb-[100px] lg:pb-0  '>
        <div className=' w-full min-w-[300px] px-5 lg:px-0 '>
          <Menucard />
        </div>
        <div className=' hidden lg:grid grid-cols-[1fr_218px] gap-5 h-[30.1875rem] '>
          <div className=' grid grid-rows-[126px_1fr] gap-5   '>
            <IncomeSummary />
            <RecentTransaction />
          </div>
          <div className='  '>
            <ExpenseTile />
          </div>
        </div>

        <div className='  hidden lg:block  '>
          <CardTile />
        </div>
        <div className='  '>
          <div className='hidden lg:block '>
            <AnalyticReport />
          </div>
          <div className=' lg:hidden '>
            <RecentTransaction />
          </div>
        </div>
      </div>
    </>
  )
}

export default page
