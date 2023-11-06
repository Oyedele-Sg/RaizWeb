import { userService } from "@/services"
import {
  AccountInterface,
  AuthButton,
  BackBtnCircle,
  BtnMain,
  FormTitledContainer,
  IconRaizColored,
  IconScan,
  IconSearch,
  NextArrow,
  RegisterInput,
  SetupLayout,
  SplitRequestDataInterface,
  TransactionPinInterface,
  UserInterface,
  UserSearchInterface,
  createTransactionPinSchema,
  splitGroupSchema,
  transactionPinSchema,
} from "@/shared"
import React, { useEffect, useState } from "react"
import { toast } from "@/components/ui/use-toast"
import { useForm, FormProvider } from "react-hook-form"
import { useAppDispatch } from "@/shared/redux/types"
import { setLoadingFalse, setLoadingTrue } from "@/shared/redux/features"
import { useRouter } from "next/navigation"
import { useFavouriteAccounts } from "@/hooks/fav-accounts/useFavouriteAccount"
import { MultiSelect, MultiSelectItem } from "@tremor/react"
import AsyncSelect from "react-select/async"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"
import { yupResolver } from "@hookform/resolvers/yup"
import PinInput from "react-pin-input"
import { passwordHash } from "@/utils/helpers"

interface Prop {
  //   searchQuery: string
  setSelectedUsers: React.Dispatch<
    React.SetStateAction<(UserSearchInterface | AccountInterface)[]>
  >
  selectedUsers: (UserSearchInterface | AccountInterface)[]
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>
  setGroupName: React.Dispatch<React.SetStateAction<string>>
  groupName: string
  title: string
  subtitle: string
  total_amount: number
}

interface SearchInput {
  query: string
}

interface PinProps {
  debitData?: {
    split_group_reason: string
    split_members: [
      {
        member_id: string
        amount: number
        status_id: 2
      }
    ]
    total_amount: number
    currency: "NGN"
    category_id: null
  }
}

