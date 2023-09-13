"use client"

import { AuthStepper } from "@/components"
import { toast } from "@/components/ui/use-toast"
import { userService } from "@/services"
import {
  AuthButton,
  BtnMain,
  Loading,
  PhoneNumberInput,
  RegisterInput,
  Stepper,
  WhiteWrap,
} from "@/shared"
import { setLoadingFalse, setLoadingTrue } from "@/shared/redux/features"
import { useAppDispatch } from "@/shared/redux/types"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import {
  useForm,
  FormProvider,
  FieldValues,
  FieldError,
  UseFormRegister,
} from "react-hook-form"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useUser } from "@/hooks/user/useUser"

interface PhoneNumberFormProps extends Partial<FieldValues> {
  phone_number: string
}

export default function PhoneNumber() {
  const Router = useRouter()
  const methods = useForm<PhoneNumberFormProps>({
    defaultValues: {
      phone_number: "",
    },
  })
  const dispatch = useAppDispatch()
  const user = useUser()


  const [selectedOption, setSelectedOption] = useState("phone")

  const handleRadioChange = (value: string) => {
    const selectedValue = value
    setSelectedOption(selectedValue)

    // Update sessionStorage based on the selected value
    sessionStorage.setItem("pesaOTP", selectedValue)
  }

  const onSubmit = async (data: PhoneNumberFormProps) => {
    const selectedMedia = sessionStorage.getItem("pesaOTP")
    

    try {
      dispatch(setLoadingTrue())
      const response = await userService.addPhoneToUser({
        phone_number: `+234${data.phone_number}`,
        medium: selectedMedia === "phone" ? "sms" : (selectedMedia as string),
      })
      toast({
        title: "Phone number added successful",
        description: " ",
        style: {
          backgroundColor: "#4B0082",
          color: "#fff",
        },
      })
      dispatch(setLoadingFalse())
      methods.reset()
      Router.push("/verification/verify-number")
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

  useEffect(() => {
    sessionStorage.setItem("pesaOTP", "phone")
  }, [])

  return (
    <>
      <Loading />

      <WhiteWrap
        extraStyle=' h-screen lg:h-full w-full   flex items-center justify-center'
        closeBtn
        closeLink=' /dashboard '
      >
        <div className=' min-w-[375px] w-full  flex flex-col gap-12  '>
          <div>
            <AuthStepper activeStep={1} />
          </div>

          <div className=' flex flex-col gap-[56px] '>
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
                  {" "}
                  Enter Phone Number
                </h1>
                <p className=' font-body__large text-neutral-90 '>
                  Enter phone number to verify your account.
                </p>
              </div>
            </div>

            <div className=' '>
              <FormProvider {...methods}>
                <form
                  onSubmit={methods.handleSubmit(onSubmit)}
                  className='flex flex-col gap-8'
                >
                  <PhoneNumberInput
                    name={`phone_number`}
                    inputPlaceholder={`8034 567 890`}
                    rules={{
                      required: "Phone number is required",
                      minLength: {
                        value: 10,
                        message: "Invalid Phone Number must be 10 characters",
                      },
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Invalid phone number",
                      },
                    }}
                    label='Phone Number'
                  />

                  <RadioGroup
                    defaultValue={`phone`}
                    className='text-purple'
                    onValueChange={handleRadioChange}
                  >
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='phone' id='phone' />
                      <label htmlFor='phone'>SMS OTP</label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='voice' id='voice' />
                      <label htmlFor='voice'>Voice OTP</label>
                    </div>
                  </RadioGroup>
                  <div className=' flex items-center justify-center   '>
                    <AuthButton
                      btnStyle=' px-[101.5px] '
                      btnText={"Send OTP"}
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
