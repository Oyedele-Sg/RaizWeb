"use client"
import { toast } from "@/components/ui/use-toast"
import { userService } from "@/services"
import {
  AuthButton,
  BtnMain,
  ForgotPasswordDataInterface,
  Loading,
  RegisterInput,
  WhiteWrap,
  forgotPasswordSchema,
} from "@/shared"
import { setLoadingFalse, setLoadingTrue } from "@/shared/redux/features"
import { useAppDispatch } from "@/shared/redux/types"
import { yupResolver } from "@hookform/resolvers/yup"
import { useRouter } from "next/navigation"
import React from "react"
import { useForm, FormProvider } from "react-hook-form"

export default function ForgotPassword() {
  const dispatch = useAppDispatch()

  const Router = useRouter()
  const methods = useForm<ForgotPasswordDataInterface>({
    defaultValues: {
      otp: "",
    },
  })

  const onSubmit = async (data: ForgotPasswordDataInterface) => {
   
    Router.push("/add-funds/direct-transfer/otp-2")
  }
  return (
    <>
      <Loading />
      <WhiteWrap
        extraStyle=' rounded-[80px] w-[400px] md:w-[550px]  lg:w-[771px]   mx-5'
        closeBtn
        closeLink='/add-funds/direct-transfer'
      >
        <div className='   lg:px-[35.5px]  mb-[50px]  '>
          <div className='    flex flex-col gap-[80px] '>
            <div className=' flex flex-col gap-2 items-center  '>
              <h1 className=' text-neutral-90 text-[2rem] font-semi-mid leading-10  '>
                Enter OTP 1
              </h1>
              <p className=' text-neutral-90  leading-6 text-center '>
                We sent OTP to your phone number
              </p>
            </div>
            <FormProvider {...methods}>
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className='  flex flex-col gap-8 '
              >
                <RegisterInput
                  name='otp'
                  inputPlaceholder='1 5 3 9 4 9 6 9 5 3 9 2 U '
                />
                <div className=' flex items-center justify-center gap-12 '>
                  <BtnMain
                    btnText='Resend OTP'
                    btnStyle=' border border-neutral-90 text-purple font-bold px-[36px]  '
                    type='button'
                  />
                  <AuthButton
                    btnText='Continue'
                    btnStyle=' px-[43px] '
                    type='submit'
                  />
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </WhiteWrap>
    </>
  )
}
