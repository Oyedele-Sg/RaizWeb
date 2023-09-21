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
import React, { useEffect, useRef, useState } from "react"
import { AuthStepper } from "../AuthStepper"
import { userService } from "@/services"
import { toast } from "@/components/ui/use-toast"
import {
  useForm,
  FieldValues,
  Form,
  FormProvider,
  useFieldArray,
} from "react-hook-form"
import { useUser } from "@/hooks/user/useUser"
import { setLoadingFalse, setLoadingTrue } from "@/shared/redux/features"
import Image from "next/image"
import PinInput from "react-pin-input"

export const VerifyPhoneOTP = () => {
  const Router = useRouter()
  const dispatch = useAppDispatch()
  const user = useUser()
  const [success, setSuccess] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const otpInputRefs = useRef<Array<HTMLInputElement | null>>([])
  const OTPPreference =
    typeof sessionStorage !== "undefined"
      ? sessionStorage.getItem("pesaOTP")
      : null

  const methods = useForm<VerifyEmailFormInterface>({
    defaultValues: {
      otp: "",
    },
  })

  const [countdown, setCountdown] = useState<number>(60)
  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null)

  const startCountdownTimer = () => {
    setCountdown(60)

    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current)
    }

    countdownTimerRef.current = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1)
    }, 1000)
  }

  useEffect(() => {
    if (countdown === 0) {
      clearInterval(countdownTimerRef.current!)
    }
  }, [countdown])

  useEffect(() => {
    if (countdown > 0) {
      countdownTimerRef.current = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1)
      }, 1000)
    }

    return () => {
      if (countdownTimerRef.current) {
        clearInterval(countdownTimerRef.current)
      }
    }
  }, [])

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

      OTPPreference === "phone"
        ? await userService.verifyPhone(data)
        : await userService.verifyVoiceOTP(data)

      toast({
        title: " Verifiction Sucessful",
        description: "Your phone number has been sucessfully verified. ",
        style: {
          backgroundColor: "#4B0082",
          color: "#fff",
        },
        duration: 2000,
      })
      setTimeout(() => {
        methods.reset()
        dispatch(setLoadingFalse())

        setSuccess("success")
      }, 1000)
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

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleResendOTP = async () => {
    try {
      dispatch(setLoadingTrue())
      OTPPreference === "phone"
        ? await userService.refreshPhoneOTP({
            email: user?.email as string,
          })
        : await userService.refreshVoiceOTP({
            email: user?.email as string,
          })
      toast({
        title: " OTP Resent",
        description: " OTP has been resent to your phone number.",
        style: {
          backgroundColor: "#4B0082",
          color: "#fff",
        },
        duration: 2000,
      })

      dispatch(setLoadingFalse())
      startCountdownTimer()
    } catch (error) {
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
      dispatch(setLoadingFalse())
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
          title='Phone Number Verified Successfully'
          description='Your phone number has been sucessfully verified.'
          btnLink='/verification/bvn'
        />
      ) : success === "failed" ? (
        <VerifyFail
          title='Phone OTP Incorrect'
          description='Phone OTP is incorrect, please try again'
          btnLink='/verification/verify-number'
          btnText='Re-send OTP'
          btnFunc={() => setSuccess("")}
        />
      ) : (
        <WhiteWrap
          extraStyle=' h-screen lg:h-full w-full   flex items-center justify-center lg:rounded-[80px]  '
          closeBtn
          closeLink='/verification/add-number'
        >
          <div className='lg:w-[502px] mx-auto flex flex-col gap-12  '>
            <div>
              <AuthStepper activeStep={1} />
            </div>

            <div className=' px-[35px] flex flex-col gap-[80px] '>
              <div className=' flex flex-col justify-center items-center gap-[3rem] '>
                <div className='lg:hidden'>
                  <Image
                    src='/illustrations/phone-mobile.svg'
                    alt='otp'
                    width={153}
                    height={167}
                  />
                </div>
                <div className=' text-center flex flex-col gap-2   '>
                  <h1 className=' font-headline__large  font-semi-mid text-purple   '>
                    Enter OTP
                  </h1>
                  <p className=' font-body__large text-neutral-90 '>
                    We sent you OTP to your phone number
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
                      justifyContent: "space-between",
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

                  <span className=' text-center text-neutral-50  '>
                    {countdown > 0
                      ? `Resend OTP in ${formatTime(countdown)}`
                      : ""}
                  </span>

                  <div className=' flex flex-col justify-center items-center  gap-8 '>
                    <div className=''>
                      <div className=' flex gap-12 '>
                        <BtnMain
                          btnStyle='  border-purple border-[1px] rounded-[8px] text-purple  px-[42px]  '
                          btnText={"Resend OTP"}
                          type='reset'
                          onClick={handleResendOTP}
                          disabled={countdown > 0} // Disable the button during the countdown
                        />
                        <AuthButton
                          btnStyle='flex-1 w-full px-[42px] '
                          btnText={"Verify OTP"}
                          type='submit'
                        />
                      </div>
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
