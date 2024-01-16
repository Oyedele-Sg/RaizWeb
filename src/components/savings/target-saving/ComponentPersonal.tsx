"use client"
import { IllustrationComponent, LoginForm } from "@/components"
import {
  AjoFrequencyInterface,
  BtnMain,
  CreateTargetSavingsFormInterface,
  DayPicker,
  Loading,
  MonthPicker,
  RegisterInput,
  RegisterTextArea,
} from "@/shared"
import { yupResolver } from "@hookform/resolvers/yup"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import Image from "next/image"
import React, { useContext, useEffect, useState } from "react"
import { Form, FormProvider, useForm } from "react-hook-form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar as CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import moment from "moment"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { userService } from "@/services"
import { start } from "repl"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/shared/redux/types"
import {
  getSuccessGroupTargetSave,
  setLoadingFalse,
  setLoadingTrue,
} from "@/shared/redux/features"

import { LocalizationProvider, TimeField } from "@mui/x-date-pickers"
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment"
import { convertDateToTime } from "@/utils/helpers"
import dayjs, { Dayjs } from "dayjs"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { CurrentUserContext } from "@/providers/CurrentUserProvider"

interface Props {
  setStep: React.Dispatch<React.SetStateAction<number>>
  step: number
  current: string
}
export function ComponentPersonal({ setStep, step, current }: Props) {
  const { currentUser } = useContext(CurrentUserContext)

  const methods = useForm<CreateTargetSavingsFormInterface>({
    defaultValues: {
      target_amount: 0,
      target_save_name: "",
      target_save_description: "",
      preferred_credit_time: "",
      preferred_deduction_amount: null,
      primary_source_of_funds_id: null,
      preferred_deduction_day: null,
      preferred_deduction_date: null,
    },
  })

  const onSubmit = async (data: CreateTargetSavingsFormInterface) => {
    if (startDate === undefined || endDate === undefined) {
      toast({
        title: "Fill date fields",

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
    if (startDate > endDate) {
      toast({
        title: "Inavalid date selection",
        variant: "destructive",
        style: {
          backgroundColor: "#f44336",
          color: "#fff",
          top: "20px",
          right: "20px",
        },
        duration: 5000,
      })
      return false
    }

    try {
      dispatch(setLoadingTrue())
      const response =
        current === "personal"
          ? await userService.createPersonalTargetSavings({
              ...data,
              start_date: startDate,
              end_date: endDate,
              public: publicSaving,
              preferred_credit_time: convertDateToTime(prefferedTime),
            })
          : await userService.createGroupTargetSavings({
              ...data,
              start_date: startDate,
              end_date: endDate,
              public: publicSaving,
              preferred_credit_time: convertDateToTime(prefferedTime),
            })

      current === "group"
        ? Router.push("/savings/target-savings/success")
        : Router.push("/savings/my-targets/success")
      current === "group" && dispatch(getSuccessGroupTargetSave(response))
      dispatch(setLoadingFalse())
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
      dispatch(setLoadingFalse())
    }
  }

  // const [value, onChange] = useState('10:00');

  const [file, setFile] = useState<any>(null)
  const [imageURL, setImageURL] = useState<any>("")
  const Router = useRouter()
  const dispatch = useAppDispatch()
  const [startDate, setStartDate] = React.useState<Date>()
  const [publicSaving, setPublicSaving] = React.useState<boolean>(true)

  const [endDate, setEndDate] = React.useState<Date>()
  const [frequencies, setFrequencies] = React.useState<AjoFrequencyInterface[]>(
    []
  )

  const getData = async () => {
    const response = await userService.getAjoFrequencies()
    setFrequencies(response)
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
      <div className=' '>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className='  '>
            <div className='flex flex-col gap-9  '>
              <div className=''>
                <h1 className='  font-display__medium text-purple capitalize '>
                  {current} Save
                </h1>
                <p className=' text-neutral-70 font-title__large '>
                  Goal Setup
                </p>
              </div>
              {(() => {
                switch (step) {
                  case 1:
                    return (
                      <div className=' flex flex-col gap-6  '>
                        <RegisterInput
                          name='target_save_name'
                          label='Target Name'
                          rules={{ required: "Target Name is required" }}
                        />
                        <RegisterInput
                          type='number'
                          name='target_amount'
                          label='Total Target Amount '
                          rules={{ required: "Target Amount is required" }}
                        />

                        <RegisterTextArea
                          name='target_save_description'
                          label='Target Description'
                          rules={{ required: "Target Description is required" }}
                        />

                        <div className=' flex justify-between gap-[43px] '>
                          <div className=' flex flex-col gap-4 w-full'>
                            <p className=' text-neutral-80   font-label__large '>
                              Start Date{" "}
                            </p>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left text-neutral-60 font-normal  bg-transparent outline-none border-t-0 border-l-0 border-r-0  border-b border-b-purple rounded-none"
                                    // !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {startDate ? (
                                    moment(startDate).format("DD MMMM YYYY")
                                  ) : (
                                    <span>Start date</span>
                                  )}
                                  <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent
                                className='w-auto p-0'
                                align='start'
                              >
                                <Calendar
                                  mode='single'
                                  selected={startDate}
                                  onSelect={setStartDate}
                                  initialFocus
                                  disabled={(date) =>
                                    date < new Date() ||
                                    date < new Date("1900-01-01")
                                  }
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                          <div className=' flex flex-col gap-4 w-full'>
                            <p className=' text-neutral-80   font-label__large '>
                              {" "}
                              End Date{" "}
                            </p>
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
                                    <span>End date</span>
                                  )}
                                  <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent
                                className='w-auto p-0'
                                align='start'
                              >
                                <Calendar
                                  mode='single'
                                  selected={endDate}
                                  onSelect={setEndDate}
                                  initialFocus
                                  disabled={(date) =>
                                    date < new Date() ||
                                    date < new Date("1900-01-01")
                                  }
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                        </div>

                        <BtnMain
                          btnText=' Next  '
                          btnStyle=' w-full text-center text-grey  btn-gradient-savings  '
                          type='button'
                          onClick={() => setStep(2)}
                        />
                      </div>
                    )
                  case 2:
                    return (
                      <div className=' flex flex-col gap-9 '>
                        <label
                          className={` relative w-full rounded-lg border border-neutral-90  ${
                            !(imageURL === "")
                              ? " h-[200px]"
                              : "py-[32.5px]  flex items-center justify-center"
                          }  `}
                          htmlFor='image_url'
                        >
                          <input
                            type='file'
                            name='image_url'
                            accept='image/png, image/jpeg'
                            id='image_url'
                            className=' absolute w-full h-full opacity-0 cursor-default '
                            onChange={(e: any) => setFile(e.target.files[0])}
                          />
                          {!(imageURL === "") ? (
                            <Image
                              src={imageURL}
                              alt=''
                              fill={true}
                              className='rounded-lg'
                            />
                          ) : (
                            <Image
                              src={`/illustrations/upload.svg`}
                              alt=''
                              height={112}
                              width={112}
                            />
                          )}
                        </label>
                        <BtnMain
                          btnText=' Next  '
                          btnStyle=' w-full text-center text-grey  btn-gradient-savings  '
                          type='button'
                          onClick={() => setStep(3)}
                        />
                      </div>
                    )

                  case 3:
                    return (
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
                          <div className=' flex flex-col '>
                            {" "}
                            <DayPicker setDay={setPrefferedDay} />{" "}
                            <TimeField
                              value={prefferedTime}
                              onChange={setPrefferedTime}
                            />{" "}
                          </div>
                        ) : prefferedFreq === 1 ? (
                          <div className=' flex flex-col '>
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
                        <div className=' flex flex-col gap-4 w-full'>
                          <p className=' text-neutral-80   font-label__large '>
                            Primary source of funds
                          </p>

                          <Select
                            onValueChange={(value) => {
                              const selectedFrequency =
                                currentUser?.wallets.find(
                                  (item) => item.wallet_id === value
                                )
                              methods.setValue(
                                "primary_source_of_funds_id",
                                selectedFrequency?.wallet_id as string
                              )
                            }}
                          >
                            <SelectTrigger className=' z-100000000 border-t-0 border-l-0 border-r-0 border-b border-b-purple  rounded-none text-neutral-100'>
                              <SelectValue
                                placeholder='Select Withdrawal Account'
                                className={
                                  methods.formState.errors
                                    .primary_source_of_funds_id
                                    ? "input_field-input_error"
                                    : " border-none "
                                }
                              />
                            </SelectTrigger>
                            <SelectContent className='bg-neutral-20 text-neutral-90 h-[200px] overflow-auto z-10000000000000  '>
                              {currentUser?.wallets.map((item) => (
                                <SelectItem
                                  key={item.wallet_id}
                                  value={item.wallet_id}
                                  className='hover:bg-neutral-50'
                                >
                                  {item.wallet_name} -{item.account_number} (
                                  {item.account_balance})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className=' flex items-center justify-between  '>
                          <Label
                            htmlFor='savings-public'
                            className=' text-purple  '
                          >
                            Public
                          </Label>
                          <Switch
                            id='savings-public'
                            className=' bg-purple '
                            checked={publicSaving}
                            onCheckedChange={setPublicSaving}
                          />
                        </div>

                        <BtnMain
                          btnText={`Create ${current} Target Savings`}
                          btnStyle=' w-full text-center text-grey  btn-gradient-savings  '
                          type='submit'
                        />
                      </div>
                    )
                  default:
                    return null
                }
              })()}
            </div>
          </form>
        </FormProvider>
      </div>
    </LocalizationProvider>
  )
}
