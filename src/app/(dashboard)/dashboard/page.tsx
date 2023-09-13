"use client"

import {
  CardTile,
  ExpenseTile,
  IncomeSummary,
  Menucard,
  RecentTransaction,
  SpendingTile,
} from "@/components"
import { useUser } from "@/hooks/user/useUser"
import { BtnMain, Loading, TimelineSelect, WhiteTileWrap } from "@/shared"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React from "react"

function page() {
  const user = useUser()
  const Router = useRouter()

  return (
    <>
      <div className=' grid grid-rows-[30.1875rem_1fr] lg:grid-cols-[1fr_2fr] gap-[24px]  pb-[100px] lg:pb-0  '>
        <div className=' w-full min-w-[300px] px-5 lg:px-0 '>
          <Menucard />
        </div>
        <div className=' hidden lg:grid grid-cols-[1fr_318px] gap-6 h-[30.1875rem]  '>
          <div className=' grid grid-rows-[1fr_2fr] gap-6   '>
            <IncomeSummary />
            <div className=''>
              <WhiteTileWrap extraStyle=' pt-8  pb-[22px] px-[34px] h-full flex flex-col gap-6 '>
                <div className=' flex justify-between items-center  '>
                  <h3 className=' text-neutral-100 font-title__medium   '>
                    Analytics Report
                  </h3>
                  <TimelineSelect />
                </div>
                <div className='  relative h-full'>
                  <Image
                    src='/dummy/chart.svg'
                   
                    style={{ objectFit: "contain" }}
                    fill={true}
                    alt='analytics'
                  />
                </div>
              </WhiteTileWrap>
            </div>
          </div>
          <div className='  '>
            <ExpenseTile />
          </div>
        </div>

        <div className='  hidden lg:block  '>
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
