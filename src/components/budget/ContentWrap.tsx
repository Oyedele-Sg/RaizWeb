"use client"
import { BackArrow, BackBtnCircle, NavigationButtons } from "@/shared"
import { useRouter } from "next/navigation"
import React from "react"

interface Props {
  children: React.ReactNode
  //   title: string
  //   handleNavaigation?: () => void
}

export function ContentWrap({ children }: Props) {
  const Router = useRouter()
  return (
    <div className=' flex flex-col gap-3 '>
      <NavigationButtons />

      <div className=' p-12 rounded-r-8  bg-neutral-20   flex flex-col gap-9 '>
        {children}
      </div>
    </div>
  )
}
