import { CurrentUserContext } from "@/providers/CurrentUserProvider"
import { userService } from "@/services"
import { BtnMain } from "@/shared"
import { setLoadingFalse, setLoadingTrue } from "@/shared/redux/features"
import { useAppDispatch } from "@/shared/redux/types"
import { useRouter } from "next/navigation"
import React, { useContext } from "react"

interface Props {
  titleText: string
  titleSpan: string
}

export function OnboardTitleComponent({ titleText, titleSpan }: Props) {
  const Router = useRouter()
  const dispatch = useAppDispatch()
  const { currentUser } = useContext(CurrentUserContext)
  return (
    <div className=' flex-1  lg:flex items-center hidden    '>
      <div className=' lg:flex flex-col items-start  gap-[4.5rem]   hidden '>
        <div className=' min-h-[106px]  '>
          <h1 className='  font-display__large text-grey   '>
            {" "}
            {titleText + " "} <span className=' text-yellow '>{titleSpan}</span>{" "}
          </h1>
        </div>
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
              Router.push("/ajo/hub")
            } else {
              await userService.updateUserOnboardingList({
                ajo: true,
              })
              dispatch(setLoadingFalse())
              Router.push("/ajo/hub")
            }
          }}
        />
      </div>
    </div>
  )
}
