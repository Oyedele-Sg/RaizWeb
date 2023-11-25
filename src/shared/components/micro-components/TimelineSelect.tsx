"use client"
import React, { useState } from "react"

interface Props {
  selectedRange: { from: Date; to: Date } | undefined
  setSelectedRange: React.Dispatch<
    React.SetStateAction<{ from: Date; to: Date } | undefined>
  >
}

export const TimelineSelect = ({ selectedRange, setSelectedRange }: Props) => {
  const [clicked, setClicked] = useState<number>()

  const handleRangeClick = (range: string, index: number) => {
    const currentDate = new Date()
    let fromDate = new Date()
    let toDate = new Date()

    if (range === "1W") {
      fromDate.setDate(currentDate.getDate() - 6) // 1 week ago
    } else if (range === "1M") {
      fromDate.setMonth(currentDate.getMonth() - 1) // 1 month ago
    } else if (range === "1Y") {
      fromDate.setFullYear(currentDate.getFullYear() - 1) // 1 year ago
    }

    setClicked(index)

    setSelectedRange({ from: fromDate, to: toDate })
  }

  return (
    <div className='flex justify-between'>
      {["1W", "1M", "1Y"].map((item, index) => (
        <div
          key={index}
          className={`flex justify-between items-center py-1 px-4 rounded hover:bg-neutral-20  ${
            clicked == index && "bg-neutral-20"
          } `}
          onClick={() => handleRangeClick(item, index)}
          style={{ cursor: "pointer" }}
        >
          <h4 className='text-purple font-title__medium'>{item}</h4>
        </div>
      ))}
    </div>
  )
}
