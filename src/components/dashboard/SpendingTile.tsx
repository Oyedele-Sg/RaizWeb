import { IconMore, WhiteTileWrap } from "@/shared"
import { useAppDispatch, useAppSelector } from "@/shared/redux/types"
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
  const dispatch = useAppDispatch()
  const revealBalance = useAppSelector((state) => state.balanceReveal.state)
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
            {revealBalance ? (
              <h3 className=' gradient-text__gold font-semibold text-[20px]   '>
                {" "}
                ₦ {data.amount?.toLocaleString() || `0`}
              </h3>
            ) : (
              <Image
                src={`/patterns/dashboard-reveal-small.svg`}
                width={89}
                height={23}
                alt=''
              />
            )}
          </div>
        </div>
        <IconMore />
      </div>
    </WhiteTileWrap>
  )
}
