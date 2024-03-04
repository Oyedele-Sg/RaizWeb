"use client"
import { useAppDispatch } from "@/shared/redux/types"
import { useParams, useRouter } from "next/navigation"
import React from "react"
import { ContentWrap } from "@/components/savings/ContentWrap"
import PinInput from "react-pin-input"
import {
  AuthButton,
  BtnMain,
  Loading,
  TransactionPinFormInterface,
  createTransactionPinSchema,
} from "@/shared"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { toast } from "@/components/ui/use-toast"
import { setLoadingFalse, setLoadingTrue } from "@/shared/redux/features"
import { passwordHash } from "@/utils/helpers"
import { userService } from "@/services"

function page() {
  const Router = useRouter()
  const dispatch = useAppDispatch()
  const Params = useParams()
  const handlenavigation = () => {
    Router.push(`/savings/lock-savings/${Params.savingsID}/details`)
  }

  const methods = useForm<TransactionPinFormInterface>({
    defaultValues: {
      transaction_pin: "",
    },
    resolver: yupResolver(createTransactionPinSchema),
  })

  const handleInputChange = (value: string, index: number) => {
    methods.setValue("transaction_pin", value)
  }

  const onSubmit = async (data: TransactionPinFormInterface) => {
    if (!data.transaction_pin) {
      toast({
        title: "Transaction pin is required",
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

    try {
      dispatch(setLoadingTrue())
      await userService.earlyWithdrawalLockSavings(
        {
          ...data,
          transaction_pin: passwordHash(data.transaction_pin),
        },
        Params.savingsID as string
      )

      toast({
        title: "Withdrawal Successful",

        variant: "destructive",
        style: {
          backgroundColor: "#3b82f6",
          color: "#fff",
          top: "20px",
          right: "20px",
        },
      })

      Router.push(`/savings/lock-savings/${Params.savingsID}/details`)
      dispatch(setLoadingFalse())
    } catch (error) {
      dispatch(setLoadingFalse())

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
  return (
    <>
      <Loading />
      <ContentWrap handleNavigation={handlenavigation}>
        <div className='flex flex-col gap-9'>
          <div className=''>
            <h1 className='  font-display__medium text-purple capitalize '>
              Withdrawal
            </h1>
            <p className=' text-neutral-70 font-title__large '>
              Transaction Pin
            </p>
          </div>
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
              <BtnMain
                btnStyle='w-full text-center text-grey  btn-gradient-savings '
                btnText={"WithDraw"}
                type='submit'
              />
            </div>
          </form>
        </div>
      </ContentWrap>
    </>
  )
}

export default page
