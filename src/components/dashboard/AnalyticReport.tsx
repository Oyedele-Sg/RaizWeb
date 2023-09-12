import { TimelineSelect, WhiteTileWrap } from "@/shared"
import { addDays } from "date-fns"
import Image from "next/image"
import React, { useState } from "react"

function AnalyticReport() {
  const [selectedRange, setSelectedRange] = useState<
    { from: Date; to: Date } | undefined
  >(() => {
    const currentDate = new Date()
    const fromDate = new Date()
    fromDate.setDate(currentDate.getDate() - 20)

    return {
      from: fromDate,
      to: addDays(currentDate, 20),
    }
  })

  return (
    <div className=''>
      <WhiteTileWrap extraStyle=' pt-8  pb-[22px] px-[34px] h-full flex flex-col gap-6 '>
        <div className=' flex justify-between items-center  '>
          <h3 className=' text-neutral-100 font-title__medium   '>
            Analytics Report
          </h3>
          <TimelineSelect
            setSelectedRange={setSelectedRange}
            selectedRange={selectedRange}
          />
          {/* <BtnMain
        btnText=' Top-Up '
        btnStyle=' py-2 px-4 bg-purple text-grey rounded-lg font-label__large  '
        onClick={() => Router.push("/add-funds")}
      /> */}
        </div>
        <div className='  relative h-full'>
          <Image
            src='/dummy/chart.svg'
            // width={566.72}
            style={{ objectFit: "contain" }}
            fill={true}
            alt='analytics'
          />
        </div>
      </WhiteTileWrap>
    </div>
  )
}
