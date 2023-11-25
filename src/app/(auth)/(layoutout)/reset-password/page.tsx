"use client"
import { toast } from "@/components/ui/use-toast"
import { userService } from "@/services"
import {
  AuthButton,
  ResetPasswordDataInterface,
  RegisterInput,
  WhiteWrap,
  forgotPasswordSchema,
  resetPasswordSchema,
  Loading,
} from "@/shared"
import { setLoadingFalse, setLoadingTrue } from "@/shared/redux/features"
import { useAppDispatch } from "@/shared/redux/types"
import { passwordHash } from "@/utils/helpers"
import { yupResolver } from "@hookform/resolvers/yup"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"

export default function ResetPassword() {
  const dispatch = useAppDispatch()
  const Router = useRouter()
  const methods = useForm<ResetPasswordDataInterface>({
    defaultValues: {
      password: "",
      otp: "",
    },
    resolver: yupResolver(resetPasswordSchema),
  })
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const onSubmit = async (data: ResetPasswordDataInterface) => {
    try {
      dispatch(setLoadingTrue())
      await userService.resetPassword({
        ...data,
        password: passwordHash(data.password),
      })
      dispatch(setLoadingFalse())
      Router.push("/login")
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
        closeLink='/login'
      >
        <div className='   mx-5 lg:mx-0     '>
          <div className='    flex flex-col gap-[80px] '>
            <div className=' flex flex-col gap-2 items-center  '>
              <h1 className=' text-neutral-90 text-[2rem] font-semi-mid leading-10  '>
                Reset Password
              </h1>
              <p className=' text-neutral-90  leading-6 text-center '>
                Enter a new password for your account
              </p>
            </div>
            <FormProvider {...methods}>
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className='  flex flex-col gap-8 '
              >
                <RegisterInput
                  name='otp'
                  inputPlaceholder='Enter OTP'
                  label='OTP'
                />
                <RegisterInput
                  name={`password`}
                  inputPlaceholder={`Enter new password`}
                  label='Password'
                  childrenHandleClick={() => setShowPassword((state) => !state)}
                  type={showPassword ? "text" : "password"}
                  extraClass={`mt-6  `}
                >
                  <Image
                    src={`/icons/eye-slash.svg`}
                    alt='show password'
                    width={24}
                    height={24}
                    className='password_field-input  '
                  />
                </RegisterInput>
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
