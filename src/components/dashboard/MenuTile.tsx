"use client"
import { useUser } from "@/hooks/user/useUser"
import { userService } from "@/services"
import { DashboardMenuComponent, WhiteTileWrap } from "@/shared"
import moment from "moment"
import Image from "next/image"
import React, { useContext, useEffect } from "react"
import { CurrentUserContext } from "@/providers/CurrentUserProvider"
import { useAppDispatch, useAppSelector } from "@/shared/redux/types"
import {
  setRevealBalance,
  initializeRevealBalance,
} from "@/shared/redux/features"

export function Menucard() {
  const dispatch = useAppDispatch()
  const revealBalance = useAppSelector((state) => state.balanceReveal.state)
  const dahsboardMenu = [
    {
      name: "Send",
      icon: "send",
      link: "/send",
    },
    {
      name: "Top-up",
      icon: "add-circle",
      link: "/add-funds",
    },
    {
      name: "Request",
      icon: "money-time",
      link: "/request",
    },
    {
      name: "Ajo",
      icon: "bank",
      link: "/ajo/hub",
    },
    {
      name: "Savings",
      icon: "savings",
      link: "/savings/hub",
    },
    // {
    //   name: "Split Bills",
    //   icon: "arrow-split",
    //   link: "/split-bill",
    // },
    {
      name: "Loan",
      icon: "loan",
      link: "/loan/hub",
    },
  ]

  const { currentUser } = useContext(CurrentUserContext)

  useEffect(() => {
    dispatch(initializeRevealBalance())
  }, [])

  return (
    <WhiteTileWrap extraStyle='  p-8 pb-[35px] flex flex-col gap-12 h-full '>
      <div className=' flex flex-col items-center gap-3  '>
        <div className=' flex justify-center  items-center gap-3  '>
          <Image
            src={`/icons/${revealBalance ? "eye" : "eye-slash"}.svg`}
            width={16}
            height={16}
            alt='reaveal pesa wallet balance'
            onClick={() => dispatch(setRevealBalance())}
          />
          <span className=' font-title__medium    text-purple   '>
            Your Total Balance
          </span>
        </div>
        {revealBalance ? (
          <h3 className=' font-display__medium font-semibold  gradient-text '>
            ₦{currentUser?.wallets[0]?.account_balance.toLocaleString() || `0`}
          </h3>
        ) : (
          <h3 className=' font-display__medium font-semibold  gradient-text '>
            ₦ XXX.XX
          </h3>
        )}
        <div className=' font-label__large text-neutral-70  flex gap-2 items-center   '>
          <span> {moment().format("MMMM DD,YYYY")} </span>
          <div className=' rounded-full w-1 h-1 bg-neutral-70   '></div>
          <span> {moment().format("h:mmA")} </span>
        </div>
      </div>

      <div className=' rounded-lg py-8 px-5  bg-neutral-30  grid grid-cols-3 grid-rows-2 gap-x-5 gap-y-6  '>
        {dahsboardMenu.map((menu, index) => (
          <DashboardMenuComponent menu={menu} key={index} />
        ))}
      </div>
    </WhiteTileWrap>
  )
}
