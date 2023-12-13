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
      subText: "Collaborate for collective financial growth",
      icon: "ajoOne",
    },
    {
      text: "Your Cash, Our Priority",
      span: "Our Priority",
      subText: "Boost financial confidence with us.",
      icon: "ajoTwo",
    },
    {
      text: "Join Ajo for ",
      span: "Income Growth",
      SubText: "Accelerate your income growth with Ajo. Join now",
      icon: "ajoThree",
    },
  ]
  const [active, setActive] = React.useState(0)
  React.useEffect(() => {
    // if (currentUser.onboarding_checklist.ajo) {
    //   Router.push("/ajo/hub")
    // }
    const interval = setInterval(() => {
      setActive((prev) => (prev === 2 ? 0 : prev + 1))
    }, 8000)
    return () => clearInterval(interval)
  }, [])
  return (
    <>
      <Loading />
      <div className='  '>
        <div className=' bg-ajo-card  rounded-lg  px-[96px] py-12 '>
          <div className=' flex flex-col gap-8 '>
            <div className=' flex flex-col items-center gap-12  '>
              <div className=' h-[216px]'>
                <Image
                  src={`/illustrations/${data[active].icon}.svg`}
                  width={412.53}
                  height={215.04}
                  alt=''
                />
              </div>
              <div className=' flex flex-col gap-4   '>
                <h1 className=' font-semi-mid text-purple text-t-32 text-center  '>
                  {data[active].text}{" "}
                  <span className=' text-yellow '> {data[active].span}</span>
                </h1>
                <p className=' text-center  text-neutral-80 text-t-16   '>
                  {" "}
                  {data[active].SubText}{" "}
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
              btnStyle=' w-full bg-gradient-ajo  text-grey mt-[56px] '
              onClick={() => Router.push("/ajo/hub")}
            />
          </div>
        </div>
      </div>
    </>
  )
}
