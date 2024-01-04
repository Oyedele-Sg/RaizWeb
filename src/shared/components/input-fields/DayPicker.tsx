import React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Props {
  setDay: React.Dispatch<React.SetStateAction<number | null>>
}

export function DayPicker({ setDay }: Props) {
  const daysOfWeek = [
    { day: "Sunday", id: 0 },
    { day: "Monday", id: 1 },
    { day: "Tuesday", id: 2 },
    { day: "Wednesday", id: 3 },
    { day: "Thursday", id: 4 },
    { day: "Friday", id: 5 },
    { day: "Saturday", id: 6 },
  ]
  return (
    <div className=' flex flex-col gap-4 w-full'>
      <p className=' text-neutral-80   font-label__large '>Preffered Day</p>

      <Select
        onValueChange={(value) => {
          const selectedDay = daysOfWeek.find((item) => item.day === value)
          setDay(selectedDay?.id || null)
        }}
      >
        <SelectTrigger className=' z-100000000 border-t-0 border-l-0 border-r-0 border-b border-b-purple  rounded-none text-neutral-100'>
          <SelectValue
            placeholder='Select Savings Frquency'
            className={" border-none "}
          />
        </SelectTrigger>
        <SelectContent className='bg-neutral-20 text-neutral-90 h-[200px] overflow-auto z-10000000000000  '>
          {daysOfWeek.map((item) => (
            <SelectItem
              key={item.id}
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
