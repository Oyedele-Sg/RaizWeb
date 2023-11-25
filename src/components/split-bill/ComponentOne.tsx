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
  UserInterface,
  UserSearchInterface,
  splitGroupSchema,
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

interface Prop {
  //   searchQuery: string
  setSelectedUsers: React.Dispatch<
    React.SetStateAction<(UserSearchInterface | AccountInterface)[]>
  >
  selectedUsers: (UserSearchInterface | AccountInterface)[]
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>
  setGroupName: React.Dispatch<React.SetStateAction<string>>
  total: number

  title: string
  subtitle: string
}

interface SearchInput {
  query: string
}

export function ComponentOne({
  setSelectedUsers,
  selectedUsers,
  setCurrentStep,
  title,
  subtitle,
  setGroupName,
  total,
}: Prop) {
  const Router = useRouter()
  const methods = useForm<{
    split_group_name: string
    total_amount: number
  }>({
    defaultValues: {
      split_group_name: "",
      total_amount: total,
    },
    resolver: yupResolver(splitGroupSchema),
  })

  const dispatch = useAppDispatch()
  const [searchQuery, setSearchQuery] = useState<UserSearchInterface[]>([])

  const onSubmit = async (data: {
    split_group_name: string
    total_amount: number
  }) => {
    if (selectedUsers.length === 0) {
      toast({
        title: "Error",
        description: `Please Add User `,
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
    setCurrentStep(2)
    setGroupName(data.split_group_name)

    methods.reset()
  }

  const removeUser = (userIdToRemove: string) => {
    setSelectedUsers((prevSelectedUsers) =>
      prevSelectedUsers.filter(
        (user) => user.account_user_id !== userIdToRemove
      )
    )
  }

  return (
    <div>
      <SetupLayout bg='bg-profile-1'>
        <div className='  mx-5 mt-[72px]   lg:mx-[72px] flex flex-col gap-[84px] '>
          <IconRaizColored />

          <div className=' flex flex-col gap-3  '>
            <div
              className=''
              onClick={() => {
                Router.back
              }}
            >
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
              <div className='flex flex-col gap-3  '>
                {selectedUsers.map((user) => (
                  <div className='flex items-center justify-between '>
                    <div className='flex items-center gap-5'>
                      <Avatar className=' cursor-default border-neutral-30 border-[2px] w-[40px] h-[40px] bg-neutral-20 '>
                        <AvatarImage src={user.profile_image_url} />
                        <AvatarFallback className=' text-purple font-bold   '>
                          {user.first_name.charAt(0)}
                          {user.last_name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <h2 className=' text-purple text-t-18 font-semi-mid '>
                        {" "}
                        {user.first_name + " " + user.last_name}{" "}
                      </h2>
                    </div>
                    <div
                      className=''
                      onClick={() => removeUser(user.account_user_id)}
                    >
                      <Image
                        src={`/icons/close-circle.svg`}
                        alt=''
                        height={20}
                        width={20}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className=''>
                <FormProvider {...methods}>
                  <form
                    action=''
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className=' flex flex-col gap-6 '
                  >
                    <RegisterInput
                      name='split_group_name'
                      inputPlaceholder='Enter group name'
                      label='Split Group Name'
                    />

                    <RegisterInput
                      name='total_amount'
                      inputPlaceholder='Enter Amount'
                      label='Total Amount'
                      disabled
                    />
                    <div className=''>
                      <h3 className=' font-label__large text-neutral-80 '>
                        Search
                      </h3>
                      <input
                        type='search'
                        name=''
                        id=''
                        className=' form-input outline-none bg-transparent  w-full max-h-[3rem] placeholder:text-neutral-70 placeholder:font-body__large border-x-0 border-t-0 border-b-[1px] border-b-purple   '
                        placeholder='Search with Username, Phone Number, or Email Address'
                        // value={searchQuery}
                        onChange={async (e) => {
                          if (!e.target.value) {
                            setSearchQuery([])
                            return
                          }
                          const response = await userService.searchWallets(
                            e.target.value
                          )
                          setSearchQuery(response)
                          // setSearchQuery(e.target.value)
                        }}
                      />

                      <div className=' bg-neutral-20 w-full '>
                        {searchQuery.map((user) => (
                          <div
                            className='flex w-full hover:bg-neutral-30    '
                            onClick={() => {
                              if (
                                !selectedUsers.some(
                                  (selectedUser) =>
                                    selectedUser.account_user_id ===
                                    user.account_user_id
                                )
                              ) {
                                // If not, add the user to selectedUsers
                                setSelectedUsers((prevSelectedUsers) => [
                                  ...prevSelectedUsers,
                                  user,
                                ])
                                setSearchQuery([])
                              }
                            }}
                          >
                            <p className='text-neutral-90  p-[0.5rem]'>
                              {user.first_name} {user.last_name}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <AuthButton btnText='Next' />
                  </form>
                </FormProvider>
              </div>
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
