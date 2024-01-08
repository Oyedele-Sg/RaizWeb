import React from "react"
import { Progress } from "@/components/ui/progress"

interface Props {
  savingsDetails: {
    value: string | number | undefined
    title: string
  }[]
  completion_percentage: number | undefined
}

export function DetailInformationComponent({
  savingsDetails,
  completion_percentage,
}: Props) {
  return (
    <div className='flex flex-col gap-10 '>
      <div className=' flex gap-8 flex-wrap  '>
        {savingsDetails?.map((detail, index) => (
          <div key={index} className=' flex flex-col items-center  gap-2   '>
            <span className=' text-grey font-semibold  '>{detail?.value}</span>
            <span className=' text-grey font-semi-mid '>{detail?.title}</span>
          </div>
        ))}
      </div>
      <div className=' flex items-center gap-8 '>
        <Progress
          value={Math.ceil(completion_percentage as number)}
          className=' bg-pesaraise-10 progress '
        />{" "}
        <p className=' text-neutral-40 text-t-14 font-medium   '>
          {Math.ceil(completion_percentage as number)}%
        </p>
      </div>
    </div>
  )
}
