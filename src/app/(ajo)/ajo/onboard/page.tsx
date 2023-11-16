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
      text: "Multiply your Savings with",
      span: "Community Power",
      icon: "ajoOne",
    },
    {
      text: "Your Cash, Our Priority",
      span: "Our Priority",
      icon: "ajoTwo",
    },
    {
      text: "Join Ajo for ",
      span: "Income Growth",
      icon: "ajoThree",
    },
  ]
  const [clicked, setClicked] = React.useState(0)
  const [active, setActive] = React.useState(0)
  React.useEffect(() => {
    // if (currentUser?.onboarding_checklist?.ajo) {
    //   Router.push("/ajo")
    // }
    const interval = setInterval(() => {
      setActive((prev) => (prev === 2 ? 0 : prev + 1))
    }, 2000)
    return () => clearInterval(interval)
  }, [])
  return (
    <>
      <Loading />
      <div className='  fixed inset-0  lg:pl-[50px] lg:pr-[72px]  h-screen  '>
        <div className=' hidden lg:block pl-3 mt-[72px] mb-2  '>
          <IconRaiz />
        </div>

        <div className='flex  justify-between   gap-[104px] min-h-full '>
          <OnboardTitleComponent
            titleText={data[active].text}
            titleSpan={data[active].span}
          />

          <div className=' flex-1 min-h-full lg:pb-[100px] '>
            <WhiteTileWrap extraStyle='  flex flex-col items-center justify-center px-4   min-h-full rounded-none lg:rounded-lg  '>
              <div className=' flex flex-col gap-[186px]  items-center justify-between  '>
                <h1 className='  text-[32px] text-center  text-purple font-semi-mid lg:hidden  '>
                  {data[active].text + " "}
                  <span className=' text-yellow '>
                    {data[active].span}
                  </span>{" "}
                </h1>
                <div className='flex flex-col gap-8 items-center '>
                  <div className='  w-[300.42px]  lg:w-[577.42px] h-[340px] '>
                    <Image
                      src={`/illustrations/${data[active].icon}.svg`}
                      alt=''
                      width={577.742} // 577.742
                      height={340} // 340
                    />
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
                <div className='lg:hidden'>
                  <BtnMain
                    btnText=' Get Started'
                    btnStyle=' text-grey px-[3.75rem]  bg-gradient-ajo  font-body__large '
                    onClick={async () => {
                      dispatch(setLoadingTrue())

                      if (currentUser?.onboarding_checklist === null) {
                        await userService.updateUserOnboardingList({
                          ajo: true,
                          checking: false,
                          savings: false,
                          loan: false,
                        })
                        Router.push("/ajo")
                        return
                      }

                      userService.updateUserOnboardingList({ ajo: true })
                      dispatch(setLoadingFalse())
                      Router.push("/ajo")
                    }}
                  />
                </div>
              </div>
            </WhiteTileWrap>
          </div>
        </div>
      </div>
    </>
  )
}
