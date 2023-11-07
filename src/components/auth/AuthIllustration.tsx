"use client"

import { Logo } from "@/shared"
import Image from "next/image"
import React from "react"

interface Props {
  illustrationName: string
  width: number
  height: number
}

const AuthIllustration: React.FC<Props> = ({
  illustrationName,
  width,
  height,
}) => {
  return (
    <div className=' flex flex-col items-center   gap-[144px] mx-[70px] h-full  '>
      <div className=' self-start '>
        <Logo />
      </div>
      <div className=' flex flex-col  gap-12 items-center '>
        <Image
          src={`/illustrations/${illustrationName}.svg`}
          width={width}
          height={height}
          alt=''
        />
        <div className=' px-10 '>
          <p className=' font-title__large  text-neutral-20 text-center '>
            <span className='text-yellow '>Bridging the financial divide:</span>{" "}
            empowering Nigerians with more financial options
          </p>
        </div>
      </div>
    </div>
  )
}

export default AuthIllustration
