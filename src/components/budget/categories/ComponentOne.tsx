import { BudgetDataInterface } from "@/shared"
import { getMonthName } from "@/utils/helpers"
import Image from "next/image"
import React from "react"

interface Props {
  data: BudgetDataInterface | undefined
  setBudgetID: React.Dispatch<
    React.SetStateAction<
      | {
          month_name: string
          budgetID: string
          category_name: string
        }
      | undefined
    >
  >
}

export function ComponentOne({ data, setBudgetID }: Props) {
  
  return (
    <div className=' flex flex-col gap-9 '>
      <div className=' flex flex-col gap-1 '>
        <h2 className=' font-display__medium text-purple font-semi-mid '>
          {getMonthName(data?.budget_month as number)}
        </h2>
        <p className=' text-neutral-70  font-title__large '>Budget Breakdown</p>
      </div>

      <div className='flex flex-col gap-8'>
        {data?.budget_categories.map((item, index) => (
          <div
            className='  flex items-center justify-between   '
            key={index}
            onClick={() =>
              setBudgetID({
                month_name: getMonthName(
                  data?.budget_month as number
                ) as string,
                budgetID: item.budget_category_id as string,
                category_name: item.category
                  ? item.category?.category_name
                  : ("others" as string),
              })
            }
          >
            <div className=' flex items-center gap-4 '>
              <Image
                src={`/icons/break-down/${
                  item.category ? item.category?.category_name : "others"
                }.svg`}
                alt=''
                width={48}
                height={48}
              />
              <div className=' flex flex-col gap-2 '>
                <h2 className=' font-semi-mid text-t-18 capitalize text-purple '>
                  {item.category ? item.category?.category_name : "others"}
                </h2>
                <p className=' text-neutral-90   '>₦{item.budget_amount}</p>
              </div>
            </div>
            <div className=''>
              <Image
                src={`/icons/arrow-right.svg`}
                width={24}
                height={24}
                alt=''
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
