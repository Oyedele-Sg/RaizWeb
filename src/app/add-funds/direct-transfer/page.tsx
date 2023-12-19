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
  PayStackBankDetailInterface,
  ChargeBankInterface,
} from "@/shared"
import { userService } from "@/services"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/shared/redux/types"
import { setLoadingFalse, setLoadingTrue } from "@/shared/redux/features"
import React, { useState, useEffect, useContext } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { CurrentUserContext } from "@/providers/CurrentUserProvider"
import { removeDuplicates, toastMessage } from "@/utils/helpers"

interface InitiateChargeInputProps {
  email: string
  amount: number
  bank: ChargeBankInterface
  birthday: string
  reference: string
  account_name: string
}

export default function page() {
  const Router = useRouter()
  const { currentUser } = useContext(CurrentUserContext)
  const methods = useForm<InitiateChargeInputProps>({
    defaultValues: {
      email: "",
      amount: 0,
      bank: {
        code: "",
        account_number: "",
      },
      birthday: "",
      reference: "",
      account_name: "",
    },
  })
  const dispatch = useAppDispatch()
  const [banks, setBanks] = useState<PayStackBankDetailInterface[]>()
  const [accountVerified, setAccountVerified] = useState(false)

  const getPaystackBanks = async () => {
    try {
      const res = await userService.getPaystackBanks()
      setBanks(removeDuplicates(res.data))
    } catch (error) {
      toastMessage("Error loading banks...", `${error}`)
      dispatch(setLoadingFalse())
    }
  }

  const payStackAccountLookup = async (
    account_number: string,
    bank_code: string
  ) => {
    try {
      dispatch(setLoadingTrue())
      const res = await userService.payStackAccountLookup(
        account_number,
        bank_code
      )
      //come back and remove test
      if (
        (res.status &&
          res.data.account_name ===
            `${currentUser?.last_name} ${currentUser?.first_name}`) ||
        res.data.account_name === "Test"
      ) {
        methods.setValue("account_name", res.data.account_name)
        setAccountVerified(true)
      } else {
        toastMessage(
          "Invalid Withdrawal Account...",
          `You can only make direct transfer from an account owned by you`
        )
        setAccountVerified(false)
      }
      dispatch(setLoadingFalse())
    } catch (error) {
      toastMessage("Error verifying account details...", `${error}`)
      dispatch(setLoadingFalse())
    }
  }

  const isValidDate = (inputDate: string) => {
    const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/
    return dateRegex.test(inputDate)
  }

  const onSubmit = async (data: InitiateChargeInputProps) => {
    data.email = currentUser?.email || ""
    const { email, amount, bank, birthday, reference } = data
    const chargeData = { amount, email, bank }
    const birthdayChargeData = { birthday, reference }
    dispatch(setLoadingTrue())
    if (accountVerified) {
      if (isValidDate(data?.birthday)) {
        const chargeResponse = await userService.initiateCreditWithdrawalCharge(
          {
            ...chargeData,
          }
        )
        if (chargeResponse.status) {
          birthdayChargeData.reference = chargeResponse.data.reference
          const birthdayCharge = await userService.initiateBirthdayCharge({
            ...birthdayChargeData,
          })
          if (birthdayCharge.status) {
            toastMessage("Enter OTP", birthdayCharge.data.display_text, true)
            Router.push(
              `/add-funds/direct-transfer/otp-1?creference=${birthdayCharge.data.reference}`
            )
          } else {
            toastMessage("Unable to transfer", birthdayCharge.message)
          }
        } else {
          toastMessage(
            "Unable to initiate transfer...",
            `${chargeResponse.message}`
          )
        }
      } else {
        toastMessage(
          "Invalid Date of Birth...",
          `Enter a valid Date of Birth in this format 'YYYY-MM-DD'`
        )
      }
    }
    dispatch(setLoadingFalse())
  }

  useEffect(() => {
    if (
      methods.watch("bank.code") &&
      methods.watch("bank.account_number").length === 10
    ) {
      payStackAccountLookup(
        methods.watch("bank.account_number"),
        methods.watch("bank.code")
      )
    }
  }, [methods.watch("bank.account_number"), methods.watch("bank.code")])

  useEffect(() => {
    getPaystackBanks()
  }, [methods.watch("bank.code")])

  return (
    <div>
      <SetupLayout bg='bg-profile-1'>
        <div className=' m-[72px] flex flex-col gap-[84px] '>
          <IconRaizColored />

          <div className=' flex flex-col gap-3 '>
            <div className='flex items-center gap-3 '>
              <button className='' onClick={() => Router.back()}>
                <BackArrow />
              </button>
              <button className=''>
                <NextArrow />
              </button>
            </div>

            <FormTitledContainer
              title='Direct Transfer'
              subtitle='Add funds to wallets directly from external bank account'
            >
              <FormProvider {...methods}>
                <form
                  action=''
                  onSubmit={methods.handleSubmit(onSubmit)}
                  className=' flex flex-col gap-6 '
                >
                  <RegisterInput
                    name={`amount`}
                    inputPlaceholder={`Enter amount`}
                    label='Amount'
                    type='number'
                  />
                  <Select
                    onValueChange={(value) => {
                      const selectedBank = banks?.find(
                        (bank) => bank.name === value
                      )
                      methods.setValue(
                        "bank.code",
                        selectedBank?.code as string
                      )
                    }}
                  >
                    <SelectTrigger className='w-full outline-none rounded-none border-b-purple border-[1px] border-t-0 border-x-0  input_field-input capitalize  z-50 '>
                      <SelectValue
                        placeholder='Select A bank '
                        className='   '
                      />
                    </SelectTrigger>
                    <SelectContent className=' bg-neutral-20 text-neutral-90 h-[200px] overflow-auto z-50 '>
                      {banks?.map((bank, index) => (
                        <SelectItem
                          key={index}
                          value={bank.name}
                          className=' hover:bg-neutral-50 z-50 '
                        >
                          {bank.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <RegisterInput
                    name={`bank.account_number`}
                    inputPlaceholder={`Enter Your Account Number `}
                    label='Account Number'
                    length={10}
                  />
                  <RegisterInput
                    name={`account_name`}
                    inputPlaceholder={`Account Name `}
                    rules={{
                      required: " Input account name ",
                    }}
                    max={10}
                    disabled
                  />
                  <RegisterInput
                    name={`birthday`}
                    inputPlaceholder={`YYYY-MM-DD`}
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
