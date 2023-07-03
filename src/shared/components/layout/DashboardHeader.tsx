"use client"

import Image from "next/image"
import React from "react"
import { IconNotification, IconScan, IconSearch } from "../icons"
import { userService } from "@/services"

export const DashboardHeader = () => {
  return (
    <header className=' ml-[144px] py-8 px-12 '>
      <div className=' flex items-center justify-between '>
        <h1 className=' font-display__small text-purple font-semi-mid   '>
          Dashboard
        </h1>

        <div className=' font bg-grey py-3 px-4  rounded-lg flex items-center gap-4 '>
          <IconSearch />
          <input
            type='search'
            name=''
            id=''
            className=' form-input outline-none bg-transparent border-none w-[20.125rem] max-h-[3rem] placeholder:text-neutral-70 placeholder:font-body__large   '
            placeholder='Search for transaction, people, etc.'
          />
        </div>

        <div className=' flex items-center gap-[60px]  '>
          <div className=' flex items-center  gap-[30px]  '>
            <IconScan />
            <IconNotification />
          </div>

          <div className='' onClick={() => userService.logout()}>
            <Image
              src='/image/frame.png'
              width={48}
              height={48}
              alt=''
              className=' rounded-full bug '
            />
          </div>
        </div>
      </div>
    </header>
  )
}
