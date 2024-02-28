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
  RegisterInput,
  SetupLayout,
  WhiteTileWrap,
  createAjoSchema,
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
import { setLoadingFalse, setLoadingTrue } from "@/shared/redux/features"

export default function Ajo() {
  const Router = useRouter()
  const dispatch = useAppDispatch()
  const [startDate, setStartDate] = React.useState<Date>()
  const [step, setStep] = React.useState<number>(1)

  const [endDate, setEndDate] = React.useState<Date>()
  const [publicAjo, setPublicAjo] = React.useState<boolean>(true)
  const [frequencies, setFrequencies] = React.useState<AjoFrequencyInterface[]>(
    []
  )

  const methods = useForm<AjoFormInterface>({
    defaultValues: {
      ajo_name: "",
      public: publicAjo,
      target_amount: null,
      number_of_slots: null,
      amount_per_cycle: null,
      collection_frequency_id: null,
    },
  })

  const [file, setFile] = useState<any>(null)
  const [imageURL, setImageURL] = useState<any>("")
  let targetAmount
  const onSubmit = async (data: AjoFormInterface) => {
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
    targetAmount = data.target_amount
    try {
      dispatch(setLoadingTrue())
      await userService.createAjo({
        ...data,
        start_date: moment(startDate).format("YYYY-MM-DD"),
        end_date: moment(endDate).format("YYYY-MM-DD"),
        image_url: imageURL || process.env.DEFAULT_AJO_IMG,
        target_amount:
          targetAmount ||
          (data.number_of_slots || 1) * (data.amount_per_cycle || 0),
      })
      dispatch(setLoadingFalse())

      Router.push("/ajo/create/success")
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

  const getData = async () => {
    const response = await userService.getAjoFrequencies()
    setFrequencies(response)
  }

  useEffect(() => {
    getData()
  }, [])

  const handleImageChange = async () => {
    try {
      dispatch(setLoadingTrue())
      const formData = new FormData()
      formData.append("file", file)
      formData.append("type", file.type)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
        headers: {
          // You don't need to set Content-Type for FormData
          // "Content-Type": "multipart/form-data",
          // "Access-Control-Allow-Origin" header is not needed here
        },
      })

      if (response.ok) {
        const data = await response.json()
        setImageURL(data.url)
      }

      dispatch(setLoadingFalse())

      setFile(null)
    } catch (err) {
      console.error(err)
      dispatch(setLoadingFalse())
    }
  }

  useEffect(() => {
    handleImageChange()
  }, [file])

  return (
    <>
      <Loading />
      <SetupLayout bg='bg-ajo-pattern'>
        <div className=' mx-5 mt-[72px] lg:m-[72px] flex flex-col gap-[84px] '>
          <div>
            <IconRaizColored />
          </div>

          <div className=' flex flex-col gap-3 '>
            <div className=' flex items-center justify-between '>
              <div className=''>
                <button
                  title='back'
                  className=''
                  onClick={() => {
                    if (step === 2) {
                      setStep(1)
                    } else if (step === 1) {
                      Router.back()
                    }
                  }}
                >
                  <BackArrow />
                </button>
                <button title='next' className=''>
                  <NextArrow />
                </button>
              </div>

              <div className=' text-neutral-60 font-bond__large   '>
                {step}/2{" "}
              </div>
            </div>

            <div className=' bg-ajo-card p-12 rounded-lg '>
              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} className='  '>
                  <div className='flex flex-col gap-9  '>
                    <div className=''>
                      <h1 className='  font-display__medium text-purple '>
                        Ajo
                      </h1>
                      <p className=' text-neutral-70 font-title__large '>
                        Create Ajo
                      </p>
                    </div>
                    {step === 1 ? (
                      <div className=' flex flex-col gap-6    '>
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
                            accept='image/*'
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
                        <RegisterInput name='ajo_name' label='Name of Ajo ' />
                        <RegisterInput
                          type='number'
                          name='amount_per_cycle'
                          label='Individual Contribution Per Cycle '
                        />
                        <RegisterInput
                          name='number_of_slots'
                          label='Number of Slots '
                          type='number'
                        />
                        {/* <RegisterInput
                          type="number"
                          name="target_amount"
                          label="Total Amount Per Cycle"
                          disabled
                        /> */}
                        <BtnMain
                          btnText=' Next  '
                          btnStyle=' w-full text-center text-grey  bg-gradient-ajo-default  '
                          type='button'
                          onClick={() => setStep(2)}
                        />
                      </div>
                    ) : (
                      <div className=' flex flex-col gap-9 '>
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
                        <Select
                          onValueChange={(value) => {
                            const selectedFrequency = frequencies.find(
                              (item) => item.frequency_name === value
                            )
                            methods.setValue(
                              "collection_frequency_id",
                              selectedFrequency?.frequency_id as number
                            )
                          }}
                        >
                          <SelectTrigger className=' border-t-0 border-l-0 border-r-0 border-b border-b-purple  rounded-none text-neutral-100'>
                            <SelectValue
                              placeholder='Select Ajo Frquency'
                              className={
                                methods.formState.errors.collection_frequency_id
                                  ? "input_field-input_error"
                                  : " border-none "
                              }
                            />
                          </SelectTrigger>
                          <SelectContent className='bg-neutral-20 text-neutral-90 h-[200px] overflow-auto  '>
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
                        <div className=' flex items-center justify-between  '>
                          <Label
                            htmlFor='ajo-public'
                            className=' text-purple  '
                          >
                            Public
                          </Label>
                          <Switch
                            id='ajo-public'
                            className=' bg-purple '
                            checked={publicAjo}
                            onCheckedChange={setPublicAjo}
                          />
                        </div>
                        <BtnMain
                          btnText=' Create Ajo  '
                          btnStyle=' w-full text-center text-grey  bg-gradient-ajo-default  '
                          type='submit'
                        />
                      </div>
                    )}
                  </div>
                </form>
              </FormProvider>
            </div>
          </div>
        </div>
      </SetupLayout>
    </>
  )
}
