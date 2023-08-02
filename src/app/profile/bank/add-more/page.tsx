"use client"

import {
  AddBankSuccess,
  Header,
  InputContainer,
  StepperComponent,
} from "@/components"
import { BtnMain, IconSavedList, RegisterInput, SetupLayout } from "@/shared"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

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
import { useState } from "react"
import AddBankForm from "@/components/profile-setup/AddBankForm"

interface BankInputProps extends Partial<FieldValues> {
  bank_name: string
  account_number: string
}
// create an array of 6 strings with the word 'pesa' in different variations
const pesa = ["pesa", "Pesa", "PESA", "pEsa", "peSa", "pesA"]

export default function Username() {
  const Router = useRouter()
  const methods = useForm<BankInputProps>({
    defaultValues: {
      bank_name: "",
      account_name: "",
    },
  })

  const [success, setSuccess] = useState(false)

  const onSubmit = async (data: BankInputProps) => {
    Router.push("/profile-setup/bank/success")
  }
  return (
    <SetupLayout bg='bg-profile-1'>
      <div className=' px-[60px]  pt-[50px] flex flex-col gap-[70px] '>
        <div className=' w-full flex items-end justify-end  '>
          {" "}
          <Link className=' font-body__medium text-neutral-80  ' href={``}>
            Skip
          </Link>{" "}
        </div>
        <Header activeStep={3} />

        {!success ? (
          <AddBankForm setSuccess={setSuccess} add />
        ) : (
          <AddBankSuccess
            addFunc={() => setSuccess(false)}
            cancelFunc={() => {}}
          />
        )}
      </div>
    </SetupLayout>
  )
}
