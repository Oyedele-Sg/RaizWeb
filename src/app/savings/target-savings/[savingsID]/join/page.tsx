"use client"

import { ContentWrap } from "@/components/savings/ContentWrap"
import {
  ComponentOne,
  ComponentPersonal,
} from "@/components/savings/target-saving"
import { current } from "@reduxjs/toolkit"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { convertDateToTime } from "@/utils/helpers"
import dayjs, { Dayjs } from "dayjs"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider, TimeField } from "@mui/x-date-pickers"
import {
  AjoFrequencyInterface,
  BtnMain,
  JoinTargetSaveFromInterface,
  RegisterInput,
} from "@/shared"
import { FormProvider, useForm } from "react-hook-form"
import { toast } from "@/components/ui/use-toast"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { userService } from "@/services"
import { Label } from "@/components/ui/label"

export default function page() {
  const Params = useParams()
  const methods = useForm<JoinTargetSaveFromInterface>({
    defaultValues: {
      frequency_id: null,
      preferred_credit_time: null,
      preferred_deduction_amount: null,
      primary_source_of_funds: null,
    },
  })
  const Router = useRouter()
  const [current, setCurrent] = useState<string>()
  const [step, setStep] = useState<number>(1)
  const [frequencies, setFrequencies] = useState<AjoFrequencyInterface[]>([])
  const handleNavigation = () => {
    if (!current) {
      Router.push("/savings/hub")
    }
    if (step === 1) {
      setCurrent(undefined)
    } else {
      setStep(step - 1)
    }
  }

  const onSubmit = async (data: JoinTargetSaveFromInterface) => {
    try {
      await userService.joinTargetSavings(Params.savingsID, {
        ...data,
        preferred_credit_time: convertDateToTime(prefferedTime),
      })
      toast({
        title: "Successfully Joined",
        description: `You have successfully joined this target savings`,
        variant: "default",
        style: {
          backgroundColor: "#7ABA98",
          color: "#fff",
          top: "20px",
          right: "20px",
        },
      })
      Router.push("/savings/hub")
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

  const [prefferedTime, setPrefferedTime] = useState<Dayjs | null>(null)

  const getData = async () => {
    const response = await userService.getAjoFrequencies()
    setFrequencies(response)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className=''>
        <ContentWrap handleNavigation={handleNavigation}>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <div className=' flex flex-col gap-9 '>
                <TimeField value={prefferedTime} onChange={setPrefferedTime} />

                <RegisterInput
                  type='number'
                  name='preferred_deduction_amount'
                  label='Preferred deduction amount '
                  rules={{ required: "Deduction amount is required" }}
                />
                <RegisterInput
                  name='primary_source_of_funds'
                  label='Primary source of funds '
                  rules={{
                    required: "Primary source of fund is required",
                  }}
                />

                <div className=' flex flex-col gap-4 w-full'>
                  <p className=' text-neutral-80   font-label__large '>
                    Choose Savings Frequency
                  </p>

                  <Select
                    onValueChange={(value) => {
                      const selectedFrequency = frequencies.find(
                        (item) => item.frequency_name === value
                      )
                      methods.setValue(
                        "frequency_id",
                        selectedFrequency?.frequency_id as number
                      )
                    }}
                  >
                    <SelectTrigger className=' z-100000000 border-t-0 border-l-0 border-r-0 border-b border-b-purple  rounded-none text-neutral-100'>
                      <SelectValue
                        placeholder='Select Savings Frquency'
                        className={
                          methods.formState.errors.frequency_id
                            ? "input_field-input_error"
                            : " border-none "
                        }
                      />
                    </SelectTrigger>
                    <SelectContent className='bg-neutral-20 text-neutral-90 h-[200px] overflow-auto z-10000000000000  '>
                      {frequencies.map((item) => (
                        <SelectItem
                          key={item.frequency_id}
                          value={item.frequency_name}
                          className='hover:bg-neutral-50'
                        >
                          {item.frequency_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <BtnMain
                  btnText='Join Target Savings'
                  btnStyle=' w-full text-center text-grey  btn-gradient-savings  '
                  type='submit'
                />
              </div>
            </form>
          </FormProvider>
        </ContentWrap>
      </div>
    </LocalizationProvider>
  )
}
