"use client"
import {
  AuthButton,
  BackArrow,
  FormTitledContainer,
  IconCopy,
  IconRaizColored,
  NextArrow,
  RegisterInput,
  SetupLayout,
} from "@/shared"
import { useRouter } from "next/navigation"
import React, { useContext } from "react"
import { FormProvider, useForm } from "react-hook-form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CurrentUserContext } from "@/providers/CurrentUserProvider"

interface TransferInputProps {
  bank_name: string
  amount: string
  beneficiary_name: string
}

export default function page() {
  const Router = useRouter()
  const { currentUser } = useContext(CurrentUserContext)
  const methods = useForm<TransferInputProps>({
    defaultValues: {
      bank_name: "",
      amount: "",
      beneficiary_name: "",
    },
  })

  const onSubmit = async (data: TransferInputProps) => {
    Router.push("/add-funds/direct-transfer/otp-1")
  }

  return (
    <div>
      <SetupLayout bg='bg-profile-1'>
        <div className=' m-[72px] flex flex-col gap-[84px] '>
          <IconRaizColored />

          <div className=' flex flex-col gap-3 '>
            <div className='flex items-center gap-3 '>
              <button className=''>
                <BackArrow />
              </button>
              <button className=''>
                <NextArrow />
              </button>
            </div>

            <FormTitledContainer
              title='Direct transfer'
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
                    // rules={{
                    //   required: "Enter an amount",
                    // }}
                    label='Amount'
                    // children={<IconCopy />}
                  />
                  <Select
                    onValueChange={(value) => {
                      console.log(value)
                    }}
                  >
                    <SelectTrigger className=' border-t-0 border-l-0 border-r-0 border-b border-b-purple  rounded-none text-neutral-100'>
                      <SelectValue
                        placeholder='Select Bank'
                        className='text-neutral-100'
                      />
                    </SelectTrigger>
                    <SelectContent className='bg-neutral-20 text-neutral-90 h-[200px] overflow-auto  '>
                      {currentUser?.withdrawal_accounts.map((item) => (
                        <SelectItem
                          key={item.withdrawal_account_id}
                          value={item.withdrawal_account_id}
                          className='hover:bg-neutral-50'
                        >
                          {item.withdrawal_account_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* <RegisterInput
                    name={`bank_name`}
                    inputPlaceholder={`Type a bank`}
                    // rules={{
                    //   required: "Input a bank name",
                    // }}
                    label='Bank name'
                    // children={<IconCopy />}
                  /> */}
                  <RegisterInput
                    name={` beneficiary_name `}
                    inputPlaceholder={`DD/MM/YYYY`}
                    // rules={{
                    //   required: "Input a bank name",
                    // }}
                    label='Date of Birth'
                  />
                  <AuthButton btnText=' Proceed ' />
                </form>
              </FormProvider>
            </FormTitledContainer>
          </div>
        </div>
      </SetupLayout>
    </div>
  )
}
