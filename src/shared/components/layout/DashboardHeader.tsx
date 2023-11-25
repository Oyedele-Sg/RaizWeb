"use client"

import Image from "next/image"
import React from "react"
import { IconNotification, IconScan, IconSearch } from "../icons"
import { userService } from "@/services"
import { useRouter } from "next/navigation"
import { UtilityIcons } from "../UtilityIcons"

export const DashboardHeader = () => {
  const Router = useRouter()
  return (
    <header className=' lg:ml-[144px] py-12 px-5  lg:py-8 lg:px-12 '>
      <div className=' flex items-center justify-between '>
        <h1 className=' font-display__small text-purple font-semi-mid   '>
          Dashboard
        </h1>

        <UtilityIcons />
      </div>
    </header>
  )
}
