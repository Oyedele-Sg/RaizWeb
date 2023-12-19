"use client"

import { ContentWrap } from "@/components/savings/ContentWrap"
import {
  ComponentOne,
  ComponentPersonal,
} from "@/components/savings/target-saving"
import { current } from "@reduxjs/toolkit"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function page() {
  const Router = useRouter()
  const [current, setCurrent] = useState<string>()
  const [step, setStep] = useState<number>(1)
  const handleNavigation = () => {
    if (!current) {
      Router.push("/savings/hub")
    }
    if (step === 1) {
      setCurrent(undefined)
    } else {
      setStep(step - 1)
    }
  }

  return (
    <div className=''>
      <ContentWrap  handleNavigation={handleNavigation}>
        {current ? (
          <ComponentPersonal step={step} setStep={setStep} current={current} />
        ) : (
          <ComponentOne setCurrent={setCurrent} />
        )}
      </ContentWrap>
    </div>
  )
}
