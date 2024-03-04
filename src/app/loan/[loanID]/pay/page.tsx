"use client"
import { ContentWrap } from "@/components/savings/ContentWrap"
import {
  BtnMain,
  Loading,
  LoanDataInterface,
  RegisterInput,
  repayLoanSchema,
} from "@/shared"
import { yupResolver } from "@hookform/resolvers/yup"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { toast } from "@/components/ui/use-toast"
import { userService } from "@/services"
import { setLoadingFalse, setLoadingTrue } from "@/shared/redux/features"
import { useAppDispatch } from "@/shared/redux/types"

export default function page() {
  const Router = useRouter()
  const dispatch = useAppDispatch()
  const Params = useParams()

  const methods = useForm<{ amount: number | null }>({
    defaultValues: {
      amount: null,
    },
    mode: "onBlur",
    resolver: yupResolver(repayLoanSchema),
  })
  const [endDate, setEndDate] = useState<Date>()
  console.log("endDate", endDate)

  const handleNavigation = () => {
    Router.push("/loan/hub")
  }
  const [loanDetails, setLoanDetails] = useState<LoanDataInterface>()

  const getData = async () => {
    try {
      const response = await userService.getLoanByID(Params.loanID as string)
      setLoanDetails(response)
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
        duration: 5000,
      })
    }
  }

  const handleSubmit = async (data: { amount: number | null }) => {
    if (
      data.amount !== null &&
      loanDetails &&
      data?.amount > loanDetails?.loan_amount_unpaid
    ) {
      toast({
        title: "Invalid Amount",
        description: `Amount must be less than or equal to ${loanDetails?.loan_amount_unpaid}`,
        variant: "destructive",
        style: {
          backgroundColor: "#f44336",
          color: "#fff",
          top: "20px",
          right: "20px",
        },
        duration: 5000,
      })
      return
    }
    try {
      dispatch(setLoadingTrue())
      const reponse = await userService.repayLoan(data, Params.loanID as string)

      dispatch(setLoadingFalse())
      Router.push(`/loan/${Params.loanID}/details`)
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
        duration: 5000,
      })
    }
  }

  useEffect(() => {
    getData()
  }, [Params.loanID])

  return (
    <>
      <Loading />
      <div className=''>
        <ContentWrap handleNavigation={handleNavigation} bg='bg-loan-bg'>
          <div className=' flex flex-col gap-9 '>
            <div className=''>
              <h1 className='  font-display__medium text-purple capitalize '>
                Pay
              </h1>
              <p className=' text-neutral-70 font-title__large '>
                Payback loan
              </p>
            </div>
            <div className=''>
              <FormProvider {...methods}>
                <form
                  onSubmit={methods.handleSubmit(handleSubmit)}
                  className=' flex flex-col gap-6 '
                >
                  <RegisterInput
                    name='amount'
                    label='Amount '
                    type='number'
                    inputPlaceholder='₦5000 - ₦50000'
                  />

                  <BtnMain
                    btnText='Submit '
                    btnStyle=' w-full text-center text-grey  btn-gradient-loan   '
                  />
                </form>
              </FormProvider>
            </div>
          </div>
        </ContentWrap>
      </div>
    </>
  )
}
