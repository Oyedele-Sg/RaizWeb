import { IconMore, WhiteTileWrap } from "@/shared"
import Image from "next/image"
import React from "react"

interface Props {
  data: {
    type: string
    amount: number | undefined
    icon: string
  }
  style: string
}

export const SpendingTile = ({ data, style }: Props) => {
  return (
    <WhiteTileWrap
      extraStyle={`p-3 flex-1 flex items-center max-h-[126px]  ${style} `}
    >
      <div className='  flex gap-4 justify-between w-full '>
        <div className='  flex flex-col justify gap-[18px] '>
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
            <h3 className=' gradient-text__gold font-semibold text-[20px]   '>
              {" "}
              ₦ {data.amount?.toLocaleString()}
            </h3>
          </div>
        </div>
        <IconMore />
      </div>
    </WhiteTileWrap>
  )
}
