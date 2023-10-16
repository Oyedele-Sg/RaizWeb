"use client"
import { IllustrationComponent, LoginForm } from "@/components"
import {
  AjoFormInterface,
  AjoFrequencyInterface,
  BackBtnCircle,
  BtnMain,
  IconPesa,
  IconPesaColored,
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
import React, { useEffect } from "react"
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

export default function Ajo() {
  const Router = useRouter()

  const [startDate, setStartDate] = React.useState<Date>()
  console.log("startDate", startDate)
  const [endDate, setEndDate] = React.useState<Date>()
  const [publicAjo, setPublicAjo] = React.useState<boolean>(true)
  const [frequencies, setFrequencies] = React.useState<AjoFrequencyInterface[]>(
    []
  )

  const methods = useForm<AjoFormInterface>({
    defaultValues: {
      ajo_name: "",
      public: publicAjo,
      image_url:
        "https://pixabay.com/photos/chain-security-metal-iron-3481377/",
      target_amount: null,
      number_of_slots: null,
      amount_per_cycle: null,
      collection_frequency_id: null,
    },
  })

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
    console.log("data", data)
    try {
      await userService.createAjo({
        ...data,
        start_date: moment(startDate).format("YYYY-MM-DD"),
        end_date: moment(endDate).format("YYYY-MM-DD"),
      })
      Router.push("/ajo/create/success")
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

  const getData = async () => {
    const response = await userService.getAjoFrequencies()
    setFrequencies(response)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <SetupLayout bg='bg-ajo-pattern'>
      <div className=' mx-5 mt-[72px] lg:m-[72px] flex flex-col gap-[84px] '>
        <div>
          <IconPesaColored />
        </div>

        <div className=' flex flex-col gap-3 '>
          <div className=''>
            <BackBtnCircle />
            <button title='next' className=''>
              <NextArrow />
            </button>
          </div>

          <div className=' bg-ajo-card p-12 rounded-lg '>
            <FormProvider {...methods}>
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className=' flex flex-col gap-9  '
              >
                <div className=''>
                  <h1 className='  font-display__medium text-purple '>Ajo</h1>
                  <p className=' text-neutral-70 font-title__large '>
                    Create Ajo
                  </p>
                </div>

                <div className=' flex flex-col gap-6  '>
                  <RegisterInput name='ajo_name' label='Name of Ajo ' />
                  <RegisterInput
                    type='number'
                    name='target_amount'
                    label='Amount '
                  />
                  <RegisterInput
                    type='number'
                    name='amount_per_cycle'
                    label='Amount Per Cycle '
                  />
                  <RegisterInput
                    name='number_of_slots'
                    label='Number of Slots '
                    type='number'
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
                        <PopoverContent className='w-auto p-0' align='start'>
                          <Calendar
                            mode='single'
                            selected={startDate}
                            onSelect={setStartDate}
                            initialFocus
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
                        <PopoverContent className='w-auto p-0' align='start'>
                          <Calendar
                            mode='single'
                            selected={endDate}
                            onSelect={setEndDate}
                            initialFocus
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
                    <Label htmlFor='ajo-public' className=' text-purple  '>
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
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </SetupLayout>
  )
}
