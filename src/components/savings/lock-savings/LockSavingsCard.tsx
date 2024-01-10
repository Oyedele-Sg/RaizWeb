import Image from "next/image"
import React from "react"
import { Progress } from "@/components/ui/progress"
import {
  GroupTargetSavingsDataInterface,
  LockSavingsDataInterface,
} from "@/shared"
import { dateDifferenceInDays, formatNumberToK } from "@/utils/helpers"
import { useRouter } from "next/navigation"

interface Props {
  data: LockSavingsDataInterface
}

export function LockSavingsCard({ data }: Props) {
  const Router = useRouter()

  return (
    <div
      className=' rounded-2xl  border-[2px] border-neutral-30 min-w-[260px] max-w-[294px] py-5 px-4 flex flex-col gap-5 bg-savings-bg '
      onClick={() =>
        Router.push(`/savings/lock-savings/${data.lock_save_id}/details`)
      }
    >
      {/* <Image src='/images/frame-583.png' width={262} height={128} alt='' />   */}

      <div className=' flex flex-col gap-4 '>
        <h2 className=' font-semibold text-t-20 text-purple text-ellipsis  '>
          {data.lock_save_description}
        </h2>

        <div className=' flex  gap-4 items-start '>
          <div className=' flex flex-col items-center justify-center   '>
            <h3 className=' font-semibold text-t-16 text-purple  '>
              ₦{formatNumberToK(data.lock_save_amount)}
            </h3>
            <p className=' font-semi-mid text-t-16 text-neutral-70  '>Amount</p>
          </div>
          <div className=' flex flex-col items-center justify-center '>
            <h3 className=' font-semibold text-t-16 text-purple  '>
              {data.interest_amount
                ? `₦${formatNumberToK(data.interest_amount)}`
                : 0}
            </h3>
            <p className=' font-semi-mid text-t-16 text-neutral-70 text-center flex flex-col items-center  '>
              Interest Earned
            </p>
          </div>
          <div className=' flex flex-col items-center justify-center   '>
            <h3 className=' font-semibold text-t-16 text-purple  '>
              {data.lock_save_duration}
            </h3>
            <p className='font-semi-mid text-t-16 text-neutral-70 text-center flex flex-col items-center'>
              Days left
            </p>
          </div>
        </div>

        <div className=' flex items-center gap-8 '>
          <Progress
            value={Math.ceil(data.completion_percentage)}
            className=' bg-pesaraise-10 progress '
          />{" "}
          <p className=' text-neutral-80 text-t-14 font-medium   '>
            {Math.ceil(data.completion_percentage)}%
          </p>
        </div>
      </div>
    </div>
  )
}
