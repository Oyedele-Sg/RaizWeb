"use client"
import {
  AuthButton,
  BtnMain,
  Loading,
  OTPFormValues,
  VerifySuccess,
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
import { useUser } from "@/hooks/useUser"
import { setLoadingFalse, setLoadingTrue } from "@/shared/redux/features"

export const VerifyPhoneOTP = () => {
  const Router = useRouter()
  const dispatch = useAppDispatch()
  const user = useUser()
  const [success, setSuccess] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const otpInputRefs = useRef<Array<HTMLInputElement | null>>([])

  const methods = useForm<OTPFormValues>({
    defaultValues: {
      otp: [
        { otp1: "" },
        { otp2: "" },
        { otp3: "" },
        { otp4: "" },
        { otp5: "" },
      ],
    },
  })

  const onSubmit = async (data: OTPFormValues) => {
    const otp = {
      otp: `${data.otp1}${data.otp2}${data.otp3}${data.otp4}${data.otp5}`,
    }

    if (!otp.otp) return

    console.log("otp", otp)

    try {
      dispatch(setLoadingTrue())

      await userService.verifyPhone(otp)
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

        setSuccess(true)
      }, 1000)
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
    if (otpInputRefs.current[index]?.value.length === 1) {
      if (index < otpInputRefs.current.length - 1) {
        otpInputRefs.current[index + 1]?.focus()
      } else {
        otpInputRefs.current[index]?.blur()
        // Submit OTP or perform the desired action here
      }
    }
  }

  return (
    <>
      <Loading />
      {success ? (
        <VerifySuccess
          activeStep={1}
          title='Phone Number Verified Successfully'
          description='Your phone number has been sucessfully verified.'
          btnLink='/verification/bvn'
        />
      ) : (
        <div className=' max-w-[502px] mx-auto flex flex-col gap-12  '>
          <div>
            <AuthStepper activeStep={1} />
          </div>

          <div className=' px-[35px] flex flex-col gap-[80px] '>
            <div className=' text-center flex flex-col gap-2   '>
              <h1 className=' font-headline__large  font-semi-mid text-purple   '>
                Enter OTP
              </h1>
              <p className=' font-body__large text-neutral-90 '>
                We sent you OTP to your phone number
              </p>
            </div>

            <div>
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className=' flex flex-col gap-8 '
              >
                <div className='flex gap-[33px] justify-center  '>
                  {Array.from({ length: 5 }, (_, index) => (
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
                  methods.formState.errors.otp4 ||
                  methods.formState.errors.otp5) && (
                  <span className=' text-center  text-error text-t-12  '>
                    OTP is required and must be 5 digits
                  </span>
                )}

                <div className=' flex flex-col justify-center items-center  gap-8 '>
                  <div className=' flex gap-12 '>
                    <BtnMain
                      btnStyle='  border-purple border-[1px] rounded-[8px] text-purple  px-[42px]  '
                      btnText={"Resend OTP"}
                      type='reset'
                      onClick={async () => {
                        try {
                          dispatch(setLoadingTrue())
                          await userService.refreshPhoneOTP({
                            email: user?.email as string,
                          })
                          toast({
                            title: " OTP Resent",
                            description:
                              " OTP has been resent to your phone number.",
                            style: {
                              backgroundColor: "#4B0082",
                              color: "#fff",
                            },
                            duration: 2000,
                          })
                          dispatch(setLoadingFalse())
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
                        // Router.push("/verification/wrong-number")
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
      )}
    </>
  )
}
