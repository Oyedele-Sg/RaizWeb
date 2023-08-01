"use client"

import { AuthStepper } from "@/components"
import {
  AuthButton,
  BtnMain,
  PhoneNumberInput,
  RegisterInput,
  Stepper,
} from "@/shared"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React from "react"
import {
  useForm,
  FormProvider,
  FieldValues,
  FieldError,
  UseFormRegister,
} from "react-hook-form"

interface WrongNumberFormProps extends Partial<FieldValues> {
  phoneNumber: string
}

export default function WrongNumber() {
  const Router = useRouter()

  const methods = useForm<WrongNumberFormProps>({
    defaultValues: {
      phoneNumber: "",
    },
  })

  const onSubmit = async (data: WrongNumberFormProps) => {
    "login data", data
    Router.push("/verification/phone-number/verify-otp")
  }
  return (
    <div className=' max-w-[502px] mx-auto flex flex-col gap-12  '>
      <div>
        <AuthStepper activeStep={2} />
      </div>

      <div className=' flex flex-col gap-[80px] '>
        <div className=' text-center flex flex-col gap-2   '>
          <h1 className=' font-headline__large  font-semi-mid text-purple   '>
            {" "}
            Wrong Phone Number?
          </h1>
          <p className=' font-body__large text-neutral-90 '>
            Enter correct phone number to verify your account.
          </p>
        </div>

        <div className=' '>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className='flex flex-col gap-8'
            >
              <PhoneNumberInput
                name={`phoneNumber`}
                inputPlaceholder={`Phone Number`}
                rules={{
                  required: "Phone number is required",
                  minLength: {
                    value: 10,
                    message: "Invalid Phone Number must have  10 characters",
                  },
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Invalid phone number",
                  },
                }}
                label='Phone Number'
              />

              <div className=' flex items-center justify-center   '>
                <AuthButton btnStyle=' px-[101.5px] ' btnText={"Send Email"} />
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  )
}
