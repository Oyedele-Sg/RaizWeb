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
import { formatDate, generateDateObjects } from "@/utils/helpers"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
      Router.push("/loan/flex-loan/success")
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

  const daysArray = [7, 14, 21, 28]

  return (
    <>
      <Loading />
      <div className=''>
        <ContentWrap handleNavigation={handleNavigation} bg='bg-loan-bg'>
          <div className=' flex flex-col gap-9 '>
            <div className=''>
              <h1 className='  font-display__medium text-purple capitalize '>
                Flex loans
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
                    inputPlaceholder='₦5000 - ₦50000'
                  />

                  <div className=''>
                    <label
                      className={`font-label__large text-neutral-90 capitalize  `}
                    >
                      Duration
                    </label>
                    <Select
                      onValueChange={(value) => {
                        const selectedDate = generateDateObjects(
                          daysArray
                        ).find((item) => item.date === value)
                        methods.setValue(
                          "payback_date",
                          selectedDate?.date as string
                        )
                      }}
                    >
                      <SelectTrigger className='w-full outline-none rounded-none border-b-purple border-[1px] border-t-0 border-x-0  input_field-input capitalize  z-50 '>
                        <SelectValue
                          placeholder='Select a duration'
                          className='   '
                        />
                      </SelectTrigger>
                      <SelectContent className=' bg-neutral-20 text-neutral-90 h-[200px] overflow-auto z-50 '>
                        {generateDateObjects(daysArray).map((item, index) => (
                          <SelectItem
                            key={index}
                            value={item.date}
                            className=' hover:bg-neutral-50 z-50 '
                          >
                            {item.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {methods.formState.errors.payback_date && (
                      <span className='error-message'>
                        {methods.formState.errors.payback_date.message}
                      </span>
                    )}
                  </div>

                  <RegisterTextArea
                    name='loan_reason'
                    label='Reason for the Loan'
                    rules={{ required: "Loan Reason is required" }}
                    inputPlaceholder='Enter here'
                  />

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
