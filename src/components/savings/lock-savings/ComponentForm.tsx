"use client"
import { IllustrationComponent, LoginForm } from "@/components"
import {
  AjoFormInterface,
  AjoFrequencyInterface,
  BackArrow,
  BackBtnCircle,
  BtnMain,
  IconRaiz,
  IconRaizColored,
  Loading,
  NextArrow,
  CreateTargetSavingsFormInterface,
  RegisterInput,
  RegisterTextArea,
  SetupLayout,
  WhiteTileWrap,
  createAjoSchema,
  CreateLockSavingsFormInterface,
  LockSaveInterestInterface,
  createLockSaveSchema,
} from "@/shared"
import { yupResolver } from "@hookform/resolvers/yup"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import Image from "next/image"
import React, { useEffect, useState } from "react"
import { Form, FormProvider, useForm } from "react-hook-form"
import { Resolver } from "react-hook-form"
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
  getSuccessLockSave,
  setLoadingFalse,
  setLoadingTrue,
} from "@/shared/redux/features"
import TimePicker from "react-time-picker"

export function ComponentForm() {
  const methods = useForm<CreateLockSavingsFormInterface>({
    defaultValues: {
      lock_save_description: "",
      lock_save_amount: 0,
    },
    mode: "onBlur",
    resolver: yupResolver(createLockSaveSchema),
  })

  const Router = useRouter()
  const dispatch = useAppDispatch()
  const [startDate, setStartDate] = React.useState<Date>()
  const [amount, setAmount] = React.useState<number>(0)
  const [endDate, setEndDate] = React.useState<Date>()
  const [interest, setInterest] = React.useState<LockSaveInterestInterface>()

  const getData = async () => {
    const response = await userService.getLockSavingsInterest({
      amount: amount,
      end_date: endDate as Date,
    })
    setInterest(response)
  }

  const onSubmit = async () => {
    if (!endDate) {
      toast({
        title: "Something Went Wrong",
        description: `Please select an end date`,

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
      const response = await userService.createLockSavings({
        lock_save_amount: amount,
        lock_save_description: methods.getValues("lock_save_description"),
        end_date: endDate as Date,
      })
      dispatch(getSuccessLockSave(response))
      Router.push("/savings/lock-savings/success")
      dispatch(setLoadingFalse())
    } catch (error) {
      if (error === "Insufficient funds, top up your wallet and try again") {
        Router.push("/savings/lock-savings/decline")
      }
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

  useEffect(() => {
    if (amount > 0 && endDate) {
      getData()
    }
  }, [amount, endDate])
  return (
    <>
      <Loading />
      <div className=' '>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className=' flex flex-col gap-9 '
          >
            <div className='flex items-center justify-between '>
              <div className=''>
                <h1 className='  font-display__medium text-purple capitalize '>
                  Lock Save
                </h1>
                <p className=' text-neutral-70 font-title__large '>
                  Safeguard your Funds
                </p>
              </div>
              <div className=''>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      {" "}
                      <Image
                        src={`/icons/info-circle.svg`}
                        width={24}
                        height={24}
                        alt=''
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Create Lock Save </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            <div className='flex flex-col gap-9  '>
              <div className=' flex flex-col gap-6  '>
                <RegisterInput
                  name='lock_save_description'
                  label='Title'
                  rules={{ required: "Target Description is required" }}
                />

                <div className=' flex flex-col gap-6 '>
                  <label
                    className={`font-label__large text-neutral-90 capitalize  `}
                  >
                    Amount
                  </label>
                  <div className=' flex flex-col gap-2  '>
                    <input
                      className={` form-input pl-0   input_field-input `}
                      type={"number"}
                      placeholder='Minimum of ₦5000'
                      {...methods.register("lock_save_amount", {
                        required: "Amount is required",
                      })}
                      onChange={(e) => setAmount(parseInt(e.target.value))}
                      value={amount}
                    />
                    {methods.formState.errors.lock_save_amount && (
                      <span className='error-message'>
                        {methods.formState.errors.lock_save_amount.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className=' flex justify-between gap-[43px] '>
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
                      <PopoverContent className='w-auto p-0' align='start'>
                        <Calendar
                          mode='single'
                          selected={endDate}
                          onSelect={setEndDate}
                          initialFocus
                          disabled={(date) =>
                            date < new Date() || date < new Date("1900-01-01")
                          }
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className='flex  items-center justify-between w-full '>
                  <span className=' font-label__large text-t-14 text-neutral-80  '>
                    {" "}
                    Interest Rate{" "}
                  </span>

                  <span className=' text-purple text-t-18 font-semi-mid  '>
                    {" "}
                    ₦{interest?.interest || 0}{" "}
                  </span>
                </div>
              </div>

              <div className=' flex flex-col gap-9 '>
                <BtnMain
                  btnText=' Lock Now'
                  btnStyle=' w-full text-center text-grey  btn-gradient-savings  '
                  type='submit'
                />
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  )
}
