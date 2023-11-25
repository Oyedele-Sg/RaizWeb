"use client"
import { ContentWrap } from "@/components/settings"
import { toast } from "@/components/ui/use-toast"
import { userService } from "@/services"
import {
  AuthButton,
  Loading,
  RegisterInput,
  UpdateTransactionPinFormInterface,
  transactionPinSchema,
} from "@/shared"
import { setLoadingFalse, setLoadingTrue } from "@/shared/redux/features"
import { useAppDispatch } from "@/shared/redux/types"
import { passwordHash } from "@/utils/helpers"
import { yupResolver } from "@hookform/resolvers/yup"
import { Pin } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { useRef, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import PinInput from "react-pin-input"

function page() {
  const Router = useRouter()
  const dispatch = useAppDispatch()

  const [showOldPin, setShowOldPin] = useState<boolean>(false)
  const [showNewPin, setShowNewPin] = useState<boolean>(false)

  const methods = useForm<UpdateTransactionPinFormInterface>({
    defaultValues: {
      old_transaction_pin: "",
      new_transaction_pin: "",
    },
    resolver: yupResolver(transactionPinSchema),
  })

  const onSubmit = async (data: UpdateTransactionPinFormInterface) => {
    try {
      dispatch(setLoadingTrue())
      await userService.changeTransactionPin({
        ...data,
        new_transaction_pin: passwordHash(data.new_transaction_pin),
        old_transaction_pin: passwordHash(data.old_transaction_pin),
      })
      toast({
        title: "Done",
        description: `Transaction Pin Reset Successfully`,
        variant: "default",
        style: {
          backgroundColor: "#4B0082",
          color: "#fff",
          top: "20px",
          right: "20px",
        },
      })
      methods.reset()

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
      <ContentWrap title='Manage  PIN'>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className=' flex flex-col gap-8 '
          >
            <RegisterInput
              name={`old_transaction_pin`}
              inputPlaceholder={`Enter 4 digits long`}
              label='Old Transaction Pin'
              // childrenHandleClick={() => setShowOldPin((state) => !state)}
              type={"password"}
              length={4}
            >
              {/* <Image
                src={`/icons/${showOldPin ? "eye" : "eye-slash"}.svg`}
                alt='show password'
                width={24}
                height={24}
                className='password_field-input  '
              /> */}
            </RegisterInput>

            <RegisterInput
              name={`new_transaction_pin`}
              inputPlaceholder={`Enter 4 digits long`}
              label='New Transaction Pin'
              // childrenHandleClick={() => setShowNewPin((state) => !state)}
              type={"password"}
              length={4}
            >
              {/* <Image
                src={`/icons/${showNewPin ? "eye" : "eye-slash"}.svg`}
                alt='show password'
                width={24}
                height={24}
                className='password_field-input  '
              /> */}
            </RegisterInput>

            <div className=' flex gap-8 '>
              <AuthButton
                btnStyle='flex-1 w-full px-[42px] '
                btnText={"Change Transaction Pin"}
                type='submit'
              />
            </div>
          </form>
        </FormProvider>
      </ContentWrap>
    </>
  )
}

export default page
