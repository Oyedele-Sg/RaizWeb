import { BudgetDataInterface } from "@/shared"
import { getCurrentMonthNumber, getMonthName } from "@/utils/helpers"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React from "react"

interface Props {
  data: BudgetDataInterface
}

export function BudgetCard({ data }: Props) {
  const Router = useRouter()

  const cardColors = [
    ["#DFE6EE", "#D2E1EB"],
    ["#DFEEEA", "#C7E4DD"],
    ["#EEDFE4", "#EBD2D2"],
    ["#E6EEDF", "#DAEBD2"],
    ["#EEE7DF", "#EBE0D2"],
    ["#DFE0EE", "#D2D3EB"],
    ["#DFECEE", "#D2E9EB"],
    ["#E7DFEE", "#DFD2EB"],
    ["#EEDFEA", "#EBD2E5"],
    ["#DFEEEC", "#D2EBE3"],
    ["#DFEEE2", "#D6EBD2"],
    ["#EEDFDF", "#EBD2DA"],
  ]
  console.log("coloer", cardColors[data.budget_month - 1]?.[0])

  return (
    <div
      className={`pt-8   rounded-lg min-w-[246px] `}
      style={{ backgroundColor: cardColors[data.budget_month - 1]?.[0] }}
      onClick={() => Router.push(`budget/${data.budget_id}`)}
    >
      <div className=''>
        <div className='   h-[221px] px-[23px]   '>
          <div className='flex items-center justify-between'>
            <div className='flex flex-col gap-[11px]'>
              <Image
                src={`/budget/${data.budget_month}.svg`}
                width={32}
                height={32}
                alt=''
              />
              <h3 className='  text-purple    '>
                {getMonthName(data.budget_month)}{" "}
              </h3>
            </div>
            {!(getCurrentMonthNumber() === data.budget_month) && (
              <div className=''>
                <Image
                  src={`/icons/add-circle.svg`}
                  width={24}
                  height={24}
                  alt=''
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        className='text-t-18 pl-4 pt-[57px] pr-[50px] h-[180px] rounded-b-lg '
        style={{ backgroundColor: cardColors[data.budget_month - 1]?.[1] }}
      >
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
