import { CloseIcon } from "@/shared"
import Image from "next/image"

import React from "react"

export default function VerifyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className=' flex items-center  justify-center min-h-screen  '>
      <div className=' w-[771px]  bg-grey rounded-[80px] p-16 my-[50px]  '>
        <CloseIcon />
        <div className=' mt-10 '>{children}</div>
      </div>
    </main>
  )
}
