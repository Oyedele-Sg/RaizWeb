"use client"
import { HomeHeader } from "@/components/ajo"
import { userService } from "@/services"
import { Loading } from "@/shared"
import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  LockSavingsComponent,
  TargetSavingsComponent,
} from "@/components/savings"
import Image from "next/image"

export default function Savings() {
  // const { currentUser } = useContext(CurrentUserContext)
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
          <HomeHeader title=' Save Hub ' link='/savings/hub' />
        </div>

        <div className='  flex gap-10 min-h-full '>
          <div className=' w-full ml-auto mr-0 flex  flex-1 flex-col gap-10   '>
            <LockSavingsComponent />

            <TargetSavingsComponent />
          </div>

          {/* <FeedComponent /> */}
        </div>

        <div
          className=' fixed z-10000000000000000 right-0 bottom-0 mr-6 mb-16 cursor-pointer '
          onClick={() => Router.push("/savings/create")}
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
