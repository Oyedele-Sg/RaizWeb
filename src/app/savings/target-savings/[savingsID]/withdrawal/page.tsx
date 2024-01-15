"use client"
import { useAppDispatch } from "@/shared/redux/types"
import { useParams, useRouter } from "next/navigation"
import React, { useContext, useEffect } from "react"
import { ContentWrap } from "@/components/savings/ContentWrap"
import PinInput from "react-pin-input"
import {
  AuthButton,
  BtnMain,
  Loading,
  RegisterInput,
  GroupTargetTransferWithdrawInterface,
  createTransactionPinSchema,
  TargetSavingsGroupDataInterface,
  TargetSavingsGroupDataInterface,
} from "@/shared"
import { FormProvider, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { toast } from "@/components/ui/use-toast"
import { setLoadingFalse, setLoadingTrue } from "@/shared/redux/features"
import { passwordHash } from "@/utils/helpers"
import { userService } from "@/services"
import { CurrentUserContext } from "@/providers/CurrentUserProvider"

function page() {
  const { currentUser } = useContext(CurrentUserContext)

  const Router = useRouter()
  const dispatch = useAppDispatch()
  const Params = useParams()
  const handlenavigation = () => {
    Router.push(`/savings/my-targets/${Params.savingsID}/details`)
  }

  const methods = useForm<GroupTargetTransferWithdrawInterface>({
    defaultValues: {
      amount: 0,
      transaction_pin: "",
    },
    // resolver: yupResolver(createTransactionPinSchema),
  })

  const [savingsDetails, setSavingsDetails] =
    React.useState<TargetSavingsGroupDataInterface>()

  const targetMember = savingsDetails?.target_save_group_members.find(
    (member) => member.account_user_id === currentUser?.account_user_id
  )

  const onSubmit = async (data: GroupTargetTransferWithdrawInterface) => {
    try {
      dispatch(setLoadingTrue())
      await userService.transferFormGroupTargetSavings(
        targetMember?.target_save_group_member_id as string,
        {
          ...data,
          transaction_pin: passwordHash(data.transaction_pin),
        }
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

      Router.push(`/savings/target-savings/${Params.savingsID}/details`)
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

  useEffect(() => {
    const getTargetSavingsDetails = async () => {
      try {
        dispatch(setLoadingTrue())
        const res = await userService.getTargetSavingsByID(Params.savingsID)
        setSavingsDetails(res)
        dispatch(setLoadingFalse())
      } catch (error) {
        dispatch(setLoadingFalse())
      }
    }
    getTargetSavingsDetails()
  }, [])

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
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className=' flex flex-col gap-8 '
            >
              <RegisterInput
                name={`amount`}
                inputPlaceholder={`Enter Amount`}
                label='Amount'
                extraClass={`mt-6`}
                type='number'
              />

              <RegisterInput
                name={`transaction_pin`}
                inputPlaceholder={`Enter 4 digit pin`}
                label='Transaction Pin'
                extraClass={`mt-6`}
                type='password'
              />

              <div className=' flex gap-8 '>
                <BtnMain
                  btnStyle='w-full text-center text-grey  btn-gradient-savings '
                  btnText={"WithDraw"}
                  type='submit'
                />
              </div>
            </form>
          </FormProvider>
        </div>
      </ContentWrap>
    </>
  )
}

export default page
