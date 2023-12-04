"use client"
import {
  BackArrow,
  BackBtnCircle,
  NavigationButtons,
  NextArrow,
} from "@/shared"
import { useRouter } from "next/navigation"
import React from "react"

interface Props {
  children: React.ReactNode
  //   title: string
  handleNavigation?: () => void
}

export function ContentWrap({ children, handleNavigation }: Props) {
  const Router = useRouter()
  return (
    <div className=' flex flex-col gap-3 '>
      <div className='flex items-center gap-3'>
        <button
          title='Go Back'
          className=''
          onClick={() =>
            handleNavigation ? handleNavigation() : Router.back()
          }
        >
          <BackArrow />
        </button>
        <button title='next' className=''>
          <NextArrow />
        </button>
      </div>

      <div className=' p-12 rounded-r-8  bg-savings-bg   flex flex-col gap-9 '>
        {children}
      </div>
    </div>
  )
}
