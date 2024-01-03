import Image from "next/image"
import React from "react"
import { Progress } from "@/components/ui/progress"
import { PersonalTargetSavingsDataInterface } from "@/shared"
import { dateDifferenceInDays, formatNumberToK } from "@/utils/helpers"
import { useRouter } from "next/navigation"

interface Props {
  data: PersonalTargetSavingsDataInterface
}

export function PersonalSavingCard({ data }: Props) {
  const Router = useRouter()
  return (
    <div
      className=' rounded-2xl  border-[2px] border-neutral-30 max-w-[294px] py-5 px-4 flex flex-col gap-5 bg-savings-bg '
      onClick={() =>
        Router.push(
          `/savings/my-targets/${data.personal_target_save_id}/details`
        )
      }
    >
      <Image src='/images/frame-583.png' width={262} height={128} alt='' />

      <div className=' flex flex-col gap-4 '>
        <h2 className=' font-semibold text-t-20 text-purple  '>
          {data.target_save.target_save_name}
        </h2>

        <div className=' flex gap-[28px] '>
          {/* <div className=' flex flex-col items-center justify-center '>
            <h3 className=' font-semibold text-t-16 text-purple  '>
              {data.target_save_group_members.length}
            </h3>
            <p className=' font-semi-mid text-t-16 text-neutral-70  '>
              Members
            </p>
          </div> */}
          <div className=' flex flex-col items-center justify-center   '>
            <h3 className=' font-semibold text-t-16 text-purple  '>
              ₦ {formatNumberToK(data.target_save.target_amount)}
            </h3>
            <p className=' font-semi-mid text-t-16 text-neutral-70  '>Amount</p>
          </div>
          <div className=' flex flex-col items-center justify-center   '>
            <h3 className=' font-semibold text-t-16 text-purple  '>
              {dateDifferenceInDays(
                data.target_save.start_date,
                data.target_save.end_date
              )}
            </h3>
            <p className=' font-semi-mid text-t-16 text-neutral-70  '>
              Days left
            </p>
          </div>
        </div>

        <div className=' flex items-center gap-8 '>
          <Progress
            value={data.completion_percentage}
            className=' bg-pesaraise-10 progress '
          />{" "}
          <p className=' text-neutral-80 text-t-14 font-medium   '>
            {data.completion_percentage}%
          </p>
        </div>
      </div>
    </div>
  )
}
