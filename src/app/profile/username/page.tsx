"use client"

import { Header, StepperComponent } from "@/components"
import { toast } from "@/components/ui/use-toast"
import { userService } from "@/services"
import {
  BtnMain,
  IconRaizColored,
  Loading,
  RegisterInput,
  SetupLayout,
  SkipLink,
} from "@/shared"
import { setLoadingFalse, setLoadingTrue } from "@/shared/redux/features"
import { useAppDispatch } from "@/shared/redux/types"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

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

export default function Username() {
  const Router = useRouter()
  const dispatch = useAppDispatch()
  const methods = useForm<UsernameInputProps>({
    defaultValues: {
      username: "",
    },
  })

  const [suggestions, setSuggestions] = useState<string[]>([])
  const [username, setUsername] = useState<string>("")

  const onSubmit = async (data: UsernameInputProps) => {
    try {
      dispatch(setLoadingTrue())
      await userService.updateUsername(
        data.username ? data : { username: username }
      )

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

  const [clickedIndex, setClickedIndex] = useState(-1)

  const handleClick = (index: number, word: string) => {
    if (clickedIndex === index) {
      // If the same item is clicked again, hide the image
      setClickedIndex(-1)
    } else {
      // Otherwise, show the image for the clicked item
      setClickedIndex(index)
      setUsername(word)
      methods.resetField("username")
    }
  }

  const getData = async () => {
    try {
      const response = await userService.suggestUsername(
        methods.watch("username")
      )
      setSuggestions(response)
    } catch (error) {}
  }

  useEffect(() => {
    getData()
  }, [methods.watch("username")])

  return (
    <>
      <Loading />

      <SetupLayout bg='bg-profile-1'>
        <div className=' px-5 lg:px-[60px]  py-[50px] flex flex-col justify-center gap-[112px] '>
          <div className='flex justify-between items-center  '>
            <div className='hidden lg:block'>
              <IconRaizColored />
            </div>
            <SkipLink link='/profile/create-pin' />
          </div>
          <Header activeStep={0} />

          <div className=' bg-neutral-20 py-16 px-8 rounded-xl flex flex-col gap-[88px] '>
            <div className=''>
              <FormProvider {...methods}>
                <form
                  className=' flex  flex-col gap-4 '
                  onSubmit={methods.handleSubmit(onSubmit)}
                >
                  {username ? (
                    <div className=''>
                      <div className='flex flex-col gap-3 '>
                        <p className={`font-label__large text-neutral-90  `}>
                          Username
                        </p>
                        <div className=' flex justify-between '>
                          <h2 className=' text-purple font-semi-bold text-t-18  '>
                            {" "}
                            {username}{" "}
                          </h2>

                          <div
                            className=''
                            onClick={() => {
                              setUsername("")
                              methods.setValue("username", "")
                              setClickedIndex(-1)
                            }}
                          >
                            <Image
                              src='/icons/close-circle.svg'
                              alt=''
                              width={20}
                              height={20}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <RegisterInput
                      name={`username`}
                      inputPlaceholder={`Enter Username`}
                      rules={{
                        required: "Username is required",
                      }}
                      label='Username'
                    />
                  )}

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
                {suggestions.map((word, index) => (
                  <div
                    key={index}
                    className=' flex items-center gap-4  cursor-pointer rounded-lg bg-purple px-8 py-2 '
                    onClick={() => handleClick(index, word)}
                  >
                    <p className=' font-body__large text-grey '>{word}</p>
                    {clickedIndex === index && (
                      <Image
                        src='/icons/check.svg'
                        alt=''
                        width={20}
                        height={20}
                      />
                    )}
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
