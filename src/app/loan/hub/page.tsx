"use client"
import { HomeHeader } from "@/components/ajo"
import { userService } from "@/services"
import { Loading } from "@/shared"
import React, { useEffect } from "react"
import { useRouter } from "next/navigation"

import Image from "next/image"
import { LoanHubComponent, LoanSummaryComponent } from "@/components/loan"

export default function Savings() {
  const Router = useRouter()
  useEffect(() => {
    const getUser = async () => {
      const response = await userService.getCurrentUser()
      if (
        !response.onboarding_checklist?.savings ||
        !response.onboarding_checklist.savings === null
      ) {
        Router.push("/savings/onboard")
      }
    }

    getUser()
  }, [])

  return (
    <>
      <Loading />
      <div className=' relative  '>
        <div className='  '>
          <HomeHeader title=' Loan Hub ' link='/loan/hub' />
        </div>
        <div className=' flex flex-col gap-12 '>
          <LoanSummaryComponent />
          <div className='  flex gap-10 min-h-full  '>
            <div className=' w-full ml-auto mr-0 flex  flex-1 flex-col gap-10    '>
              <LoanHubComponent />
            </div>
          </div>
        </div>

        <div
          className=' fixed z-10000000000000000 right-0 bottom-0 mr-6 mb-16 cursor-pointer  '
          onClick={() => Router.push("/loan/create")}
        >
          {" "}
          <Image
            src={`/icons/create-link.svg`}
            width={60}
            height={60}
            alt=''
          />{" "}
        </div>
      </div>
    </>
  )
}
