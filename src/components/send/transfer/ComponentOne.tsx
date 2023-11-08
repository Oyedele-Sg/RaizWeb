"use client"
import { userService } from "@/services"
import {
  AuthButton,
  BackBtnCircle,
  BtnMain,
  DebitTransferInterface,
  ExternalDebitTransferInterface,
  FormTitledContainer,
  IconRaizColored,
  IconScan,
  IconSearch,
  NextArrow,
  TransactionPinInterface,
  RegisterInput,
  SetupLayout,
  transactionPinSchema,
  createTransactionPinSchema,
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
import PinInput from "react-pin-input"
import { yupResolver } from "@hookform/resolvers/yup"
import { passwordHash } from "@/utils/helpers"

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
    mode: `onChange`,
  })

  const onSubmit = async (data: ExternalDebitTransferInterface) => {
    try {
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
          <IconRaizColored />

          <div className=' flex flex-col gap-3 '>
            <div className=''>
              <BackBtnCircle />
              <button title='next' className=''>
                <NextArrow />
              </button>
            </div>

            <FormTitledContainer title='Send Money' subtitle={"Bank Account"}>
              {!debitData && (
                <RecentAccountExternalComponent methods={methods} />
              )}

              {debitData ? (
                <Pin debitData={debitData} />
              ) : (
                <FormProvider {...methods}>
                  <form
                    action=''
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className=' flex flex-col gap-6 '
                  >
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
                      length={10}
                    />
                    <RegisterInput
                      name={`beneficiary_account_name`}
                      inputPlaceholder={`Beneficiary Account Name `}
                      rules={{
                        required: " Input Beneficiary account name ",
                      }}
                      disabled
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
  const methods = useForm<TransactionPinInterface>({
    defaultValues: {
      transaction_pin: "",
    },
    resolver: yupResolver(createTransactionPinSchema),
  })

  const onSubmit = async (data: TransactionPinInterface) => {
    if (!data.transaction_pin) {
      toast({
        title: "OTP is required",
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

    const transferData = {
      debit_transfer: debitData as ExternalDebitTransferInterface,
      transaction_pin: {
        ...data,
        transaction_pin: passwordHash(data.transaction_pin),
      },
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

  const handleInputChange = (value: string, index: number) => {
    methods.setValue("transaction_pin", value)
  }

  return (
    <>
      <div className=' '>
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
              btnText={"Confirm Transfer"}
              type='submit'
            />
          </div>
        </form>
      </div>
    </>
  )
}
