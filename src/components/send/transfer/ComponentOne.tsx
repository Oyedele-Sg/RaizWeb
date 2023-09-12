"use client"
import { userService } from "@/services"
import {
  AuthButton,
  BackBtnCircle,
  BtnMain,
  DebitTransferInterface,
  ExternalDebitTransferInterface,
  FormTitledContainer,
  IconPesaColored,
  IconScan,
  IconSearch,
  NextArrow,
  OTPFormValues,
  RegisterInput,
  SetupLayout,
  UserSearchInterface,
} from "@/shared"
import React, { useEffect, useRef, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"

import { useAppDispatch } from "@/shared/redux/types"
import { setLoadingFalse, setLoadingTrue } from "@/shared/redux/features"
import { useRouter } from "next/navigation"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useCategory } from "@/hooks/category/useCategory"
import { toast } from "@/components/ui/use-toast"
import { banks } from "@/shared/data/Banks"
import { RecentAccountExternalComponent } from "../RecentAccountExternal"

export function ComponentOne() {
  const Router = useRouter()
  const [debitData, setDebitData] = useState<ExternalDebitTransferInterface>()
  const category = useCategory()
  const dispatch = useAppDispatch()

  const methods = useForm<ExternalDebitTransferInterface>({
    defaultValues: {
      beneficiary_account_name: "",
      beneficiary_account_number: "",
      transaction_amount: "",
      narration: "",
      beneficiary_bank_code: "",
      beneficiary_bank_name: "",
    },
  })

  const onSubmit = async (data: ExternalDebitTransferInterface) => {
    try {
      // const res = await userService.searchWallets(data.transaction_amount)+
      //   setSearchResults(res)
      setDebitData(data)
    } catch (error) {
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

  const doNIPAccountLookup = async (
    accountNumber: string,
    bankCode: string
  ) => {
    try {
      dispatch(setLoadingTrue())
      const res = await userService.nipAccountLookup(accountNumber, bankCode)

      methods.setValue("beneficiary_account_name", res.account_name)
      dispatch(setLoadingFalse())
    } catch (error) {
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
      dispatch(setLoadingFalse())
    }
  }

  useEffect(() => {
    if (
      methods.watch("beneficiary_bank_code") &&
      methods.watch("beneficiary_account_number").length === 10
    ) {
      doNIPAccountLookup(
        methods.watch("beneficiary_account_number"),
        methods.watch("beneficiary_bank_code")
      )
    }
  }, [
    methods.watch("beneficiary_bank_code"),
    methods.watch("beneficiary_account_number"),
  ])

  return (
    <div>
      <SetupLayout bg='bg-profile-1'>
        <div className=' mx-5 lg:mx-[72px] my-[72px] flex flex-col gap-[84px] '>
          <IconPesaColored />

          <div className=' flex flex-col gap-3 '>
            <div
              className=''
              // onClick={() => onNext()}
            >
              <BackBtnCircle />
              <button title='next' className=''>
                <NextArrow />
              </button>
            </div>

            <RecentAccountExternalComponent methods={methods} />

            <FormTitledContainer title='Send Money' subtitle={"Bank Account"}>
              {debitData ? (
                <Pin debitData={debitData} />
              ) : (
                <FormProvider {...methods}>
                  <form
                    action=''
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className=' flex flex-col gap-6 '
                  >
                    <RegisterInput
                      name={`beneficiary_account_name`}
                      inputPlaceholder={`Beneficiary Account Name `}
                      rules={{
                        required: " Input Beneficiary account name ",
                      }}
                      disabled
                    />
                    <RegisterInput
                      name={`beneficiary_account_number`}
                      inputPlaceholder={`Beneficiary Account Number `}
                      rules={{
                        required: "Input an account number",
                        pattern: {
                          value: /^\d{10}$/,
                          message: "Account number must be a 10-digit number",
                        },
                      }}
                    />
                    <RegisterInput
                      name={`transaction_amount`}
                      inputPlaceholder={`Enter Amount `}
                      rules={{
                        required: "Input an amount",
                        pattern: {
                          value: /^[0-9]*$/,
                          message: " Amount must be a number ",
                        },
                      }}
                    />
                    <RegisterInput
                      name={`narration`}
                      inputPlaceholder={`Transaction description `}
                    />
                    <Select
                      onValueChange={(value) => {
                        const selectedBank = banks.find(
                          (bank) => bank.bankName === value
                        )
                        // @ts-ignore
                        // methods.setValue("bank_name", selectedBank.bankName)
                        // @ts-ignore
                        methods.setValue(
                          "beneficiary_bank_code",
                          selectedBank?.bankCode as string
                        )
                        methods.setValue(
                          "beneficiary_bank_name",
                          selectedBank?.bankName as string
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
                        {banks.map((bank, index) => (
                          <SelectItem
                            key={parseInt(bank.bankCode)}
                            // @ts-ignore
                            value={bank.bankName}
                            className=' hover:bg-neutral-50 z-50 '
                           
                          >
                            {bank.bankName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className=' flex gap-12 '>
                      <AuthButton btnText='Continue' btnStyle=' w-full ' />
                    </div>
                  </form>
                </FormProvider>
              )}
            </FormTitledContainer>
          </div>
        </div>
      </SetupLayout>
    </div>
  )
}

interface PinProps {
  debitData?: ExternalDebitTransferInterface
}

function Pin({ debitData }: PinProps) {
  const dispatch = useAppDispatch()
  const Router = useRouter()
  const pinInputRefs = useRef<Array<HTMLInputElement | null>>([])
  const methods = useForm<OTPFormValues>({
    defaultValues: {
      otp: [{ otp1: "" }, { otp2: "" }, { otp3: "" }, { otp4: "" }],
    },
  })

  const onSubmit = async (data: OTPFormValues) => {
    const pin = {
      transaction_pin: `${data.otp1}${data.otp2}${data.otp3}${data.otp4}`,
    }

    if (!pin.transaction_pin) return

    const transferData = {
      debit_transfer: debitData as ExternalDebitTransferInterface,
      transaction_pin: pin,
    }

    try {
      dispatch(setLoadingTrue())
      await userService.externalTransfer(transferData)

      Router.push("/send/success")
      dispatch(setLoadingFalse())
    } catch (error) {
      dispatch(setLoadingFalse())
      if (error === "Insufficient funds") {
        Router.push("/send/failed")
      }

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

  const handleInputChange = (index: number) => {
    const currentValue = pinInputRefs.current[index]?.value
    const prevValue = pinInputRefs.current[index - 1]?.value

    if (currentValue && currentValue.length === 1) {
      if (index < pinInputRefs.current.length - 1) {
        pinInputRefs.current[index + 1]?.focus()
      } else {
        pinInputRefs.current[index]?.blur()
        // Submit OTP or perform the desired action here
      }
    } else if (!currentValue && prevValue) {
      pinInputRefs.current[index - 1]?.focus()
    }
  }
  return (
    <>
      <div className=' '>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className=' flex flex-col gap-8 '
        >
          <div className='flex gap-[33px] justify-between  '>
            {Array.from({ length: 4 }, (_, index) => (
              <input
                key={index}
                type='number'
                {...methods.register(`otp${index + 1}`, {
                  required: true,
                })}
                inputMode='numeric'
                maxLength={1}
                className={`form-input otp_field-input spin-button-none ${
                  methods.formState.errors[`otp${index + 1}`]
                    ? "otp_field-input_error"
                    : ""
                }`}
                ref={(ref) => {
                  pinInputRefs.current[index] = ref
                }}
                onChange={(event) => {
                  const { value } = event.target
                  methods.setValue(`otp${index + 1}`, value)
                  handleInputChange(index)
                }}
              />
            ))}
          </div>

          {(methods.formState.errors.otp1 ||
            methods.formState.errors.otp2 ||
            methods.formState.errors.otp3 ||
            methods.formState.errors.otp4) && (
            <span className=' text-center  text-error text-t-12  '>
              OTP is required and must be 4 digits
            </span>
          )}

          <div className=' flex gap-8 '>
            <AuthButton
              btnStyle='flex-1 w-full px-[42px] '
              btnText={"Confirm Transfer"}
              type='submit'
            />
          </div>
        </form>
      </div>
    </>
  )
}
