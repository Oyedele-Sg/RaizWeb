"use client"
import {
  AuthButton,
  BtnMain,
  Loading,
  VerifyEmailFormInterface,
  VerifyFail,
  VerifySuccess,
  WhiteWrap,
} from "@/shared"
import { useAppDispatch, useAppSelector } from "@/shared/redux/types"
import { useRouter } from "next/navigation"
import React, { useRef, useState } from "react"
import { userService } from "@/services"
import { toast } from "@/components/ui/use-toast"
import { useForm } from "react-hook-form"
import { setLoadingFalse, setLoadingTrue } from "@/shared/redux/features"
import Image from "next/image"
import PinInput from "react-pin-input"

export const VerifyEmailOTP = () => {
  const Router = useRouter()
  const signupEmail = useAppSelector((state) => state.signupEmail)
  const dispatch = useAppDispatch()

  const [success, setSuccess] = useState<string>("")

  const methods = useForm<VerifyEmailFormInterface>({
    defaultValues: {
      otp: "",
    },
  })

  const onSubmit = async (data: VerifyEmailFormInterface) => {
    if (!data.otp) {
      toast({
        title: "OTP is required",
        variant: "destructive",
        style: {
          backgroundColor: "#f44336",
          color: "#fff",
          top: "20px",
          right: "20px",
        },
      })
      return
    }

    try {
      dispatch(setLoadingTrue())
      await userService.verifyEmail(data)

      methods.reset()
      dispatch(setLoadingFalse())
      setSuccess("success")
    } catch (error) {
      dispatch(setLoadingFalse())
      if (error === "Invalid OTP") {
        setSuccess("failed")
        return
      }

      toast({
        title: "Error",
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

  const handleInputChange = (value: string, index: number) => {
    methods.setValue("otp", value)
  }
  return (
    <>
      <Loading />
      {success === "success" ? (
        <VerifySuccess
          activeStep={1}
          title='Email Verified Successfully'
          description='Your email has been sucessfully verified and your account is created.'
          btnLink='/login'
          email
        />
      ) : success === "failed" ? (
        <VerifyFail
          title='Email OTP Incorrect'
          description='Email OTP is incorrect, please try again'
          // btnLink='/verification/email'
          btnText='Re-send OTP'
          btnFunc={() => setSuccess("")}
        />
      ) : (
        <WhiteWrap extraStyle=' h-screen lg:h-full w-full  flex items-center justify-center lg:rounded-[80px]  '>
          <div className=' text-center flex flex-col gap-2  '>
            <div className=' max-w-[502px] mx-auto flex flex-col gap-12   '>
              <div className=' px-[35px] flex flex-col gap-[80px] '>
                <div className=' flex flex-col justify-center items-center gap-[3rem] '>
                  <div className='lg:hidden'>
                    <Image
                      src='/illustrations/email-mobile.svg'
                      alt='otp'
                      width={153}
                      height={167}
                    />
                  </div>
                  <h1 className=' font-headline__large  font-semi-mid text-purple   '>
                    Email Verification OTP
                  </h1>
                  <p className=' font-body__large text-neutral-90 '>
                    {" "}
                    Please check your email{" "}
                    <span className=' underline '>{signupEmail}</span> for the
                    OTP code sent.{" "}
                  </p>
                </div>
              </div>

              <div>
                <form
                  onSubmit={methods.handleSubmit(onSubmit)}
                  className=' flex flex-col gap-8 '
                >
                  <PinInput
                    length={4}
                    initialValue=''
                    secret
                    onChange={(value, index) => handleInputChange(value, index)}
                    type='numeric'
                    inputMode='number'
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "33px",
                    }}
                    inputStyle={{
                      padding: "10px",
                      borderTop: "none",
                      borderLeft: "none",
                      borderRight: "none",
                      borderBottom: "1px solid #4B0082",
                    }}
                    inputFocusStyle={{
                      borderBottom: "1px solid #4B0082",
                    }}
                    autoSelect={true}
                    regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                  />

                  <div className=' flex flex-col justify-center items-center  gap-8 '>
                    <div className=' flex gap-12 '>
                      <BtnMain
                        btnStyle='  border-purple border-[1px] rounded-[8px] text-purple  px-[42px]  '
                        btnText={"Resend OTP"}
                        type='reset'
                        onClick={async () => {
                          Router.push("/verification/email/resend-otp")
                        }}
                      />
                      <AuthButton
                        btnStyle='flex-1 w-full px-[42px] '
                        btnText={"Verify OTP"}
                        type='submit'
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </WhiteWrap>
      )}
    </>
  )
}

// jakifo4838@armablog.com
