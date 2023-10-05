import { userService } from "@/services"
import {
  AuthButton,
  BackArrow,
  BackBtnCircle,
  BtnMain,
  CheckBox,
  DebitTransferInterface,
  FormTitledContainer,
  IconPesaColored,
  IconScan,
  IconSearch,
  NextArrow,
  QrCode,
  RegisterInput,
  SetupLayout,
  TransactionPinInterface,
  UserSearchInterface,
  transactionPinSchema,
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
import PinInput from "react-pin-input"
import { yupResolver } from "@hookform/resolvers/yup"

interface SearchInput {
  transaction_amount: number | null
  receiver_account_user_id: string

  transaction_remarks: string
  category_id: number | null
}

interface Props {
  searchResult: UserSearchInterface | undefined
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>
  setSearchResults: React.Dispatch<
    React.SetStateAction<UserSearchInterface | undefined>
  >
}

export function ComponentTwo({
  searchResult,
  setCurrentStep,
  setSearchResults,
}: Props) {
  const Router = useRouter()
  const [debitData, setDebitData] = useState<DebitTransferInterface>()
  const [favorite, setFavorite] = useState<boolean>(false)
  const category = useCategory()

  const methods = useForm<SearchInput>({
    defaultValues: {
      transaction_amount: null,
      receiver_account_user_id: searchResult?.account_user_id || "",
      transaction_remarks: "",
      category_id: null,
    },
  })

  const onSubmit = async (data: SearchInput) => {
    try {
      setDebitData(data)
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
    }
  }

  const handleInputChange = () => {
    
  }


  return (
    <>
      <QrCode />
      <div>
        <SetupLayout bg='bg-profile-1'>
          <div className='  my-[72px] mx-5 lg:mx-[72px] flex flex-col gap-[84px]  '>
            <IconPesaColored />

            <div className=' flex flex-col gap-3 '>
              <div className=''>
                <button
                  title='back'
                  className=''
                  onClick={() => {
                    setSearchResults(undefined)
                    setCurrentStep(1)
                  }}
                >
                  <BackArrow />
                </button>
                <button title='next' className=''>
                  <NextArrow />
                </button>
              </div>

              <FormTitledContainer
                title='Send Money'
                subtitle={debitData ? "Enter Transaction Pin" : "Enter Amount"}
                utils={<Utils />}
              >
                {searchResult && (
                  <h2 className='text-purple font-title__large   '>
                    {searchResult?.first_name} {searchResult?.last_name}
                  </h2>
                )}

                {debitData ? (
                  <Pin debitData={debitData} />
                ) : (
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
                        name={`transaction_remarks`}
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
                        <SelectTrigger className='w-full outline-none rounded-none border-b-purple border-[1px] border-t-0 border-x-0  input_field-input capitalize  z-50  '>
                          <SelectValue
                            placeholder='Select A category '
                            className=' text-purple capitalize placeholder:text-neutral-50   '
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

                      <div className=' flex items-center gap-2  '>
                        <CheckBox checked={favorite} setChecked={setFavorite} handleClick={() =>  handleInputChange() }  />{" "}
                        <span className='text-neutral-90'>
                          Save as beneficiary
                        </span>
                      </div>
                      <div className=' flex gap-12 '>
                        <AuthButton
                          btnText='Make Transfer'
                          btnStyle=' w-full '
                        />
                      </div>
                    </form>
                  </FormProvider>
                )}
              </FormTitledContainer>
            </div>
          </div>
        </SetupLayout>
      </div>
    </>
  )
}

function Utils() {
  return (
    <>
      <div className='flex gap-6  items-center  '>
        <IconScan />
      </div>
    </>
  )
}

interface PinProps {
  debitData?: DebitTransferInterface
}

function Pin({ debitData }: PinProps) {
  const dispatch = useAppDispatch()
  const Router = useRouter()
  const pinInputRefs = useRef<Array<HTMLInputElement | null>>([])
  const methods = useForm<TransactionPinInterface>({
    defaultValues: {
      transaction_pin: "",
    },
    resolver: yupResolver(transactionPinSchema),
  })

  const onSubmit = async (data: TransactionPinInterface) => {
    const transferData = {
      debit_transfer: debitData as DebitTransferInterface,
      transaction_pin: data,
    }

    try {
      dispatch(setLoadingTrue())
      await userService.walletTransfer(transferData)
      Router.push("/send/success")
      dispatch(setLoadingFalse())
    } catch (error) {
      dispatch(setLoadingFalse())

      if (error === "Insufficient funds") {
        Router.push("/send/failed")
      }

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

  const handleInputChange = (value: string, index: number) => {
    methods.setValue("transaction_pin", value)
  }
  return (
    <>
      <div className=' '>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className=' flex flex-col gap-8 '
        >
          <PinInput
            length={4}
            initialValue=''
            secret
            onChange={(value, index) => handleInputChange(value, index)}
            type='numeric'
            inputMode='number'
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
            inputStyle={{
              padding: "10px",
              borderTop: "none",
              borderLeft: "none",
              borderRight: "none",
              borderBottom: "1px solid #4B0082",
            }}
            inputFocusStyle={{
              borderBottom: "1px solid #4B0082",
            }}
            autoSelect={true}
            regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
          />

          {methods.formState.errors.transaction_pin && (
            <span className=' text-center  text-error text-t-12  '>
              OTP is required and must be 4 digits
            </span>
          )}

          <div className=' flex gap-8 '>
            <AuthButton
              btnStyle='flex-1 w-full px-[42px] '
              btnText={"Confirm Transfer"}
              type='submit'
            />
          </div>
        </form>
      </div>
    </>
  )
}
