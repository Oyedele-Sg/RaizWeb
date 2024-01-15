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
  PersonalTargetSavingsWithdrawalDataInterface,
  createTransactionPinSchema,
  AjoFrequencyInterface,
  EditSavingDataInterface,
  MonthPicker,
  DayPicker,
  TargetSavingsGroupDataInterface,
} from "@/shared"
import { Button } from "@/components/ui/button"

import { FormProvider, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { toast } from "@/components/ui/use-toast"
import { setLoadingFalse, setLoadingTrue } from "@/shared/redux/features"
import { passwordHash } from "@/utils/helpers"
import { userService } from "@/services"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { LocalizationProvider, TimeField } from "@mui/x-date-pickers"
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment"
import { convertDateToTime } from "@/utils/helpers"
import dayjs, { Dayjs } from "dayjs"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { CurrentUserContext } from "@/providers/CurrentUserProvider"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar as CalendarIcon } from "lucide-react"
import moment from "moment"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"

function page() {
  const Router = useRouter()
  const { currentUser } = useContext(CurrentUserContext)
  const dispatch = useAppDispatch()
  const Params = useParams()
  const handlenavigation = () => {
    Router.push(`/savings/my-targets/${Params.savingsID}/details`)
  }

  const methods = useForm<EditSavingDataInterface>({
    defaultValues: {
      frequency_id: null,
      preferred_credit_time: "",
      preferred_deduction_amount: 0,
      preferred_deduction_day: null,
      preferred_deduction_date: null,
    },
  })

  const [savingsDetails, setSavingsDetails] =
    React.useState<TargetSavingsGroupDataInterface>()

  const targetMember = savingsDetails?.target_save_group_members.find(
    (member) => member.account_user_id === currentUser?.account_user_id
  )

  const onSubmit = async (data: EditSavingDataInterface) => {
    try {
      dispatch(setLoadingTrue())
      await userService.editGroupTargetSavings(
        targetMember?.target_save_group_member_id as string,
        {
          ...data,
          preferred_credit_time: convertDateToTime(prefferedTime),
        }
      )

      toast({
        title: "Success",
        description: `Savings settings updated successfully`,
        variant: "default",
        style: {
          backgroundColor: "#10B981",
          color: "#fff",
          top: "20px",
          right: "20px",
        },
      })

      Router.push(`/savings/my-targets/${Params.savingsID}/details`)
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

  // const [publicSaving, setPublicSaving] = React.useState<boolean>(true)
  const [frequencies, setFrequencies] = React.useState<AjoFrequencyInterface[]>(
    []
  )

  const getData = async () => {
    try {
      dispatch(setLoadingTrue())
      const response = await userService.getAjoFrequencies()
      const res = await userService.getTargetSavingsByID(Params.savingsID)
      setFrequencies(response)
      setSavingsDetails(res)
      dispatch(setLoadingFalse())
    } catch (error) {
      dispatch(setLoadingFalse())
    }
  }

  const [prefferedTime, setPrefferedTime] = React.useState<Dayjs | null>(null)
  const [prefferedDay, setPrefferedDay] = React.useState<number | null>(null)
  const [prefferedDate, setPrefferedDate] = React.useState<number | null>(null)

  const [prefferedFreq, setPrefferedFreq] = React.useState<number | null>(null)

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    methods.setValue("preferred_deduction_day", prefferedDay)
  }, [prefferedDay])
  useEffect(() => {
    methods.setValue("preferred_deduction_date", prefferedDate)
  }, [prefferedDate])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Loading />
      <ContentWrap handleNavigation={handlenavigation}>
        <div className='flex flex-col gap-9'>
          <div className=''>
            <h1 className='  font-display__medium text-purple capitalize '>
              Savings Settings
            </h1>
            <p className=' text-neutral-70 font-title__large '>
              Payment Settings
            </p>
          </div>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className=' flex flex-col gap-8 '
            >
              <div className=' flex flex-col gap-9 '>
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
                      setPrefferedFreq(
                        selectedFrequency?.frequency_id as number
                      )
                    }}
                  >
                    <SelectTrigger className=' z-100000000 border-t-0 border-l-0 border-r-0 border-b border-b-purple  rounded-none text-neutral-100'>
                      <SelectValue
                        placeholder='Select Savings Frequency'
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
                {prefferedFreq === 3 ? (
                  <TimeField
                    value={prefferedTime}
                    onChange={setPrefferedTime}
                  />
                ) : prefferedFreq === 2 ? (
                  <div className=' flex flex-col gap-6 '>
                    {" "}
                    <DayPicker setDay={setPrefferedDay} />{" "}
                    <TimeField
                      value={prefferedTime}
                      onChange={setPrefferedTime}
                    />{" "}
                  </div>
                ) : prefferedFreq === 1 ? (
                  <div className=' flex flex-col gap-6 '>
                    {" "}
                    <MonthPicker setDay={setPrefferedDate} />{" "}
                    <TimeField
                      value={prefferedTime}
                      onChange={setPrefferedTime}
                    />{" "}
                  </div>
                ) : null}

                <RegisterInput
                  type='number'
                  name='preferred_deduction_amount'
                  label='Preferred deduction amount '
                  rules={{ required: "Deduction amount is required" }}
                />

                <BtnMain
                  btnText=' Save Changes'
                  btnStyle=' w-full text-center text-grey  btn-gradient-savings  '
                  type='submit'
                />
              </div>
            </form>
          </FormProvider>
        </div>
      </ContentWrap>
    </LocalizationProvider>
  )
}

export default page
