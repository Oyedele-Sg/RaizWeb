"use client"

import { Header, StepperComponent } from "@/components"
import { toast } from "@/components/ui/use-toast"
import { userService } from "@/services"
import {
  AuthButton,
  BtnMain,
  Loading,
  OTPFormValues,
  RegisterInput,
  SetupLayout,
  SkipLink,
} from "@/shared"
import { setLoadingFalse, setLoadingTrue } from "@/shared/redux/features"
import { useAppDispatch } from "@/shared/redux/types"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

import {
  useForm,
  FormProvider,
  FieldValues,
  FieldError,
  UseFormRegister,
} from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useUser } from "@/hooks/user/useUser"

interface UsernameInputProps extends Partial<FieldValues> {
  username: string
}

export default function TransactionPin() {
  const Router = useRouter()
  const dispatch = useAppDispatch()

  const pinInputRefs = useRef<Array<HTMLInputElement | null>>([])
  const OTPPreference =
    typeof sessionStorage !== "undefined"
      ? sessionStorage.getItem("pesaOTP")
      : null
  const user = useUser()

  const methods = useForm<OTPFormValues>({
    defaultValues: {
      otp: [{ otp1: "" }, { otp2: "" }, { otp3: "" }, { otp4: "" }],
    },
  })

  const onSubmit = async (data: OTPFormValues) => {
    const pin = {
      transaction_pin: `${data.otp1}${data.otp2}${data.otp3}${data.otp4}`,
    }

    if (!pin.transaction_pin) return

    try {
      dispatch(setLoadingTrue())
      await userService.addTransactionPin(pin)

    
      Router.push("/profile/bank")
      dispatch(setLoadingFalse())
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
  }

  const handleInputChange = (index: number) => {
    const currentValue = pinInputRefs.current[index]?.value
    const prevValue = pinInputRefs.current[index - 1]?.value

    if (currentValue && currentValue.length === 1) {
      if (index < pinInputRefs.current.length - 1) {
        pinInputRefs.current[index + 1]?.focus()
      } else {
        pinInputRefs.current[index]?.blur()
        // Submit OTP or perform the desired action here
      }
    } else if (!currentValue && prevValue) {
      pinInputRefs.current[index - 1]?.focus()
    }
  }

  return (
    <>
      <Loading />

      <SetupLayout bg='bg-profile-1'>
        <div className=' px-5 lg:px-[60px]  py-[50px] flex flex-col justify-center gap-[112px] '>
          <SkipLink link='/profile/bank' />
          <Header activeStep={1} />

          <div className=' bg-neutral-20 py-16 px-8 rounded-xl flex flex-col gap-[88px] '>
            <div className=''>
              <div>
                <form
                  onSubmit={methods.handleSubmit(onSubmit)}
                  className=' flex flex-col gap-8 '
                >
                  <div className='flex gap-[33px] justify-between  '>
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
                          pinInputRefs.current[index] = ref
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
                      Pin is required and must be 4 digits
                    </span>
                  )}

                  <div className=' flex gap-8 '>
                    <AuthButton
                      btnStyle='flex-1 w-full px-[42px] '
                      btnText={"Create Transaction Pin"}
                      type='submit'
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </SetupLayout>
    </>
  )
}
