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
} from "@/shared"
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
      preferred_deduction_day: 0,
      preferred_deduction_date: 0,
    },
  })

  const onSubmit = async (data: EditSavingDataInterface) => {
    try {
      dispatch(setLoadingTrue())
      await userService.editPersonalTargetSavings(Params.savingsID, {
        ...data,
        preferred_credit_time: convertDateToTime(prefferedTime),
      })

      toast({
        title: "Withdrawal Successful",

        variant: "destructive",
        style: {
          backgroundColor: "#3b82f6",
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
  const [prefferedTime, setPrefferedTime] = React.useState<Dayjs | null>(null)

  const getData = async () => {
    const response = await userService.getAjoFrequencies()
    setFrequencies(response)
  }

  useEffect(() => {
    getData()
  }, [])

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
                    Primary source of funds
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
                      {currentUser?.withdrawal_accounts.map((item) => (
                        <SelectItem
                          key={item.withdrawal_account_id}
                          value={item.withdrawal_account_name}
                          className='hover:bg-neutral-50'
                        >
                          {item.withdrawal_account_name} -{" "}
                          {item.withdrawal_account_number}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

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
                {/* <div className=' flex items-center justify-between  '>
                  <Label htmlFor='savings-public' className=' text-purple  '>
                    Public
                  </Label>
                  <Switch
                    id='savings-public'
                    className=' bg-purple '
                    checked={publicSaving}
                    onCheckedChange={setPublicSaving}
                  />
                </div> */}

                <BtnMain
                  btnText=' Create Personal Target Savings'
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
