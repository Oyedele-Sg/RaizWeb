"use client"

import { Header, StepperComponent } from "@/components"
import { toast } from "@/components/ui/use-toast"
import { userService } from "@/services"
import {
  AuthButton,
  BtnMain,
  IconPesaColored,
  Loading,
  RegisterInput,
  SetupLayout,
  SkipLink,
  TransactionPinFormInterface,
  transactionPinSchema,
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
import PinInput from "react-pin-input"
import { yupResolver } from "@hookform/resolvers/yup"

interface UsernameInputProps extends Partial<FieldValues> {
  username: string
}

export default function TransactionPin() {
  const Router = useRouter()
  const dispatch = useAppDispatch()

  const pinInputRefs = useRef<Array<HTMLInputElement | null>>([])

  const methods = useForm<TransactionPinFormInterface>({
    defaultValues: {
      transaction_pin: "",
    },
    resolver: yupResolver(transactionPinSchema),
  })

  const onSubmit = async (data: TransactionPinFormInterface) => {
    if (!data.transaction_pin) {
      toast({
        title: "Transaction pin is required",
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
      await userService.addTransactionPin(data)

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

  const handleInputChange = (value: string, index: number) => {
    methods.setValue("transaction_pin", value)
  }
  return (
    <>
      <Loading />

      <SetupLayout bg='bg-profile-1'>
        <div className=' px-5 lg:px-[60px]  py-[50px] flex flex-col justify-center gap-[112px] '>
          <div className='flex justify-between items-center  '>
            <div className='hidden lg:block'>
              <IconPesaColored />
            </div>
            <SkipLink link='/profile/bank' />
          </div>
          <Header activeStep={1} />

          <div className=' bg-neutral-20 py-16 px-8 rounded-xl flex flex-col gap-[88px] '>
            <div className=''>
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

                  {methods.formState.errors.transaction_pin && (
                    <span className=' text-center  text-error text-t-12  '>
                      OTP is required and must be 4 digits
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
