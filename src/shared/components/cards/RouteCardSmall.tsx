"use client"
import { useRouter } from "next/navigation"
import React from "react"
import { BtnMain } from "../buttons"

interface Props {
  type: string
  subText: string
  link: string
}

export function RouteCardSmall({ type, subText, link }: Props) {
  const Router = useRouter()
  return (
    <div className=' flex-1 pt-8 pb-5 px-4  flex flex-col gap-6 lg:gap-0 bg-neutral-30 rounded-r-8 min-h-[220px]'>
      <div className=' flex flex-col gap-2 '>
        <h3 className='  text-purple text-[18px] leading-extra-loose '>
          {type}
        </h3>
        <p className=' text-[14px] text-neutral-70 h-[48px] lg:h-[100px]  '>
          {subText}
        </p>
      </div>

      <div>
        <BtnMain
          btnText='Continue'
          btnStyle='authBtn w-full '
          onClick={() => Router.push(link)}
        />
      </div>
    </div>
  )
}