export function ComponentTwo({
  setSelectedUsers,
  selectedUsers,
  setCurrentStep,
  title,
  subtitle,
  groupName,
  setGroupName,
  total_amount,
}: Prop) {
  const Router = useRouter()

  const dispatch = useAppDispatch()
  const [searchQuery, setSearchQuery] = useState<UserSearchInterface[]>([])

  const onSubmit = async (data: { split_group_name: string }) => {
    setCurrentStep(2)
  }

  const [debitData, setDebitData] = useState<any>()

  const [memberDetails, setMemberDetails] = useState<
    { member_id: string; amount: number; status_id: number }[]
  >(
    selectedUsers.map((user) => ({
      member_id: user.account_user_id,
      amount: 0,
      status_id: 2,
    }))
  )

  const handleAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    userId: string
  ) => {
    const { value } = event.target

    const parsedAmount = isNaN(parseFloat(value)) ? 0 : parseFloat(value)

    const updatedMemberDetails = memberDetails.map((user) =>
      user.member_id === userId ? { ...user, amount: parsedAmount } : user
    )

    setMemberDetails(updatedMemberDetails)
  }

  const handleCustomSplit = () => {
    const totalAmountInMemberDetails = memberDetails.reduce(
      (acc, member) => acc + member.amount,
      0
    )

    if (!(totalAmountInMemberDetails === total_amount)) {
      toast({
        title: "Something Went Wrong",
        description: `Custom Split: Total amount does not match`,
        variant: "destructive",
        style: {
          backgroundColor: "#f44336",
          color: "#fff",
          top: "20px",
          right: "20px",
        },
      })
    } else {
      setDone(true)
    }
  }

  const [done, setDone] = useState(false)
  const [pin, setPin] = useState(false)

  const handleDone = () => {
    setPin(true)
  }

  const handleEvenSplit = () => {
    const totalAmount = total_amount

    const evenSplitAmount = totalAmount / memberDetails.length

    const updatedMemberDetails = memberDetails.map((member) => ({
      ...member,
      amount: evenSplitAmount,
    }))

    // Update the state with the new memberDetails array
    setMemberDetails(updatedMemberDetails)
    setDone(true)
  }

  useEffect(() => {
    setDebitData({
      split_group_reason: groupName,
      split_members: [...memberDetails],
      total_amount: total_amount,
      currency: "NGN",
      category_id: null,
    })
  }, [memberDetails])

  return (
    <div>
      <SetupLayout bg='bg-profile-1'>
        <div className='  mx-5  mt-[72px] lg:mx-[72px] flex flex-col gap-[84px] '>
          <IconRaizColored />

          <div className=' flex flex-col gap-3 '>
            <div className='' onClick={() => Router.back}>
              <BackBtnCircle />
              <button title='next' className=''>
                <NextArrow />
              </button>
            </div>

            <FormTitledContainer
              title={title}
              subtitle={subtitle}
              utils={<Utils />}
            >
              {pin ? (
                <Pin debitData={debitData} />
              ) : (
                <div className=''>
                  <div className=' flex flex-col gap-6 '>
                    {selectedUsers.map((user, index) => (
                      <div className='flex flex-col gap-5 '>
                        <div className='flex items-center gap-5'>
                          <Avatar className=' cursor-pointer border-neutral-30 border-[2px] w-[48px] h-[48px] bg-neutral-20 '>
                            <AvatarImage src={user.profile_image_url} />
                            <AvatarFallback className=' text-purple font-bold   '>
                              {user.first_name.charAt(0)}
                              {user.last_name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <h2 className=' text-purple text-t-22 font-semi-mid '>
                            {" "}
                            {user.first_name + " " + user.last_name}{" "}
                          </h2>
                        </div>
                        <div className=''>
                          <h3 className=' font-label__large text-neutral-80 '>
                            Amount
                          </h3>
                          <input
                            className={`  form-input outline-none bg-transparent  w-full max-h-[3rem] placeholder:text-neutral-70 placeholder:font-body__large border-x-0 border-t-0 border-b-[1px] border-b-purple   `}
                            type={"number"}
                            placeholder={"Type the Amount"}
                            autoComplete='off'
                            defaultValue={
                              Math.round(
                                (memberDetails.find(
                                  (member) =>
                                    member.member_id === user.account_user_id
                                )?.amount as number) * 100
                              ) / 100 || ""
                            }
                            value={
                              Math.round(
                                (memberDetails.find(
                                  (member) =>
                                    member.member_id === user.account_user_id
                                )?.amount as number) * 100
                              ) / 100 || ""
                            }
                            onChange={(event) =>
                              handleAmountChange(event, user.account_user_id)
                            }
                          />
                        </div>
                      </div>
                    ))}
                    {!done ? (
                      <div className=' flex justify-between gap-12 '>
                        <BtnMain
                          btnText=' Next'
                          btnStyle=' border-neutral-100 border-[1px]  text-purple  flex-1 '
                          onClick={handleCustomSplit} // Add this onClick handler
                        />
                        <AuthButton
                          btnText='Even Split'
                          btnStyle=' flex-1 '
                          onClick={handleEvenSplit} // Add this onClick handler
                        />
                      </div>
                    ) : (
                      <AuthButton
                        btnText='Confirm Split Bill Request'
                        btnStyle=' flex-1 '
                        onClick={handleDone} // Add this onClick handler
                      />
                    )}
                  </div>
                </div>
              )}
            </FormTitledContainer>
          </div>
        </div>
      </SetupLayout>
    </div>
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

function Pin({ debitData }: PinProps) {
  const dispatch = useAppDispatch()
  const Router = useRouter()
  const methods = useForm<TransactionPinInterface>({
    defaultValues: {
      transaction_pin: "",
    },
    resolver: yupResolver(createTransactionPinSchema),
  })

  const onSubmit = async (data: TransactionPinInterface) => {
    if (!data.transaction_pin) {
      toast({
        title: "OTP is required",
        variant: "destructive",
        style: {
          backgroundColor: "#f44336",
          color: "#fff",
          top: "20px",
          right: "20px",
        },
      })
      return
    }

    const transferData = {
      split_group: debitData,
      transaction_pin: {
        ...data,
        transaction_pin: passwordHash(data.transaction_pin),
      },
    }

    try {
      dispatch(setLoadingTrue())
      await userService.requestSplitFunds(
        transferData as SplitRequestDataInterface
      )

      Router.push("/split-bill/success")
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
