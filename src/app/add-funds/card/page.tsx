"use client"
import { InputContainer } from "@/components"
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

interface TransferInputProps {
  bank_name: string
  amount: string
  beneficiary_name: string
}

export default function page() {
  const Router = useRouter()
  const methods = useForm<TransferInputProps>({
    defaultValues: {
      bank_name: "",
      amount: "",
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
              title='Debit Card'
              subtitle='Add funds to wallets'
            >
              <FormProvider {...methods}>
                <form
                  action=''
                  onSubmit={methods.handleSubmit(onSubmit)}
                  className=' flex flex-col gap-6 '
                >
                  <RegisterInput
                    name={`amount`}
                    inputPlaceholder={`Type the amount`}
                    rules={{
                      required: "Enter an amount",
                    }}
                    label='Amount'
                    children={<IconCopy />}
                  />

                  <RegisterInput
                    name={`bank_name`}
                    inputPlaceholder={`Type a bank`}
                    rules={{
                      required: "Input a bank name",
                    }}
                    label='Bank name'
                    children={<IconCopy />}
                  />
                  <RegisterInput
                    name={` beneficiary_name `}
                    inputPlaceholder={`Beneficiary name`}
                    rules={{
                      required: "Input a bank name",
                    }}
                    label='Beneficiary'
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
