import React from "react"
import Image from "next/image"
import { AuthStepper } from "@/components/auth/AuthStepper"
import { useRouter } from "next/navigation"
import { BtnMain } from "./buttons"
import { useAppDispatch } from "../redux/types"
import { toast } from "@/components/ui/use-toast"
import { setLoadingFalse, setLoadingTrue } from "../redux/features"

interface Props {
  activeStep: number
  title: string
  description: string
  btnLink: string
  btnFunc?: () => void
  email?: boolean
}

export const VerifySuccess: React.FC<Props> = ({
  activeStep,
  title,
  description,
  btnLink,
  btnFunc,
  email,
}) => {
  const Router = useRouter()
  const dispatch = useAppDispatch()

  return (
    <div className=' max-w-[502px] mx-auto flex flex-col gap-12  '>
      {!email && (
        <div>
          <AuthStepper activeStep={activeStep} />
        </div>
      )}

      <div className=' px-[35px] flex flex-col gap-8 '>
        <div className='flex items-center justify-center '>
          <Image
            src='/illustrations/verify-success.svg'
            width={167.5}
            height={129.07}
            alt='success'
          />
        </div>
        <div className=''>
          <div className=' text-center flex flex-col gap-2   '>
            <h1 className=' font-headline__large  font-semi-mid text-purple   '>
              {title}
            </h1>
            <p className=' font-body__large text-neutral-90 '>{description}</p>
          </div>
        </div>
        <div className=' flex items-center justify-center   '>
          <BtnMain
            btnStyle=' authBtn text-purple  px-[42px]  '
            btnText={"Continue"}
            type='reset'
            onClick={() => {
              btnFunc && btnFunc()

              Router.push(btnLink)
            }}
          />
        </div>
      </div>
    </div>
  )
}
