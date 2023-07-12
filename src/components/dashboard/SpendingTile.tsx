import { IconMore, WhiteTileWrap } from "@/shared"
import Image from "next/image"
import React from "react"

interface Props {
  data: {
    type: string
    amount: number
    icon: string
  }
  style: string
}

export const SpendingTile = ({ data, style }: Props) => {
  return (
    <WhiteTileWrap extraStyle={`p-3 flex-1  ${style} `}>
      <div className='  flex gap-4  '>
        <div className='  flex flex-col gap-[18px] '>
          <Image
            src={`/icons/dashboard/finance-tile/${data.icon}.svg`}
            width={32}
            height={32}
            alt=''
          />
          <div className=' flex flex-col gap-1 '>
            <h4 className=' capitalize text-neutral-70 text-[18px] '>
              {data.type}
            </h4>
            <h3 className=' gradient-text__gold font-semibold  '>
              {" "}
              ₦ {data.amount}
            </h3>
          </div>
        </div>
        <IconMore />
      </div>
    </WhiteTileWrap>
  )
}
