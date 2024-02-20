"use client"
import { IllustrationComponent, LoginForm } from "@/components"
import { OnboardTitleComponent } from "@/components/ajo"
import { CurrentUserContext } from "@/providers/CurrentUserProvider"
import { userService } from "@/services"
import { BtnMain, IconRaiz, Loading, WhiteTileWrap } from "@/shared"
import { setLoadingFalse, setLoadingTrue } from "@/shared/redux/features"
import { useAppDispatch } from "@/shared/redux/types"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { useContext } from "react"

export default function Ajo() {
  const Router = useRouter()
  const dispatch = useAppDispatch()
  const { currentUser } = useContext(CurrentUserContext)

  const data = [
    {
      text: "Secure Your Savings with Save Lock",
      span: "Money to be collected on the first of December and  no one has access to your deposit",
      icon: "0",
    },
    {
      text: "Target Your Savings with Target Save",
      span: "Set Goals and Save Strategically to Reach Your Financial Targets",
      icon: "1",
    },
    {
      text: "Transforming Lives through Savings",
      span: "Discover the Power of Saving Money and Achieving Financial Dreams",
      icon: "2",
    },
  ]
  const [active, setActive] = React.useState(0)
  React.useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev === 2 ? 0 : prev + 1))
    }, 8000)
    return () => clearInterval(interval)
  }, [])
  return (
    <>
      <Loading />
      <div className='  '>
        <div className=' bg-savings-bg  rounded-lg  px-[96px] py-12 '>
          <div className=' flex flex-col gap-8 '>
            <div className=' flex flex-col items-center gap-12  '>
              <Image
                src={`/illustrations/savings/${data[active].icon}.svg`}
                width={184.23}
                height={163.93}
                alt=''
              />
              <div className=' flex flex-col gap-4   '>
                <h1 className=' font-semi-mid text-purple text-t-32 text-center  '>
                  {data[active].text}
                </h1>
                <p className=' text-center  text-neutral-80 text-t-16   '>
                  {data[active].span}
                </p>
              </div>
            </div>
            <div className='flex gap-2 justify-center'>
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  className={` rounded-full w-2 h-2 bg-neutral-30 ${
                    active === index && `bg-yellow`
                  } `}
                  onClick={() => setActive(index)}
                ></div>
              ))}
            </div>
          </div>

          <div className=''>
            <BtnMain
              btnText=' Get Started '
              btnStyle=' w-full btn-gradient-savings  text-grey mt-[56px] '
              onClick={async () => {
                dispatch(setLoadingTrue())

                if (currentUser?.onboarding_checklist === null) {
                  await userService.updateUserOnboardingList({
                    ajo: false,
                    checking: false,
                    savings: true,
                    loan: false,
                  })
                  dispatch(setLoadingFalse())
                  Router.push("/savings/hub")
                } else {
                  await userService.updateUserOnboardingList({
                    savings: true,
                  })
                  dispatch(setLoadingFalse())
                  Router.push("/savings/hub")
                }
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}
