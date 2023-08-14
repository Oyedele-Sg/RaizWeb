import { userService } from "@/services"
import {
  AuthButton,
  BackBtnCircle,
  BtnMain,
  RequestDataInterface,
  FormTitledContainer,
  IconPesaColored,
  IconScan,
  IconSearch,
  NextArrow,
  OTPFormValues,
  RegisterInput,
  SetupLayout,
  UserSearchInterface,
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
}

export function ComponentTwo({ searchResult, setCurrentStep }: Props) {
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
    console.log("request", data)
    try {
      // const res = await userService.searchWallets(data.transaction_amount)+
      //   setSearchResults(res)
      dispatch(setLoadingTrue())
      await userService.requestFunds(data)
      toast({
        title: " Request sent successfully",
        description:
          " Your request has been sent successfully, you will be notified when the request is accepted  ",
        style: {
          backgroundColor: "#4caf50",
          color: "#fff",
        },
      })
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
        <div className=' m-[72px] flex flex-col gap-[84px] '>
          <IconPesaColored />

          <div className=' flex flex-col gap-3 '>
            <div className='' onClick={() => Router.refresh}>
              <BackBtnCircle />
              <button title='next' className=''>
                <NextArrow />
              </button>
            </div>

            <FormTitledContainer
              title='Request '
              subtitle={"Enter Amount"}
              // utils={<Utils />}
            >
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
                    <SelectTrigger className='w-full ro border-b-purple border-[1px] '>
                      <SelectValue
                        placeholder='Select A category '
                        className=' text-purple capitalize   '
                      />
                    </SelectTrigger>
                    <SelectContent className=' bg-neutral-20 text-neutral-90 h-[200px] overflow-auto capitalize '>
                      {category?.map((cat, index) => (
                        <SelectItem
                          key={cat.category_id}
                          // @ts-ignore
                          value={cat.category_name}
                          className=' hover:bg-neutral-50'
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

// function Utils() {
//   return (
//     <>
//       <div className='flex gap-6  items-center  '>
//         <IconSearch />
//         <IconScan />
//       </div>
//     </>
//   )
// }

// interface PinProps {
//   debitData?: RequestDataInterface
// }

// function Pin({ debitData }: PinProps) {
//   const dispatch = useAppDispatch()
//   const Router = useRouter()
//   const pinInputRefs = useRef<Array<HTMLInputElement | null>>([])
//   const methods = useForm<OTPFormValues>({
//     defaultValues: {
//       otp: [{ otp1: "" }, { otp2: "" }, { otp3: "" }, { otp4: "" }],
//     },
//   })

//   const onSubmit = async (data: OTPFormValues) => {
//     const pin = {
//       transaction_pin: `${data.otp1}${data.otp2}${data.otp3}${data.otp4}`,
//     }

//     if (!pin.transaction_pin) return

//     const transferData = {
//       debit_transfer: debitData as RequestDataInterface,
//       transaction_pin: pin,
//     }

//     try {
//       dispatch(setLoadingTrue())
//       await userService.walletTransfer(transferData)

//       toast({
//         title: " Money Sent",

//         style: {
//           backgroundColor: "#4B0082",
//           color: "#fff",
//         },
//         duration: 2000,
//       })
//       Router.push("/send/success")
//       dispatch(setLoadingFalse())
//     } catch (error) {
//       dispatch(setLoadingFalse())

//       toast({
//         title: "Error",
//         description: `${error}`,
//         variant: "destructive",
//         style: {
//           backgroundColor: "#f44336",
//           color: "#fff",
//           top: "20px",
//           right: "20px",
//         },
//       })
//     }
//   }

//   const handleInputChange = (index: number) => {
//     const currentValue = pinInputRefs.current[index]?.value
//     const prevValue = pinInputRefs.current[index - 1]?.value

//     if (currentValue && currentValue.length === 1) {
//       if (index < pinInputRefs.current.length - 1) {
//         pinInputRefs.current[index + 1]?.focus()
//       } else {
//         pinInputRefs.current[index]?.blur()
//         // Submit OTP or perform the desired action here
//       }
//     } else if (!currentValue && prevValue) {
//       pinInputRefs.current[index - 1]?.focus()
//     }
//   }
//   return (
//     <>
//       <div className=' '>
//         <form
//           onSubmit={methods.handleSubmit(onSubmit)}
//           className=' flex flex-col gap-8 '
//         >
//           <div className='flex gap-[33px] justify-between  '>
//             {Array.from({ length: 4 }, (_, index) => (
//               <input
//                 key={index}
//                 type='number'
//                 {...methods.register(`otp${index + 1}`, {
//                   required: true,
//                 })}
//                 inputMode='numeric'
//                 maxLength={1}
//                 className={`form-input otp_field-input spin-button-none ${
//                   methods.formState.errors[`otp${index + 1}`]
//                     ? "otp_field-input_error"
//                     : ""
//                 }`}
//                 ref={(ref) => {
//                   pinInputRefs.current[index] = ref
//                 }}
//                 onChange={(event) => {
//                   const { value } = event.target
//                   methods.setValue(`otp${index + 1}`, value)
//                   handleInputChange(index)
//                 }}
//               />
//             ))}
//           </div>

//           {(methods.formState.errors.otp1 ||
//             methods.formState.errors.otp2 ||
//             methods.formState.errors.otp3 ||
//             methods.formState.errors.otp4) && (
//             <span className=' text-center  text-error text-t-12  '>
//               OTP is required and must be 4 digits
//             </span>
//           )}

//           <div className=' flex gap-8 '>
//             <AuthButton
//               btnStyle='flex-1 w-full px-[42px] '
//               btnText={"Confirm Transfer"}
//               type='submit'
//             />
//           </div>
//         </form>
//       </div>
//     </>
//   )
// }
