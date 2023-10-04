"use client"

import { ActivityItemWrap, HomeHeader, SubHeaders } from "@/components/ajo"
import React from "react"

export default function Ajo() {
  return (
    <div className='  '>
      <HomeHeader />

      <div className=' flex gap-10 min-h-full bug '>
        <div className=' flex-1 '></div>
        <aside className=' basis-[348px] bg-grey rounded-lg '>
          <div className='flex flex-col gap-[58px] pt-12 px-6 '>
            <h2 className=' font-semibold text-purple text-t-24 '>
              {" "}
              Activities{" "}
            </h2>

            <ActivityItemWrap>
              <SubHeaders text='New' />

              did
            </ActivityItemWrap>
          </div>
        </aside>
      </div>
    </div>
  )
}
