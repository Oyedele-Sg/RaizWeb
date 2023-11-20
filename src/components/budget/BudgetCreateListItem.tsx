import { getCurrentAndNextMonth } from "@/utils/helpers"
import React from "react"

interface Props {
  setCurrentMonth: React.Dispatch<
    React.SetStateAction<
      | {
          month_number: number
          month_name: string
        }
      | undefined
    >
  >
}

export function BudgetCreateListItem({ setCurrentMonth }: Props) {
  return (
    <div className=' flex flex-col gap-5  '>
      {getCurrentAndNextMonth().map((item, index) => (
        <div
          className=' px-6 py-4  border border-neutral-50 rounded-lg flex flex-col gap-2 w-full hover:bg-neutral-30 cursor-pointer '
          key={index}
          onClick={() => setCurrentMonth(item)}
        >
          <h3 className=' font-title__large text-purple  cursor-pointer '>
            {" "}
            {item.month_name}{" "}
          </h3>
          <p className=' text-neutral-80 font-body__large cursor-pointer '>
            Creating a Budget for {item.month_name}: Allocating Funds Across
            Categories.
          </p>
        </div>
      ))}
    </div>
  )
}
