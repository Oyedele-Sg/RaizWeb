import { CloseIcon } from "@/shared"
import Image from "next/image"

import React from "react"

export default function VerifyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className=' lg:flex lg:items-center  lg:justify-center min-h-screen   '>
      <div className='   '>
        {/* <CloseIcon link='/login' /> */}
        <div className=' lg:mt-10 '>{children}</div>
      </div>
    </main>
  )
}
