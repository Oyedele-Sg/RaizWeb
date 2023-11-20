"use client"
import { ContentWrap } from "@/components/budget"
import { ComponentOne, ComponentTwo } from "@/components/budget/create"
import { current } from "@reduxjs/toolkit"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function page() {
  // const [currentStep, setCurrentStep] = useState<number>(0)
  const [currentMonth, setCurrentMonth] = useState<{
    month_number: number
    month_name: string
  }>()

  const Router = useRouter()

  const handleNavigation = () => {
    currentMonth ? setCurrentMonth(undefined) : Router.push("/budget/all")
  }
  return (
    <div className=''>
      <ContentWrap handleNavigation={handleNavigation}>
        {currentMonth ? (
          <ComponentTwo currentMonth={currentMonth} />
        ) : (
          <ComponentOne setCurrentMonth={setCurrentMonth} />
        )}
      </ContentWrap>
    </div>
  )
}
