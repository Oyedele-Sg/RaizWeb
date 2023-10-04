import { BtnMain } from "@/shared"
import React from "react"

interface Props {
  titleText: string
  titleSpan: string
}

export function OnboardTitleComponent({ titleText, titleSpan }: Props) {
  return (
    <div className=' flex-1  lg:flex items-center hidden    '>
      <div className=' lg:flex flex-col items-start  gap-[4.5rem]   hidden '>
        <h1 className='  font-display__large text-grey   '>
          {" "}
          {titleText + " "} <span className=' text-yellow '>{titleSpan}</span>{" "}
        </h1>
        <BtnMain
          btnText=' Get Started'
          btnStyle=' text-grey px-[3.75rem]  bg-gradient-ajo  font-body__large '
        />
      </div>
    </div>
  )
}
