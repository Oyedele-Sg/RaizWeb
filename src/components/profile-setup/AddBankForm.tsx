import React, { useEffect } from "react"
import {
  useForm,
  FormProvider,
  FieldValues,
  FieldError,
  UseFormRegister,
} from "react-hook-form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useAppDispatch } from "@/shared/redux/types"
import { toast } from "@/components/ui/use-toast"
import { setLoadingFalse, setLoadingTrue } from "@/shared/redux/features"
import { banks } from "@/shared/data/Banks"
import { userService } from "@/services"
import { BtnMain, IconSavedList, RegisterInput } from "@/shared"
import { SearchSelect, SearchSelectItem } from "@tremor/react"
import { useBank } from "@/hooks/banks/useBank"

export interface BankInputProps extends Partial<FieldValues> {
  bank_name: string
  account_number: string
  bank_code: string
}

interface Prop {
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>
  add?: boolean
}

export const AddBankForm = ({ setSuccess, add }: Prop) => {
  const dispatch = useAppDispatch()

  const methods = useForm<BankInputProps>({
    defaultValues: {
      account_number: "",
      bank_code: "",
      bank_name: "",
      account_name: "",
    },
  })

  // const { banks } = useBank() || { banks: [] }

  const doNIPAccountLookup = async (
    accountNumber: string,
    bankCode: string
  ) => {
    try {
      dispatch(setLoadingTrue())
      const res = await userService.nipAccountLookup(accountNumber, bankCode)
      methods.setValue("account_name", res.account_name)

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
      methods.watch("bank_code") &&
      methods.watch("account_number").length === 10
    ) {
      doNIPAccountLookup(
        methods.watch("account_number"),
        methods.watch("bank_code")
      )
    }
  }, [methods.watch("account_number")])

  const onSubmit = async (data: BankInputProps) => {
    if (data.bank_name === "" || data.bank_code === "") {
      toast({
        title: "Something Went Wrong",
        description: `Pick a bank`,
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

    const newData = {
      bank_name: data.bank_name,
      account_number: data.account_number,
      bank_code: data.bank_code,
    }

    try {
      dispatch(setLoadingTrue())
      await userService.addBank(newData)
      toast({
        title: " Account created successfully",
        description:
          "We've created your account for you. Lets verify your email ",
        style: {
          backgroundColor: "#4B0082",
          color: "#fff",
        },
      })
      dispatch(setLoadingFalse())
      setSuccess(true)
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

  return (
    <div className=' flex  flex-col gap-3'>
      <div className=' flex justify-between items-center'>
        <h2 className='pl-3 font-body__large  text-purple font-semi-mid text-[18px]   '>
          Add Traditional Bank Number
        </h2>
        {add && (
          <div className='flex items-center gap-1 '>
            <IconSavedList />
            <span className=' text-[16px] leading-[20px] text-purple   '>
              {" "}
              Saved List{" "}
            </span>
          </div>
        )}
      </div>
      <div className=' bg-neutral-20 py-16 px-8 rounded-xl'>
        <div className=''>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className=' flex flex-col gap-8 items-center  '
            >
              <SearchSelect
                placeholder='Select Bank'
                className=''
                onValueChange={(value) => {
                  const selectedBank = banks.find(
                    (bank) => bank.bankCode === value
                  )

                  // @ts-ignore
                  methods.setValue("bank_name", selectedBank.bankName)
                  // @ts-ignore
                  methods.setValue("bank_code", selectedBank.bankCode)
                }}
              >
                {banks.map((bank, index) => (
                  <SearchSelectItem
                    value={bank.bankCode}
                    key={index}
                    className=' select-item-reset  '
                  >
                    <span className=' text-purple  '>{`${bank.bankName}`}</span>
                    {"         "}
                  </SearchSelectItem>
                ))}
              </SearchSelect>

              <RegisterInput
                name={`account_number`}
                inputPlaceholder={` Enter account number  `}
                rules={{
                  required: "Input an account number",
                  pattern: {
                    value: /^\d{10}$/,
                    message: "Account number must be a 10-digit number",
                  },
                }}
                label='Account number'
                length={10}
              />

              <RegisterInput
                name={`account_name`}
                inputPlaceholder={` Account Name  `}
                label='Account name'
                disabled
              />

              <BtnMain
                btnText='Add Account'
                btnStyle=' bg-purple text-grey font-body__medium text-[18px]  w-[200px] h-[50px]  rounded-[8px] '
              />
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  )
}

export default AddBankForm

{
  /* <Select
                onValueChange={(value) => {
                  const selectedBank = banks.find(
                    (bank) => bank.bankName === value
                  )
                  // @ts-ignore
                  methods.setValue("bank_name", selectedBank.bankName)
                  // @ts-ignore
                  methods.setValue("bank_code", selectedBank.bankCode)
                }}
              >
                <SelectTrigger className='w-full  border-purple border-[1px] '>
                  <SelectValue
                    placeholder='Select A bank '
                    className=' text-purple   '
                  />
                </SelectTrigger>
                <SelectContent className=' bg-neutral-20 text-neutral-90 h-[200px] overflow-auto '>
                  {banks.map((bank, index) => (
                    <SelectItem
                      key={parseInt(bank.bankCode)}
                      // @ts-ignore
                      value={bank.bankName}
                      className=' hover:bg-neutral-50'
                      onClick={(value) => {
                        methods.setValue("bank_name", bank.bankName)
                        methods.setValue("bank_code", bank.bankCode)
                      }}
                    >
                      {bank.bankName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select> */
}

{
  /* {(!methods.watch("bank_name") ||
                    !methods.watch("bank_code")) && (
                    <span className='error-message'>Pick a bank</span>
                  )} */
}
