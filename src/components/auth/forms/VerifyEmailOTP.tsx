"use client"
import {
  AuthButton,
  BtnMain,
  Loading,
  OTPFormValues,
  VerifySuccess,
  WhiteTileWrap,
  WhiteWrap,
} from "@/shared"
import { useAppDispatch, useAppSelector } from "@/shared/redux/types"
import { useRouter } from "next/navigation"
import React, { useRef, useState } from "react"
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
import { setLoadingFalse, setLoadingTrue } from "@/shared/redux/features"
import Image from "next/image"

export const VerifyEmailOTP = () => {
  const Router = useRouter()
  const signupEmail = useAppSelector((state) => state.signupEmail)
  const dispatch = useAppDispatch()

  const [success, setSuccess] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const otpInputRefs = useRef<Array<HTMLInputElement | null>>([])

  const methods = useForm<OTPFormValues>({
    defaultValues: {
      otp: [{ otp1: "" }, { otp2: "" }, { otp3: "" }, { otp4: "" }],
    },
  })

  const onSubmit = async (data: OTPFormValues) => {
    const otp = {
      otp: `${data.otp1}${data.otp2}${data.otp3}${data.otp4}`,
    }

    if (!otp.otp) return

    try {
      dispatch(setLoadingTrue())
      await userService.verifyEmail(otp)
      toast({
        title: " Verifiction Sucessful",
        description:
          "Your email has been sucessfully verified and your account is created. ",
        style: {
          backgroundColor: "#4B0082",
          color: "#fff",
        },
        duration: 2000,
      })

      methods.reset()
      dispatch(setLoadingFalse())
      setSuccess(true)
    } catch (error) {
      dispatch(setLoadingFalse())

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
    // onOtpSubmit(otp)
  }

  const handleInputChange = (index: number) => {
    const currentValue = otpInputRefs.current[index]?.value
    const prevValue = otpInputRefs.current[index - 1]?.value

    if (currentValue && currentValue.length === 1) {
      if (index < otpInputRefs.current.length - 1) {
        otpInputRefs.current[index + 1]?.focus()
      } else {
        otpInputRefs.current[index]?.blur()
        // Submit OTP or perform the desired action here
      }
    } else if (!currentValue && prevValue) {
      otpInputRefs.current[index - 1]?.focus()
    }
  }

  return (
    <>
      <Loading />
      {success ? (
        <VerifySuccess
          activeStep={1}
          title='Email Verified Successfully'
          description='Your email has been sucessfully verified and your account is created.'
          btnLink='/login'
          email
        />
      ) : (
        <WhiteWrap extraStyle=' h-screen lg:h-full w-full  flex items-center justify-center bug '>
          <div className=' max-w-[502px] mx-auto flex flex-col gap-12  bug '>
            {/* comment out stepper component  */}
            {/* <div>
            <AuthStepper activeStep={0} />
          </div> */}

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
                <div className=' text-center flex flex-col gap-2  '>
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
                  <div className='flex gap-[33px] justify-center  '>
                    {Array.from({ length: 4 }, (_, index) => (
                      <input
                        key={index}
                        type='number'
                        {...methods.register(`otp${index + 1}`, {
                          required: true,
                        })}
                        inputMode='numeric'
                        maxLength={1}
                        className={`form-input otp_field-input spin-button-none ${
                          methods.formState.errors[`otp${index + 1}`]
                            ? "otp_field-input_error"
                            : ""
                        }`}
                        ref={(ref) => {
                          otpInputRefs.current[index] = ref
                        }}
                        onChange={(event) => {
                          const { value } = event.target
                          methods.setValue(`otp${index + 1}`, value)
                          handleInputChange(index)
                        }}
                      />
                    ))}
                  </div>

                  {(methods.formState.errors.otp1 ||
                    methods.formState.errors.otp2 ||
                    methods.formState.errors.otp3 ||
                    methods.formState.errors.otp4) && (
                    <span className=' text-center  text-error text-t-12  '>
                      OTP is required and must be digits
                    </span>
                  )}

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

                    {/* <div>
          <Link href={"  "} className=' text-neutral-90  text-center '>
            Wrong Email?
          </Link>
        </div> */}
                  </div>
                </form>

                {/* <DevTool control={methods.control} />  */}
              </div>
            </div>
          </div>
        </WhiteWrap>
      )}
    </>
  )
}
