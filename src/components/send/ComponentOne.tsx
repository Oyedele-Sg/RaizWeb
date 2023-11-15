import { userService } from "@/services"
import {
  FavoriteAccountsDataInterface,
  FormTitledContainer,
  IconRaizColored,
  IconScan,
  IconSearch,
  NavigationButtons,
  NextArrow,
  QrCode,
  RegisterInput,
  SetupLayout,
  UserInterface,
  UserSearchInterface,
} from "@/shared"
import React, { useEffect, useState } from "react"
import { toast } from "@/components/ui/use-toast"
import { useForm, FormProvider } from "react-hook-form"
import { useAppDispatch } from "@/shared/redux/types"
import { setLoadingFalse, setLoadingTrue } from "@/shared/redux/features"
import { useRouter } from "next/navigation"
import { useFavouriteAccounts } from "@/hooks/fav-accounts/useFavouriteAccount"
import { RecentAccountsComponent } from "./RecentAccountsComponent"
import { SearchSelect, SearchSelectItem } from "@tremor/react"
import { PendingRequests } from "./PendingRequests"
import { Icon } from "@mui/material"
import Image from "next/image"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Prop {
  //   searchQuery: string
  setSearchResults: React.Dispatch<
    React.SetStateAction<UserSearchInterface | undefined>
  >
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>
  searchResults: UserSearchInterface | undefined
  title: string
  subtitle: string
}

interface SearchInput {
  query: string
}

export function ComponentOne({
  setSearchResults,
  setCurrentStep,
  searchResults,
  title,
  subtitle,
}: Prop) {
  const Router = useRouter()
  const accounts = useFavouriteAccounts()?.filter(
    (account) => account.favourite === true
  )
  const methods = useForm<UserSearchInterface>({
    defaultValues: {
      account_user_id: "",
      first_name: "",
      last_name: "",
      username: "",
    },
  })

  const dispatch = useAppDispatch()
  const [searchQuery, setSearchQuery] = useState<UserSearchInterface[]>([])

  const onSubmit = async (data: UserSearchInterface) => {
    if (
      !data.account_user_id ||
      !data.first_name ||
      !data.last_name ||
      !data.username
    )
      return
  }

  return (
    <>
      <QrCode />
      <div>
        <SetupLayout bg='bg-profile-1'>
          <div className=' my-[72px] mx-5 lg:mx-[72px] flex flex-col gap-[84px] '>
            <IconRaizColored />

            <div className=' flex flex-col gap-3 '>
              <NavigationButtons />

              <FormTitledContainer
                title={title}
                subtitle={subtitle}
                utils={<Utils setCurrentStep={setCurrentStep} />}
              >
                {/* <BtnMain btnText='Next' btnStyle=' authBtn ' /> */}

                <RecentAccountsComponent
                  methods={methods}
                  setSearchResults={setSearchResults}
                  setSearchQuery={setSearchQuery}
                  setCurrentStep={setCurrentStep}
                />

                <div className=''>
                  {/* <h3 className=' font-label__large text-neutral-80 '>
                    Favorites
                  </h3> */}
                  <Select
                    onValueChange={(value) => {
                      const selectedBank = accounts?.find(
                        (account) => account.favourite_account_user_id === value
                      ) as FavoriteAccountsDataInterface
                      methods.setValue(
                        "first_name",
                        selectedBank.favourite_account_user.first_name
                      )
                      methods.setValue(
                        "last_name",
                        selectedBank?.favourite_account_user.last_name
                      )
                      methods.setValue(
                        "username",
                        selectedBank?.favourite_account_user.username
                      )
                      methods.setValue(
                        "account_user_id",
                        selectedBank?.favourite_account_user.account_user_id
                      )
                      setSearchResults(selectedBank?.favourite_account_user)
                      setSearchQuery && setSearchQuery([])
                      setCurrentStep && setCurrentStep(2)
                      // // @ts-ignore
                      // // methods.setValue("bank_name", selectedBank.bankName)
                      // // @ts-ignore
                      // methods.setValue(
                      //   "beneficiary_bank_code",
                      //   selectedBank?.bankCode as string
                      // )
                      // methods.setValue(
                      //   "beneficiary_bank_name",
                      //   selectedBank?.bankName as string
                      // )
                    }}
                  >
                    <SelectTrigger className='w-full outline-none rounded-none border-b-purple border-[1px] border-t-0 border-x-0  input_field-input capitalize  z-50  '>
                      <SelectValue
                        placeholder='Select Favourite Account'
                        className='   '
                      />
                    </SelectTrigger>
                    <SelectContent className=' bg-neutral-20 text-neutral-90 h-[200px] overflow-auto z-50 '>
                      {accounts?.map((account, index) => (
                        <SelectItem
                          key={parseInt(account.favourite_account_user_id)}
                          // @ts-ignore
                          value={account.favourite_account_user_id}
                          className=' hover:bg-neutral-50 z-50 '
                        >
                          <div className=' flex  items-center gap-2 '>
                            <Avatar className=' cursor-default border-neutral-30 border-[2px] w-[24px] h-[24px] bg-neutral-20 '>
                              <AvatarImage
                                src={
                                  account.favourite_account_user
                                    .profile_image_url
                                }
                              />
                              <AvatarFallback className=' text-purple font-bold   '>
                                {account.favourite_account_user.first_name.charAt(
                                  0
                                )}
                                {account.favourite_account_user.last_name.charAt(
                                  0
                                )}
                              </AvatarFallback>
                            </Avatar>
                            <span className=''>
                              {account.favourite_account_user.first_name}{" "}
                              {account.favourite_account_user.last_name}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <PendingRequests />
              </FormTitledContainer>
            </div>
          </div>
        </SetupLayout>
      </div>
    </>
  )
}

interface UtilsProp {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>
}

function Utils({ setCurrentStep }: UtilsProp) {
  return (
    <>
      <div className='flex gap-6  items-center  '>
        <Image
          src='/icons/search.svg'
          width={20}
          height={20}
          alt=''
          onClick={() => setCurrentStep(3)}
        />
        <IconScan />
      </div>
    </>
  )
}
