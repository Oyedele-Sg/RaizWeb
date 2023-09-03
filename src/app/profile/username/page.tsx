"use client"

import { Header, StepperComponent } from "@/components"
import { toast } from "@/components/ui/use-toast"
import { userService } from "@/services"
import {
  BtnMain,
  Loading,
  RegisterInput,
  SetupLayout,
  SkipLink,
} from "@/shared"
import { setLoadingFalse, setLoadingTrue } from "@/shared/redux/features"
import { useAppDispatch } from "@/shared/redux/types"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

import {
  useForm,
  FormProvider,
  FieldValues,
  FieldError,
  UseFormRegister,
} from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface UsernameInputProps extends Partial<FieldValues> {
  username: string
}
// create an array of 6 strings with the word 'pesa' in different variations
const pesa = ["pesa", "Pesa", "PESA", "pEsa", "peSa", "pesA"]

export default function Username() {
  const Router = useRouter()
  const dispatch = useAppDispatch()
  const methods = useForm<UsernameInputProps>({
    defaultValues: {
      username: "",
    },
  })

  const onSubmit = async (data: UsernameInputProps) => {
    try {
      dispatch(setLoadingTrue())
      await userService.updateUsername(data)
      toast({
        title: " Username added successfully",

        style: {
          backgroundColor: "#4B0082",
          color: "#fff",
        },
      })
      Router.push("/profile/create-pin")
      dispatch(setLoadingFalse())
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
      })
    }
  }

  const getData = async () => {
    const response = await userService.getBanks()
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <Loading />

      <SetupLayout bg='bg-profile-1'>
        <div className=' px-5 lg:px-[60px]  py-[50px] flex flex-col justify-center gap-[112px] '>
          <SkipLink link='/profile/bank' />
          <Header activeStep={0} />

          <div className=' bg-neutral-20 py-16 px-8 rounded-xl flex flex-col gap-[88px] '>
            <div className=''>
              <FormProvider {...methods}>
                <form
                  className=' flex  flex-col gap-4 '
                  onSubmit={methods.handleSubmit(onSubmit)}
                >
                  <RegisterInput
                    name={`username`}
                    inputPlaceholder={`Enter Username`}
                    rules={{
                      required: "Username is required",
                    }}
                    label='Username'
                  />

                  <BtnMain
                    btnText='Submit'
                    className=' bg-purple py-4 px-[24px] font-body__large  text-grey rounded-lg  '
                  />
                </form>
              </FormProvider>
            </div>

            <div className=' flex flex-col gap-6  '>
              <h2 className=' font-body__large  text-neutral-70  '>
                Suggested Username
              </h2>

              <div className=' flex flex-wrap gap-4 '>
                {pesa.map((word, index) => (
                  <div
                    key={index}
                    className=' flex items-center gap-4  cursor-pointer rounded-lg bg-purple px-8 py-2 '
                  >
                    <p className=' font-body__large text-grey '>{word}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SetupLayout>
    </>
  )
}
