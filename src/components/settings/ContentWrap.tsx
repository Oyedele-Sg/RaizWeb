"use client"
import { BackArrow, BackBtnCircle } from "@/shared"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React from "react"

interface Props {
  children: React.ReactNode
  title: string
  handleNavaigation?: () => void
  transactions?: boolean
}

export function ContentWrap({
  children,
  title,
  handleNavaigation,
  transactions,
}: Props) {
  const Router = useRouter()
  return (
    <div className=' flex flex-col gap-3 '>
      <div className='flex items-center  '>
        <button
          title='back'
          className=''
          onClick={() =>
            handleNavaigation ? handleNavaigation() : Router.push(`/settings`)
          }
        >
          <BackArrow />
        </button>
        <div className=' w-full '>
          <h1 className=' text-purple text-center text-t-24 font-semi-mid  '>
            {title}
          </h1>
        </div>

        {transactions && (
          <div onClick={() => Router.push(`/transactions/statement`)}>
            <Image
              src={`/icons/document-download.svg`}
              width={24}
              height={24}
              alt=''
            />
          </div>
        )}
      </div>

      <div className=' p-12 rounded-r-8  bg-neutral-20   flex flex-col gap-9 '>
        {children}
      </div>
    </div>
  )
}
