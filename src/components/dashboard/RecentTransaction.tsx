import { WhiteTileWrap } from "@/shared"
import Image from "next/image"
import Link from "next/link"
import React from "react"

export const RecentTransaction = () => {
  return (
    <WhiteTileWrap extraStyle=' p-8 h-full  flex flex-col gap-[54px] '>
      <div className='  '>
        <h3 className=' text-neutral-100 font-title__medium   '>
          
          Recent Transactions
        </h3>
      </div>

      <div className=' flex flex-col items-center gap-8  '>
        <Image
          src={`/illustrations/recent-dummy.svg`}
          width={154}
          height={138.3}
          alt=''
        />
        <div className=' flex flex-col gap-3 items-center '>
          <h2 className=' gradient-text font-title__large  '>
            
            Opps! No Transaction Recorded
          </h2>
          <p className=' text-neutral-90 font-body__large  flex gap-3 '>
            
            No Transaction has occurred in your account.
            <span className=' text-neutral-70 underline  '>
              <Link href='/dashboard/transfer'> Get started. </Link>
            </span>
          </p>
        </div>
      </div>
    </WhiteTileWrap>
  )
}
