"use client"
import { HomeHeader } from "@/components/ajo"
import { AccountDetailsItems, ContentWrap } from "@/components/settings"
import { CurrentUserContext } from "@/providers/CurrentUserProvider"
import { BackBtnCircle } from "@/shared"
import moment from "moment"
import Image from "next/image"
import React, { useContext } from "react"

function page() {
  const { currentUser } = useContext(CurrentUserContext)
  return (
    <div className=' px-10 min-h-screen '>
      <HomeHeader title='Budget' />

      <div className=' bg-grey rounded-lg  px-6 py-8  flex flex-wrap  gap-y-12 gap-x-[47.5px] min-h-full  bug  '>
        <div className=' py-8  bg-[#DFE6EE] rounded-lg min-w-[246px]  '>
          <div className='  flex flex-col gap-[11px] h-[421px] px-[23px]   '>
            <Image
              src={`/icons/dashboard/budget/jan.svg`}
              width={32}
              height={32}
              alt=''
            />
            <h3 className='  text-purple    '>January </h3>
          </div>

          <div className='text-t-18 pl-4 pr-[50px] '>
            <div className=' flex justify-between '>
              {" "}
              <span className=' text-neutral-90 '> Budget: </span>{" "}
              <span className=' font-bold gradient-text__gold  '>
                {" "}
                ₦150,000
              </span>
            </div>
          </div>
        </div>

        <div className=' min-w-[246px]  py-8 px-[23px]  bg-[#DFE6EE] rounded-lg   '>
          <div className='  flex flex-col gap-[11px] h-[421px]  '>
            <Image
              src={`/icons/dashboard/budget/jan.svg`}
              width={32}
              height={32}
              alt=''
            />
            <h3 className='  text-purple    '>January </h3>
          </div>
        </div>

        <div className=' min-w-[246px] py-8 px-[23px]  bg-[#DFE6EE] rounded-lg   '>
          <div className='  flex flex-col gap-[11px] h-[421px]  '>
            <Image
              src={`/icons/dashboard/budget/jan.svg`}
              width={32}
              height={32}
              alt=''
            />
            <h3 className='  text-purple    '>January </h3>
          </div>
        </div>

        <div className=' min-w-[246px] py-8 px-[23px]  bg-[#DFE6EE] rounded-lg   '>
          <div className='  flex flex-col gap-[11px] h-[421px]  '>
            <Image
              src={`/icons/dashboard/budget/jan.svg`}
              width={32}
              height={32}
              alt=''
            />
            <h3 className='  text-purple    '>January </h3>
          </div>
        </div>

        <div className='  min-w-[246px] py-8 px-[23px]  bg-[#DFE6EE] rounded-lg   '>
          <div className='  flex flex-col gap-[11px] h-[421px]  '>
            <Image
              src={`/icons/dashboard/budget/jan.svg`}
              width={32}
              height={32}
              alt=''
            />
            <h3 className='  text-purple    '>January </h3>
          </div>
        </div>

        <div className=' min-w-[246px] py-8 px-[23px]  bg-[#DFE6EE] rounded-lg   '>
          <div className='  flex flex-col gap-[11px] h-[421px]  '>
            <Image
              src={`/icons/dashboard/budget/jan.svg`}
              width={32}
              height={32}
              alt=''
            />
            <h3 className='  text-purple    '>January </h3>
          </div>
        </div>

        <div className=' min-w-[246px] py-8 px-[23px]  bg-[#DFE6EE] rounded-lg   '>
          <div className='  flex flex-col gap-[11px] h-[421px]  '>
            <Image
              src={`/icons/dashboard/budget/jan.svg`}
              width={32}
              height={32}
              alt=''
            />
            <h3 className='  text-purple    '>January </h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
