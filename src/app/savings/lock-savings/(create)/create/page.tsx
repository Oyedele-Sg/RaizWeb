"use client"

import { ContentWrap } from "@/components/savings/ContentWrap"
import { ComponentForm } from "@/components/savings/lock-savings"

import {
  ComponentOne,
  ComponentPersonal,
} from "@/components/savings/target-saving"
import { current } from "@reduxjs/toolkit"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Page() {
  const Router = useRouter()

  const handlenavigation = () => {
    Router.push("/savings/hub")
  }

  return (
    <div className=''>
      <ContentWrap handleNavigation={handlenavigation}>
        <ComponentForm />
      </ContentWrap>
    </div>
  )
}
