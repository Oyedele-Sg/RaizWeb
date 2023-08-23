"use client"
import { AuthStepper } from "@/components"
import { toast } from "@/components/ui/use-toast"
import { userService } from "@/services"
import {
  AuthButton,
  Loading,
  RegisterInput,
  VerifySuccess,
  WhiteWrap,
} from "@/shared"
import {
  getSignUpEmail,
  setLoadingFalse,
  setLoadingTrue,
} from "@/shared/redux/features"
import { useAppDispatch } from "@/shared/redux/types"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { useForm, FormProvider, FieldValues } from "react-hook-form"

interface WrongEmailFormProps extends Partial<FieldValues> {
  email: string
}

export default function WrongMail() {
  const Router = useRouter()
  const dispatch = useAppDispatch()

  const methods = useForm<WrongEmailFormProps>({
    defaultValues: {
      email: "",
    },
  })

  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit = async (data: WrongEmailFormProps) => {
    try {
      dispatch(setLoadingTrue())
      const response = await userService.resendEmail(data)
      methods.reset()
      toast({
        title: " OTP Sent",
        description:
          "OTP has been sent to your email address. Please check your inbox. ",
        style: {
          backgroundColor: "#4B0082",
          color: "#fff",
        },
      })
      dispatch(getSignUpEmail(data.email))
      dispatch(setLoadingFalse())

      setLoading(false)
      Router.push("/verification/email")
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
      })
    }
  }

  return (
    <>
      <Loading />
      <WhiteWrap
        extraStyle=' h-screen lg:h-full w-full   flex flex-col  justify-center  '
        closeBtn
        closeLink='/verification/email'
      >
        <div className=' max-w-[502px] mx-auto flex flex-col gap-12  '>
          {/* <div>
          <AuthStepper activeStep={0} />
        </div> */}

          <div className=' flex flex-col gap-[80px] '>
            <div className=' flex flex-col justify-center items-center gap-[3rem]  '>
              <div className='lg:hidden'>
                <Image
                  src='/illustrations/email-mobile.svg'
                  alt='otp'
                  width={153}
                  height={167}
                />
              </div>
              <div className=' text-center flex flex-col gap-2   '>
                <h1 className=' font-headline__large  font-semi-mid text-purple   '>
                  {" "}
                  Confirm Email Address
                </h1>
                <p className=' font-body__large text-neutral-90 '>
                  Enter correct email to verify your account.
                </p>
              </div>
            </div>

            <div className=' '>
              <FormProvider {...methods}>
                <form
                  onSubmit={methods.handleSubmit(onSubmit)}
                  className='flex flex-col gap-8'
                >
                  <RegisterInput
                    name={`email`}
                    inputPlaceholder={`Enter Email Address`}
                    rules={{
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    }}
                    label='Email Address'
                  />

                  <div className=' flex items-center justify-center   '>
                    <AuthButton
                      btnText={"Send OTP"}
                      btnStyle=' py-4 px-[60px] '
                    />
                  </div>
                </form>
              </FormProvider>
            </div>
          </div>
        </div>
      </WhiteWrap>
    </>
  )
}
