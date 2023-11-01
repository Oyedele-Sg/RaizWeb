import { userService } from "@/services"
import {
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
                utils={<Utils />}
              >
                {/* <BtnMain btnText='Next' btnStyle=' authBtn ' /> */}

                <RecentAccountsComponent
                  methods={methods}
                  setSearchResults={setSearchResults}
                  setSearchQuery={setSearchQuery}
                  setCurrentStep={setCurrentStep}
                />

                <div className=''>
                  <h3 className=' font-label__large text-neutral-80 '>
                    Search
                  </h3>
                  <FormProvider {...methods}>
                    <form
                      action=''
                      onSubmit={methods.handleSubmit(onSubmit)}
                      className=' flex flex-col gap-6 '
                    >
                      <div className=''>
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
                                methods.setValue("first_name", user.first_name)
                                methods.setValue("last_name", user.last_name)
                                methods.setValue("username", user.username)
                                methods.setValue(
                                  "account_user_id",
                                  user.account_user_id
                                )
                                setSearchResults(user)
                                setSearchQuery([])
                                setCurrentStep(2)
                                methods.reset()
                              }}
                            >
                              <p className='text-neutral-90  p-[0.5rem]'>
                                {user.first_name} {user.last_name}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </form>
                  </FormProvider>
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

function Utils() {
  return (
    <>
      <div className='flex gap-6  items-center  '>
        <IconScan />
      </div>
    </>
  )
}
