import { UtilityIcons } from "@/shared"
import React from "react"

export function HomeHeader() {
  return (
    <header className='  py-12   lg:py-8  '>
      <div className=' flex items-center justify-between '>
        <h1 className=' font-display__small text-purple font-semi-mid   '>
          Cycle Hub
        </h1>

        <UtilityIcons ajo />
      </div>
    </header>
  )
}
