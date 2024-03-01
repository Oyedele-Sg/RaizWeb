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
      title: "Flex Loans",
      description:
        "Customize Your Repayment Schedule with Our Flexible Loan Options to Suit Your Financial Lifestyle",
      link: "/loan/flex-loan/create",
    },
    // {
    //   title: "PayDay/Business",
    //   description:
    //     "Short-Term Solutions for Immediate Financial Needs in Personal or Business Matters",
    //   link: "/savings/target-savings/create",
    // },
    {
      title: "Term Loans",
      description:
        "Long-Term Financing with Fixed Interest Rates and Predictable Payments",
      link: "/loan/term-loan/create",
    },
  ]

  const handleNavigation = () => {
    Router.push("/loan/hub")
  }

  return (
    <div className=''>
      <ContentWrap handleNavigation={handleNavigation} bg='bg-loan-bg'>
        <div className=' flex flex-col gap-9 '>
          <div className=''>
            <h1 className='  font-display__medium text-purple capitalize '>
              Loan
            </h1>
            <p className=' text-neutral-70 font-title__large '>
              Types of Loans
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
