"use client"
import { toast } from "@/components/ui/use-toast"
import { userService } from "@/services"
import {
  AuthButton,
  ForgotPasswordDataInterface,
  ForgotPinDataInterface,
  Loading,
  RegisterInput,
  WhiteWrap,
  forgotPasswordSchema,
  forgotPinSchema,
} from "@/shared"
import { setLoadingFalse, setLoadingTrue } from "@/shared/redux/features"
import { useAppDispatch } from "@/shared/redux/types"
import { passwordHash } from "@/utils/helpers"
import { yupResolver } from "@hookform/resolvers/yup"
import { useRouter } from "next/navigation"
import React from "react"
import { useForm, FormProvider } from "react-hook-form"

export default function ForgotPassword() {
  const dispatch = useAppDispatch()

  const Router = useRouter()
  const methods = useForm<ForgotPinDataInterface>({
    defaultValues: {
      otp: "",
      transaction_pin: "",
    },
    resolver: yupResolver(forgotPinSchema),
  })

  const onSubmit = async (data: ForgotPinDataInterface) => {
    try {
      dispatch(setLoadingTrue())

      await userService.resetTransactionPin({
        ...data,
        transaction_pin: passwordHash(data.transaction_pin),
      })
      dispatch(setLoadingFalse())

      Router.push("/settings/login-and-security")
    } catch (error) {
      dispatch(setLoadingFalse())

      toast({
        title: "Something Went Wrong",
        description: `${error}`,
        variant: "destructive",
        style: {
          backgroundColor: "#f44336",
          color: "#fff",
          top: "20px",
          right: "20px",
        },
        duration: 5000,
      })
    }
  }
  return (
    <>
      <Loading />
      <WhiteWrap
        extraStyle=' rounded-[80px] w-[400px] md:w-[550px]  lg:w-[771px]   mx-5'
        closeBtn
        closeLink='/settings/login-and-security'
      >
        <div className='   lg:px-[35.5px]  mb-[50px]  '>
          <div className='    flex flex-col gap-[80px] '>
            <div className=' flex flex-col gap-2 items-center  '>
              <h1 className=' text-neutral-90 text-[2rem] font-semi-mid leading-10  '>
                Forgot Pin
              </h1>
              {/* <p className=' text-neutral-90  leading-6 text-center '>
                Enter your email address to reset your password
              </p> */}
            </div>
            <FormProvider {...methods}>
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className='  flex flex-col gap-8 '
              >
                <RegisterInput
                  name='otp'
                  inputPlaceholder='Enter OTP sent to your email address'
                  label='OTP'
                />
                <RegisterInput
                  name='transaction_pin'
                  inputPlaceholder='Enter new transaction pin'
                  label='New Transaction Pin'
                  type='password'
                  length={4}
                />
                <div className=' flex items-center justify-center '>
                  <AuthButton btnText='Continue' btnStyle=' px-[108px] ' />
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </WhiteWrap>
    </>
  )
}
