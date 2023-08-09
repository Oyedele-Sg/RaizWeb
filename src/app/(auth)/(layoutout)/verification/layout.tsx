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
      <div className='   '>
        {/* <CloseIcon link='/login' /> */}
        <div className=' mt-10 '>{children}</div>
      </div>
    </main>
  )
}
