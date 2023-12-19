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
        
      </div>
    </div>
  )
}
