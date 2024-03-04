"use client"
import { ContentWrap } from "@/components/savings/ContentWrap"
import {
  BtnMain,
  CreateFlexLoanDataInterface,
  Loading,
  LoanDataInterface,
  RegisterInput,
  RegisterTextArea,
  createFlexLoanSchema,
} from "@/shared"
import { yupResolver } from "@hookform/resolvers/yup"
import { current } from "@reduxjs/toolkit"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
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
import { useAppDispatch, useAppSelector } from "@/shared/redux/types"
import { getLoanData } from "@/shared/redux/features/flex-loan"

export default function page() {
  const Router = useRouter()
  const dispatch = useAppDispatch()
  const data = useAppSelector((state) => state.loanDataReducer)

  const Params = useParams()

  const handleNavigation = () => {
    Router.push("/loan/hub")
  }
  const getData = async () => {
    try {
      const res = await userService.getLoanByID(Params.loanID as string)
      dispatch(getLoanData(res))
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

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <Loading />
      <div className=''>
        <ContentWrap handleNavigation={handleNavigation} bg='bg-loan-bg'>
          <div className=' flex flex-col gap-9 '>
            <div className=''>
              <h1 className='  font-display__medium text-purple capitalize '>
                Summary
              </h1>
              <p className=' text-neutral-70 font-title__large '>setup</p>
            </div>
            <div className=''>
              <div className=''>
                <h3 className=' text-center text-neutral-70 text-t-18   '>
                  Payback amount
                </h3>
                <h2 className=' text-t-28 font-semibold text-purple text-center  '>
                  ₦{data?.loan_amount_unpaid?.toLocaleString() || "50,000"}
                </h2>
              </div>

              <div className='  bg-grey rounded  flex  flex-col gap-[25px] text-t-[18px] text-purple px-4 py-6 '>
                <div className=' flex justify-between '>
                  <span>Principal </span>{" "}
                  <span className=''>
                    ₦{data?.loan_amount?.toLocaleString()}
                  </span>
                </div>
                <div className=' flex justify-between '>
                  <span className=''>Duration </span>{" "}
                  <span className=''> {data?.days_left} days </span>
                </div>
                {/* <div className=' flex justify-between '>
                  <span className=''>Interest Rate </span>{" "}
                  <span> {data?.t}</span>
                </div> */}
                <div className=' flex justify-between '>
                  <span className=''>Interest Amount</span>{" "}
                  <span> ₦{data?.interest_amount?.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </ContentWrap>
      </div>
    </>
  )
}
