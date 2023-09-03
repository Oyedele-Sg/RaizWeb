"use client"

import Image from "next/image"
import React from "react"
import { IconNotification, IconScan, IconSearch } from "../icons"
import { userService } from "@/services"
import { useRouter } from "next/navigation"

export const DashboardHeader = () => {
  const Router = useRouter()
  return (
    <header className=' lg:ml-[144px] py-12 px-5  lg:py-8 lg:px-12 '>
      <div className=' flex items-center justify-between '>
        <h1 className=' font-display__small text-purple font-semi-mid   '>
          Dashboard
        </h1>

        <div className='  hidden  font bg-grey py-3 px-4  rounded-lg lg:flex items-center gap-4  '>
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

          <div
            className=' hidden lg:block '
            onClick={() => {
              userService.logout()
              Router.push(`/login`)
            }}
          >
            <Image
              src='/image/frame.png'
              width={48}
              height={48}
              alt=''
              className=' rounded-full '
            />
          </div>
        </div>
      </div>
    </header>
  )
}
