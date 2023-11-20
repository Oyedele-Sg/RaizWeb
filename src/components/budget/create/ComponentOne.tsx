import React from "react"
import { BudgetCreateListItem } from "../BudgetCreateListItem"

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

export function ComponentOne({ setCurrentMonth }: Props) {
  return (
    <div className=' flex flex-col gap-9 '>
      <div className=' flex flex-col gap-1 '>
        <h2 className=' font-display__medium text-purple font-semi-mid '>
          {" "}
          Create Budget{" "}
        </h2>
        <p className=' text-neutral-70  font-title__large '>Budget</p>
      </div>

      <BudgetCreateListItem setCurrentMonth={setCurrentMonth} />
    </div>
  )
}
