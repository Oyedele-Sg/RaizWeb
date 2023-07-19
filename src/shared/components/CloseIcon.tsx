"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React from "react"

export const  CloseIcon = () =>  {
  const Router = useRouter()
  return (
    <div
      className=' w-full flex justify-end '
      onClick={() => Router.push("/dashboard")}
    >
      <Image src='/icons/close-circle.svg' width={40} height={40} alt='close' />
    </div>
  )
}

export default CloseIcon
