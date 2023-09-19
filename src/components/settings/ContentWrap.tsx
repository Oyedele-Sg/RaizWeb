import { BackBtnCircle } from "@/shared"
import React from "react"

interface Props {
  children: React.ReactNode
  title: string
}

export function ContentWrap({ children, title }: Props) {
  return (
    <div className=' flex flex-col gap-3 '>
      <div className='flex items-center  '>
        <BackBtnCircle />
        <div className=' w-full '>
          <h1 className=' text-purple text-center text-t-24 font-semi-mid  '>
            {title}
          </h1>
        </div>
      </div>

      <div className=' p-12 rounded-r-8  bg-neutral-20   flex flex-col gap-9 '>
        {children}
      </div>
    </div>
  )
}
