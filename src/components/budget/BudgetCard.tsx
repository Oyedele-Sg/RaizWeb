import { BudgetDataInterface } from "@/shared"
import { getMonthName } from "@/utils/helpers"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React from "react"

interface Props {
  data: BudgetDataInterface
}

export function BudgetCard({ data }: Props) {
  const Router = useRouter()

  return (
    <div
      className=' py-8  bg-[#DFE6EE] rounded-lg min-w-[246px]  '
      onClick={() => Router.push(`budget/${data.budget_id}`)}
    >
      <div className='  flex flex-col gap-[11px] h-[421px] px-[23px]   '>
        <Image
          src={`/icons/dashboard/budget/january.svg`}
          width={32}
          height={32}
          alt=''
        />
        <h3 className='  text-purple    '>
          {getMonthName(data.budget_month)}{" "}
        </h3>
      </div>

      <div className='text-t-18 pl-4 pr-[50px] '>
        <div className=' flex justify-between '>
          {" "}
          <span className=' text-neutral-90 '> Budget: </span>{" "}
          <span className=' font-bold gradient-text__gold  '>
            {" "}
            ₦{data.total_budget}
          </span>
        </div>
        <div className=' flex justify-between '>
          {" "}
          <span className=' text-neutral-90 '> Total Spent: </span>{" "}
          <span className=' font-bold gradient-text__gold  '>
            {" "}
            ₦{data.total_spent}
          </span>
        </div>
      </div>
    </div>
  )
}
