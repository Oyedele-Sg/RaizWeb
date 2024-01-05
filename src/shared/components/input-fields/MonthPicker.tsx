import React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { generateMonthArray } from "@/utils/helpers"

interface Props {
  setDay: React.Dispatch<React.SetStateAction<number | null>>
}

export function MonthPicker({ setDay }: Props) {


  return (
    <div className=' flex flex-col gap-4 w-full'>
      <p className=' text-neutral-80   font-label__large '>
        Preffered Day of the Month
      </p>

      <Select
        onValueChange={(value) => {
          const selectedDay = generateMonthArray(31).find(
            (item) => item.day === value
          )
          setDay(selectedDay?.id || null)
        }}
      >
        <SelectTrigger className=' z-100000000 border-t-0 border-l-0 border-r-0 border-b border-b-purple  rounded-none text-neutral-100'>
          <SelectValue
            placeholder='Select Preferred Day'
            className={" border-none "}
          />
        </SelectTrigger>
        <SelectContent className='bg-neutral-20 text-neutral-90 h-[200px] overflow-auto z-10000000000000  '>
          {generateMonthArray(31).map((item, index) => (
            <SelectItem
              key={index}
              value={item.day}
              className='hover:bg-neutral-50'
            >
              {item.day}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}