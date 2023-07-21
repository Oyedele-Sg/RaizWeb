"use client"

import { InputContainer } from "@/components"
import { toast } from "@/components/ui/use-toast"
import { useUser } from "@/hooks/user/useUser"
import {
  AuthButton,
  BackArrow,
  FormTitledContainer,
  IconCopy,
  IconPesaColored,
  Loading,
  NextArrow,
  RegisterInput,
  SetupLayout,
  UserInterface,
} from "@/shared"
import { setLoadingFalse, setLoadingTrue } from "@/shared/redux/features"
import { useAppDispatch } from "@/shared/redux/types"
import { useRouter } from "next/navigation"
import React, { useEffect, useMemo } from "react"
import { FormProvider, useForm } from "react-hook-form"

interface TransferInputProps {
  bank_name: string
  account_number: string
  beneficiary_name: string
}

export default function page() {
  const Router = useRouter()
  const user = useUser() as UserInterface
  const dispatch = useAppDispatch()

  const methods = useForm<TransferInputProps>({
    values: {
      bank_name: `Providus Bank`,
      account_number: `${user?.wallets[0]?.account_number}`,
      beneficiary_name: `${user?.wallets[0]?.wallet_name}`,
    },
  })

  console.log("user", user)

  const onSubmit = async (data: TransferInputProps) => {
    console.log("login data", data)
    try {
      dispatch(setLoadingTrue())
      setTimeout(() => {
        toast({
          title: " Account created successfully",
          description:
            "User Wallet has been successfull credited with the amount you transferred ",
          style: {
            backgroundColor: "#4caf50",
            color: "#fff",
          },
        })
        Router.push("/dashboard")
      }, 3000)
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
      })
    }
  }

  // useEffect(() => {
  //   const wallet = user && user.wallets[0]
  //   const beneficiaryName = wallet?.wallet_name
  //   const bankName = "PROVIDUS BANK"
  //   const accountNumber = wallet?.account_number

  //   methods.setValue("beneficiary_name", beneficiaryName)
  //   methods.setValue("bank_name", bankName)
  //   methods.setValue("account_number", accountNumber)
  //   console.log("user EFFFECT", user)

  //   // if (user) {
  //   //   methods.setValue("beneficiary_name", `${user?.wallets[0].wallet_name}`)
  //   //   methods.setValue("bank_name", `PROVIDUS BANK`)
  //   //   methods.setValue("account_number", `${user?.wallets[0].account_number}`)
  //   // }
  // }, [user])

  return (
    <>
      <Loading />
      <div>
        <SetupLayout bg='bg-profile-1'>
          <div className=' m-[72px] flex flex-col gap-[84px] '>
            <IconPesaColored />

            <div className=' flex flex-col gap-3 '>
              <div className=''>
                <button className=''>
                  <BackArrow />
                </button>
                <button className=''>
                  <NextArrow />
                </button>
              </div>

              <FormTitledContainer
                title='Bank Transfer'
                subtitle='Add funds to wallets'
              >
                <FormProvider {...methods}>
                  <form
                    action=''
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className=' flex flex-col gap-6 '
                  >
                    <RegisterInput
                      name={`account_number`}
                      inputPlaceholder={`Type a bank`}
                      rules={{
                        required: "Input a bank name",
                      }}
                      label='Account number'
                      children={<IconCopy />}
                      disabled
                    />
                    <RegisterInput
                      name={`beneficiary_name`}
                      inputPlaceholder={`Type a bank`}
                      rules={{
                        required: "Input a bank name",
                      }}
                      label='Beneficiary name'
                      children={<IconCopy />}
                      disabled
                    />

                    <RegisterInput
                      name={`bank_name`}
                      inputPlaceholder={`Type a bank`}
                      rules={{
                        required: "Input a bank name",
                      }}
                      label='Bank name'
                      children={<IconCopy />}
                      disabled
                    />

                    <AuthButton btnText=' I have made this transfer ' />
                  </form>
                </FormProvider>
              </FormTitledContainer>
            </div>
          </div>
        </SetupLayout>
      </div>
    </>
  )
}
