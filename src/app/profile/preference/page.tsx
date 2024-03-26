"use client"

import { Header, StepperComponent } from "@/components"
import { toast } from "@/components/ui/use-toast"
import { userService } from "@/services"
import {
  AuthButton,
  BtnMain,
  IconRaizColored,
  Loading,
  RegisterInput,
  SetupLayout,
  SkipLink,
  TransactionPinFormInterface,
  UseCasesInterface,
  createTransactionPinSchema,
  transactionPinSchema,
} from "@/shared"
import { setLoadingFalse, setLoadingTrue } from "@/shared/redux/features"
import { useAppDispatch } from "@/shared/redux/types"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

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
import { useUser } from "@/hooks/user/useUser"
import PinInput from "react-pin-input"
import { yupResolver } from "@hookform/resolvers/yup"
import { passwordHash } from "@/utils/helpers"

interface UsernameInputProps extends Partial<FieldValues> {
  username: string
}

export default function TransactionPin() {
  const Router = useRouter()
  const dispatch = useAppDispatch()

  const [useCases, setUseCases] = useState<UseCasesInterface[]>()
  const [selectedUseCases, setSelectedUseCases] = useState<number[]>([])

  const getData = async () => {
    try {
      const response = await userService.getUseCases()
      const data = response
      setUseCases(data)
    } catch (error) {
      console.log(error)
    }
  }
  const handleSubmit = async () => {
    if (selectedUseCases.length === 0) {
      toast({
        title: "Select at least one use case",
        description: "Please select at least one use case",
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
    const data = { use_case_ids: selectedUseCases }
    try {
      dispatch(setLoadingTrue())

      await userService.addAccountUsecase(data)
      Router.push("/profile/preference/success")
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
        duration: 5000,
      })
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <Loading />

      <SetupLayout bg='bg-profile-1'>
        <div className=' px-5 lg:px-[60px]  py-[50px] flex flex-col justify-center gap-[112px] '>
          <div className='flex justify-between items-center  '>
            <div className='hidden lg:block'>
              <IconRaizColored />
            </div>
            <SkipLink link='/dashboard' />
          </div>
          <Header activeStep={4} />

          <div className=' bg-neutral-20 py-16 px-8 rounded-xl flex flex-col gap-[88px] '>
            <div className='  flex flex-col gap-10'>
              <div className=' flex flex-col gap-2 '>
                <h2 className=' text-t-28 font-medium text-purple '>
                  What would you like to use your Raiz account for?{" "}
                </h2>
                <p className=' text-t-16 text-neutral-90  '>
                  We ask so we can better customize your Raiz banking experience
                </p>
              </div>

              <div className=' flex flex-wrap gap-4 '>
                {useCases?.map((useCase, index) => (
                  <div
                    className={`
                     py-2  px-8 rounded-full cursor-pointer ${
                       selectedUseCases.includes(useCase.use_case_id)
                         ? "bg-neutral-80 text-white"
                         : " bg-purple text-white"
                     }  
                      `}
                    key={index}
                    onClick={() => {
                      if (selectedUseCases.includes(useCase.use_case_id)) {
                        setSelectedUseCases(
                          selectedUseCases.filter(
                            (item) => item !== useCase.use_case_id
                          )
                        )
                      } else {
                        setSelectedUseCases([
                          ...selectedUseCases,
                          useCase.use_case_id,
                        ])
                      }
                    }}
                  >
                    {useCase.use_case_emoji} {useCase.use_case_description}
                  </div>
                ))}
              </div>

              <div className=''>
                <BtnMain
                  btnText='Done'
                  btnStyle=' bg-purple text-grey w-full  '
                  onClick={() => handleSubmit()}
                />
              </div>
            </div>
          </div>
        </div>
      </SetupLayout>
    </>
  )
}
