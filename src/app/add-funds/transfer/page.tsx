"use client"

import { InputContainer } from "@/components"
import { useUser } from "@/hooks/user/useUser"
import {
  AuthButton,
  BackArrow,
  FormTitledContainer,
  IconCopy,
  IconPesaColored,
  NextArrow,
  RegisterInput,
  SetupLayout,
} from "@/shared"
import { useRouter } from "next/navigation"
import React from "react"
import { FormProvider, useForm } from "react-hook-form"

interface TransferInputProps {
  bank_name: string
  account_number: string
  beneficiary_name: string
}

export default function page() {
  const Router = useRouter()
  const user = useUser()

  const methods = useForm<TransferInputProps>({
    defaultValues: {
      bank_name: `${user?.withdrawal_accounts[0].withdrawal_account_name}`,
      account_number: `${user?.withdrawal_accounts[0].withdrawal_account_number}`,
      beneficiary_name: "",
    },
  })

  const onSubmit = async (data: TransferInputProps) => {
    console.log("login data", data)
    Router.push("/profile-setup/bank/success")
  }

  return (
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
                    name={`bank_name`}
                    inputPlaceholder={`Type a bank`}
                    rules={{
                      required: "Input a bank name",
                    }}
                    label='Bank name'
                    children={<IconCopy />}
                    disabled
                  />
                  <RegisterInput
                    name={` beneficiary_name `}
                    inputPlaceholder={`Beneficiary name`}
                    rules={{
                      required: "Input a bank name",
                    }}
                    label='Beneficiary'
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
  )
}
