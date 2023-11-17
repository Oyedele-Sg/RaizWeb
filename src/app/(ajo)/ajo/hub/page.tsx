"use client"
import { AjoJoined, ExploreAjo, HomeHeader } from "@/components/ajo"
import { userService } from "@/services"
import { Loading } from "@/shared"
import React, { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Ajo() {
  // const { currentUser } = useContext(CurrentUserContext)
  const Router = useRouter()
  useEffect(() => {
    const getUser = async () => {
      const response = await userService.getCurrentUser()
      if (!response.onboarding_checklist.ajo) {
        Router.push("/ajo/onboard")
      }
    }

    getUser()
  }, [])

  return (
    <>
      <Loading />
      <div className='  '>
        <div className=' py-12 px-5 lg:p-10 '>
          <HomeHeader title=' Cycle Hub ' />
        </div>

        <div className='  lg:p-10 flex gap-10 min-h-full '>
          <div className=' w-full ml-auto mr-0 flex  flex-1 flex-col gap-10   '>
            <ExploreAjo />
            <AjoJoined />
          </div>

          {/* <FeedComponent /> */}
        </div>
      </div>
    </>
  )
}
