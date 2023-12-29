"use client"

import { LinkItem } from "@/components/savings"
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

  const options = [
    {
      title: "Lock Save",
      description:
        "Secure Solutions and Strategic Approaches for Locking in Savings: Ensuring Financial Safety",
      link: "/savings/lock-savings/create",
    },
    {
      title: "Target Save",
      description:
        "Strategic Approaches and Proven Methods for Achieving Targeted Savings",
      link: "/savings/target-savings/create",
    },
  ]

  const handleNavigation = () => {
    Router.push("/savings/hub")
  }

  return (
    <div className=''>
      <ContentWrap handleNavigation={handleNavigation}>
        <div className=' flex flex-col gap-9 '>
          <div className=''>
            <h1 className='  font-display__medium text-purple capitalize '>
              Create Savings
            </h1>
            <p className=' text-neutral-70 font-title__large '>
              Types of Savings
            </p>
          </div>

          <div className=''>
            <div className=' flex flex-col gap-5  '>
              {options.map((item, index) => (
                <LinkItem
                  data={item}
                  handleLink={() => Router.push(item.link)}
                />
              ))}
            </div>
          </div>
        </div>
      </ContentWrap>
    </div>
  )
}
