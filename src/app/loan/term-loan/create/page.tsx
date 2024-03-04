"use client"
import { ContentWrap } from "@/components/savings/ContentWrap"
import {
  BtnMain,
  CreateFlexLoanDataInterface,
  Loading,
  RegisterInput,
  RegisterTextArea,
  createFlexLoanSchema,
} from "@/shared"
import { yupResolver } from "@hookform/resolvers/yup"
import { current } from "@reduxjs/toolkit"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import moment from "moment"
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { formatDate } from "@/utils/helpers"

import { toast } from "@/components/ui/use-toast"
import { userService } from "@/services"
import { setLoadingFalse, setLoadingTrue } from "@/shared/redux/features"
import { useAppDispatch } from "@/shared/redux/types"
import { getLoanData } from "@/shared/redux/features/flex-loan"

export default function page() {
  const Router = useRouter()
  const dispatch = useAppDispatch()

  const methods = useForm<CreateFlexLoanDataInterface>({
    defaultValues: {
      amount: null,
      loan_reason: "",
      payback_date: "",
    },
    mode: "onBlur",
    resolver: yupResolver(createFlexLoanSchema),
  })
  const [endDate, setEndDate] = useState<Date>()
  console.log("endDate", endDate)

  const handleNavigation = () => {
    Router.push("/loan/hub")
  }
  const handleSubmit = async (data: CreateFlexLoanDataInterface) => {
    try {
      dispatch(setLoadingTrue())
      const reponse = await userService.applyFlexLoan(data)
      dispatch(getLoanData(reponse))
      dispatch(setLoadingFalse())
      Router.push("/loan/flex-loan/create/success")
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

  return (
    <>
      <Loading />
      <div className=''>
        <ContentWrap handleNavigation={handleNavigation} bg='bg-loan-bg'>
          <div className=' flex flex-col gap-9 '>
            <div className=''>
              <h1 className='  font-display__medium text-purple capitalize '>
                Term loans
              </h1>
              <p className=' text-neutral-70 font-title__large '>setup</p>
            </div>
            <div className=''>
              <FormProvider {...methods}>
                <form
                  onSubmit={methods.handleSubmit(handleSubmit)}
                  className=' flex flex-col gap-6 '
                >
                  <RegisterInput
                    name='amount'
                    label='Amount of Loan'
                    type='number'
                  />

                  <RegisterTextArea
                    name='loan_reason'
                    label='Reason for the Loan'
                    rules={{ required: "Loan Reason is required" }}
                    inputPlaceholder='Enter here'
                  />

                  <div className=''>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left text-neutral-60 font-normal  bg-transparent outline-none border-t-0 border-l-0 border-r-0  border-b border-b-purple rounded-none   "
                            // !field.value && "text-muted-foreground"
                          )}
                        >
                          {endDate ? (
                            moment(endDate).format("DD MMMM YYYY")
                          ) : (
                            <span>Payback Date</span>
                          )}
                          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0' align='start'>
                        <Calendar
                          mode='single'
                          selected={endDate}
                          onSelect={(e) => {
                            setEndDate(e)
                            methods.setValue("payback_date", formatDate(e))
                          }}
                          initialFocus
                          disabled={(date) =>
                            date < new Date() || date < new Date("1900-01-01")
                          }
                        />
                      </PopoverContent>
                    </Popover>
                    {methods.formState.errors.payback_date && (
                      <span className='error-message'>
                        {methods.formState.errors.payback_date.message}
                      </span>
                    )}
                  </div>

                  <BtnMain
                    btnText='Submit  '
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
