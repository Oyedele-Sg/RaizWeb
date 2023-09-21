import { userService } from "@/services"
import {
  AuthButton,
  BackBtnCircle,
  BtnMain,
  RequestDataInterface,
  FormTitledContainer,
  IconPesaColored,
  NextArrow,
  RegisterInput,
  SetupLayout,
  UserSearchInterface,
  BackArrow,
} from "@/shared"
import React, { useEffect, useRef, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { toast } from "../ui/use-toast"
import { useAppDispatch } from "@/shared/redux/types"
import { setLoadingFalse, setLoadingTrue } from "@/shared/redux/features"
import { useRouter } from "next/navigation"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useCategory } from "@/hooks/category/useCategory"

interface Props {
  searchResult: UserSearchInterface | undefined
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>
  setSearchResults?: React.Dispatch<
    React.SetStateAction<UserSearchInterface | undefined>
  >
}

export function ComponentTwo({
  searchResult,
  setSearchResults,
  setCurrentStep,
}: Props) {
  const Router = useRouter()
  const dispatch = useAppDispatch()
  const category = useCategory()

  const methods = useForm<RequestDataInterface>({
    defaultValues: {
      transaction_amount: 0,
      requestee_account_id: searchResult?.account_user_id || "",
      narration: "",
      category_id: 0,
      currency: "NGN",
    },
  })

  const onSubmit = async (data: RequestDataInterface) => {
    try {
      dispatch(setLoadingTrue())
      await userService.requestFunds(data)

      dispatch(setLoadingFalse())
      Router.push("/request/success")
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
      })
      dispatch(setLoadingFalse())
    }
  }

  return (
    <div>
      <SetupLayout bg='bg-profile-1'>
        <div className='my-[72px] mx-5 lg:mx-[72px] flex flex-col gap-[84px] '>
          <IconPesaColored />

          <div className=' flex flex-col gap-3 '>
            <div className='flex'>
              <div
                className=''
                onClick={() => {
                  setCurrentStep(1)
                }}
              >
                <BackArrow />
              </div>
              <button title='next' className=''>
                <NextArrow />
              </button>
            </div>

            <FormTitledContainer title='Request ' subtitle={"Enter Amount"}>
              {searchResult && (
                <h2 className='text-purple font-title__large   '>
                  {searchResult?.first_name} {searchResult?.last_name}
                </h2>
              )}

              <FormProvider {...methods}>
                <form
                  action=''
                  onSubmit={methods.handleSubmit(onSubmit)}
                  className=' flex flex-col gap-6 '
                >
                  <RegisterInput
                    name={`transaction_amount`}
                    inputPlaceholder={`Enter Amount`}
                    label='Amount'
                    rules={{
                      required: "Input an amount",
                      pattern: {
                        value: /^[0-9]*$/,
                        message: " Amount must be a number ",
                      },
                    }}
                  />
                  <RegisterInput
                    name={`narration`}
                    inputPlaceholder={`Transaction description `}
                    label='Description'
                  />
                  <Select
                    onValueChange={(value) => {
                      const selectedBank = category?.find(
                        (cat) => cat.category_name === value
                      )
                      // @ts-ignore
                      methods.setValue(
                        "category_id",
                        selectedBank?.category_id as number
                      )
                      // @ts-ignore
                    }}
                  >
                    <SelectTrigger className='w-full  rounded-none border-b-purple border-[1px] border-t-0 border-x-0 input_field-input capitalize  z-50 '>
                      <SelectValue
                        placeholder='Select a category '
                        className=' text-purple capitalize   '
                      />
                    </SelectTrigger>
                    <SelectContent className=' bg-neutral-20 text-neutral-90 h-[200px] overflow-auto capitalize z-50 '>
                      {category?.map((cat, index) => (
                        <SelectItem
                          key={cat.category_id}
                          // @ts-ignore
                          value={cat.category_name}
                          className=' hover:bg-neutral-50 z-50 '
                          onClick={(value) => {
                            methods.setValue("category_id", cat.category_id)
                          }}
                        >
                          {cat.category_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className=' flex gap-12 '>
                    <AuthButton btnText='Send Request' btnStyle=' w-full ' />
                  </div>
                </form>
              </FormProvider>
            </FormTitledContainer>
          </div>
        </div>
      </SetupLayout>
    </div>
  )
}
