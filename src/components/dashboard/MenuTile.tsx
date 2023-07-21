"use client"
import { useUser } from "@/hooks/user/useUser"
import { userService } from "@/services"
import { DashboardMenuComponent, WhiteTileWrap } from "@/shared"
import moment from "moment"
import Image from "next/image"
import React, { useEffect } from "react"

export function Menucard() {
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
      link: "/send",
    },
    {
      name: "Ajo",
      icon: "bank",
      link: "/send",
    },
    {
      name: "Split Bills",
      icon: "arrow-split",
      link: "/send",
    },
    {
      name: "More",
      icon: "arrow-split",
      link: "/send",
    },
  ]

  const getUserData = async () => {
    const response = await userService.getCurrentUser()
    console.log("response", response)
  }
  const user = useUser()
  console.log("user", user)

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <WhiteTileWrap extraStyle='  p-8 pb-[35px] flex flex-col gap-12 h-[30.1875rem] '>
      <div className=' flex flex-col items-center gap-3  '>
        <div className=' flex justify-center  items-center gap-3   '>
          <Image
            src='/icons/eye.svg'
            width={16}
            height={16}
            alt='reaveal pesa wallet balance'
          />
          <span className=' font-title__medium    text-purple   '>
            Your Total Balance
          </span>
        </div>
        <h3 className=' font-display__medium font-semibold  gradient-text '>
          ₦{user?.wallets[0]?.account_balance?.toLocaleString() || `0`}
        </h3>
        <div className=' font-label__large text-neutral-70  flex gap-2 items-center   '>
          <span> {moment().format("MMMM DD,YYYY")} </span>
          <div className=' rounded-full w-1 h-1 bg-neutral-70   '></div>
          <span> {moment().format("h:mmA")} </span>
        </div>
      </div>

      <div className=' rounded-lg py-8 px-5  bg-neutral-30  grid grid-cols-3 grid-rows-2 gap-5  '>
        {dahsboardMenu.map((menu, index) => (
          <DashboardMenuComponent menu={menu} key={index} />
        ))}
      </div>
    </WhiteTileWrap>
  )
}
