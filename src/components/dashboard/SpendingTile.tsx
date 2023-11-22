"use client"
import { IconMore, WhiteTileWrap } from "@/shared"
import { useAppDispatch, useAppSelector } from "@/shared/redux/types"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

interface Props {
  data: {
    type: string
    amount: number | undefined
    icon: string
  }
  style: string
}

export const SpendingTile = ({ data, style }: Props) => {
  const Router = useRouter()
  const dispatch = useAppDispatch()
  const revealBalance = useAppSelector((state) => state.balanceReveal.state)

  const budgetSelection = [
    {
      title: "Create Budget",
      icon: "create",
      link: "/budget/create",
    },
  // {
  //   title: "Edit Budget",
  //   icon: "edit",
  //   link: "/budget/create",
  // },
    {
      title: "Past Budget",
      icon: "past",
      link: "/budget/all",
    },
  ]

  const [showDrop, setShowDrop] = useState(false)

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
              <h3 className=' gradient-text__gold font-semibold text-[20px]   '>
                {" "}
                ₦ XXX.XX
              </h3>
            )}
          </div>
        </div>
        {data.type === "limit" && (
          <div className='relative '>
            <button className='' onClick={() => setShowDrop(!showDrop)}>
              <IconMore />
            </button>
            {showDrop && (
              <div className=' absolute bg-grey w-[153px] rounded-lg translate-x-1/2 right-[-50%]  '>
                {budgetSelection.map((item, index) => (
                  <div
                    className=' flex items-center  gap-1 py-2 px-4 cursor-pointer hover:bg-neutral-30  '
                    key={index}
                    onClick={() => Router.push(item.link)}
                  >
                    <Image
                      src={`/icons/dashboard/budget-drop/${item.icon}.svg`}
                      width={16}
                      height={16}
                      alt=''
                    />
                    <span className=' text-purple   '>{item.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </WhiteTileWrap>
  )
}
