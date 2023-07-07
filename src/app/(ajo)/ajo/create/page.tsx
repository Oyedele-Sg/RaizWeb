import { IllustrationComponent, LoginForm } from "@/components"
import { BtnMain, IconPesa, WhiteTileWrap } from "@/shared"
import Image from "next/image"
import React from "react"

export default function Ajo() {
  return (
    <div className=' p-[4.5rem] '>
      <IconPesa />

      <div className=' flex items-center gap-[104px] '>
        <div className=' flex-1 flex flex-col gap-[4.5rem]   '>
          <h1 className='  font-display__large text-grey   '>
            {" "}
            Multiply your Savings with{" "}
            <span className=' text-yellow '>Community Power</span>{" "}
          </h1>

          <BtnMain
            btnText=' Get Started'
            btnStyle=' text-purple px-[3.75rem]  btn-gradient-golden font-body__large '
          />
        </div>
        <div className=' flex-1 h-full   '>
          <WhiteTileWrap extraStyle=' h-[816px] flex items-center justify-center px-[54px]   '>
            <div className=''>
              <Image
                src={`/illustrations/ajoOne.svg`}
                alt=''
                width={577.742} // 577.742
                height={340} // 340
              />
            </div>
          </WhiteTileWrap>
        </div>
      </div>
    </div>
  )
}
