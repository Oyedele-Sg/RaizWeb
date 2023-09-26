"use client"
import { InputContainer } from "@/components"
import { toast } from "@/components/ui/use-toast"

import {
  AuthButton,
  BackArrow,
  BackBtnCircle,
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
import React, { useContext, useEffect, useMemo } from "react"
import { FormProvider, useForm } from "react-hook-form"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { CurrentUserContext } from "@/providers/CurrentUserProvider"

interface TransferInputProps {
  bank_name: string
  account_number: string
  beneficiary_name: string
}

export default function page() {
  const Router = useRouter()
  const { currentUser } = useContext(CurrentUserContext)
  const dispatch = useAppDispatch()

  if (!currentUser) {
    dispatch(setLoadingTrue())
  } else {
    dispatch(setLoadingFalse())
  }

  const methods = useForm<TransferInputProps>({
    values: {
      bank_name: `Providus Bank`,
      account_number: `${currentUser?.wallets[0]?.account_number}`,
      beneficiary_name: `${currentUser?.wallets[0]?.wallet_name}`,
    },
  })

  const onSubmit = async (data: TransferInputProps) => {
    dispatch(setLoadingTrue())

    try {
      dispatch(setLoadingFalse())
      Router.push("/add-funds/transfer/success")
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
    <>
      <Loading />
      <div>
        <SetupLayout bg='bg-profile-1'>
          <div className='mx-5 lg:m-[72px] flex flex-col gap-[84px] '>
            <div className='ml-5 pt-[72px] lg:pt-0 lg:ml-0 '>
              <IconPesaColored />
            </div>

            <div className=' flex flex-col gap-3 '>
              <div className=''>
                <BackBtnCircle />
                <button title='next' className=''>
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
                      children={
                        <CopyComponent
                          value={
                            currentUser?.wallets[0]?.account_number as string
                          }
                        />
                      }
                      disabled
                    />
                    <RegisterInput
                      name={`beneficiary_name`}
                      inputPlaceholder={`Type a bank`}
                      rules={{
                        required: "Input a bank name",
                      }}
                      label='Beneficiary name'
                      children={
                        <CopyComponent
                          value={currentUser?.wallets[0]?.wallet_name as string}
                        />
                      }
                      disabled
                    />

                    <RegisterInput
                      name={`bank_name`}
                      inputPlaceholder={`Type a bank`}
                      rules={{
                        required: "Input a bank name",
                      }}
                      label='Bank name'
                      children={<CopyComponent value='Providus Bank' />}
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

interface CopyComponentProps {
  value: string
}

function CopyComponent({ value }: CopyComponentProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className=' '
            onClick={() =>
              navigator.clipboard.writeText(value).then(() => {
                toast({
                  title: "Copied to Clipboard",

                  style: {
                    backgroundColor: "#7E6298",
                    color: "#fff",
                  },
                })
              })
            }
          >
            <IconCopy />
          </div>
        </TooltipTrigger>
        <TooltipContent className=' text-neutral-70 bg-neutral-30  '>
          <p>Copy to clipboard </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
