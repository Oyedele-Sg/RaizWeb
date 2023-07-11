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
} from "@/shared"
import { setLoadingFalse, setLoadingTrue } from "@/shared/redux/features"
import { useAppDispatch } from "@/shared/redux/types"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import {
  useForm,
  FormProvider,
  FieldValues,
  FieldError,
  UseFormRegister,
} from "react-hook-form"

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

  const onSubmit = async (data: PhoneNumberFormProps) => {
    console.log("login data", data)
    try {
      dispatch(setLoadingTrue())
      const response = await userService.addPhoneToUser({
        phone_number: `+234${data.phone_number}`,
      })
      console.log("response", response)
      //   await userService.
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

    // Router.push('/verification/phone-number/verify-otp')
  }
  return (
    <>
      <Loading />
      <div className=' max-w-[502px] mx-auto flex flex-col gap-12  '>
        <div>
          <AuthStepper activeStep={1} />
        </div>

        <div className=' flex flex-col gap-[56px] '>
          <div className=' text-center flex flex-col gap-2   '>
            <h1 className=' font-headline__large  font-semi-mid text-purple   '>
              {" "}
              Enter Phone Number
            </h1>
            <p className=' font-body__large text-neutral-90 '>
              Enter phone number to verify your account.
            </p>
          </div>

          <div className=' '>
            <FormProvider {...methods}>
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className='flex flex-col gap-8'
              >
                <PhoneNumberInput
                  name={`phone_number`}
                  inputPlaceholder={`Phone Number`}
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
                <div className=' flex items-center justify-center   '>
                  <AuthButton
                    btnStyle=' px-[101.5px] '
                    className='  '
                    btnText={"Send OTP"}
                  />
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </>
  )
}
