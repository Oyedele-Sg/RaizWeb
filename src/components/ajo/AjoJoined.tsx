import React from "react"
import SectionHeader from "./SectionHeader"
import Image from "next/image"
import { BtnMain } from "@/shared"

export function AjoJoined() {
  return (
    <div className='  py-8 px-6  bg-grey  flex  flex-col gap-8'>
      <div className=' flex justify-between items-center '>
        <SectionHeader text='All Ajo joined ' />
        <BtnMain
          btnText='Create Ajo'
          btnStyle=' bg-purple py-3 px-[35.5px]  flex item-center gap-2 text-grey  '
        >
          <Image src={`/icons/add-circle.svg`} width={16} height={16} alt='' />
        </BtnMain>
      </div>
    </div>
  )
}
