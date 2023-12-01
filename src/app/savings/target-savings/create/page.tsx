"use client"
import { ContentWrap } from "@/components/budget"
import { ComponentOne, ComponentTwo } from "@/components/budget/create"
import { current } from "@reduxjs/toolkit"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function page() {
 
  return (
    <div className=''>
      {/* <ContentWrap handleNavigation={handleNavigation}>
        {currentMonth ? (
          <ComponentTwo currentMonth={currentMonth} />
        ) : (
          <ComponentOne setCurrentMonth={setCurrentMonth} />
        )}
      </ContentWrap> */}
    </div>
  )
}
