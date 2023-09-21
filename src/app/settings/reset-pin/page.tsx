"use client"
import { ContentWrap } from "@/components/settings"
import { toast } from "@/components/ui/use-toast"
import { userService } from "@/services"
import {
  AuthButton,
  Loading,
  TransactionPinFormInterface,
} from "@/shared"
import { setLoadingFalse, setLoadingTrue } from "@/shared/redux/features"
import { useAppDispatch } from "@/shared/redux/types"
import { Pin } from "lucide-react"
import { useRouter } from "next/navigation"
import React, { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import PinInput from "react-pin-input"

function page() {
  const Router = useRouter()
  const dispatch = useAppDispatch()

  const methods = useForm<TransactionPinFormInterface>({
    defaultValues: {
      transaction_pin: "",
    },
  })

  const onSubmit = async (data: TransactionPinFormInterface) => {
    if (!data.transaction_pin) {
      toast({
        title: "Transaction Pin is required",
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
      await userService.changeTransactionPin(data)
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
            style={{ display: "flex", justifyContent: "space-between" }}
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

          <div className=' flex gap-8 '>
            <AuthButton
              btnStyle='flex-1 w-full px-[42px] '
              btnText={"Change Transaction Pin"}
              type='submit'
            />
          </div>
        </form>
      </ContentWrap>
    </>
  )
}

export default page
