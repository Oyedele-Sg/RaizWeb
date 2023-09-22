import { FavoriteAccountsDataInterface, UserSearchInterface } from "@/shared"
import React from "react"
import { useForm, FormProvider, UseFormReturn } from "react-hook-form"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useFavouriteAccounts } from "@/hooks/fav-accounts/useFavouriteAccount"

interface Prop {
  methods: UseFormReturn<UserSearchInterface, any, undefined>
  setSearchResults: React.Dispatch<
    React.SetStateAction<UserSearchInterface | undefined>
  >
  setSearchQuery?: React.Dispatch<React.SetStateAction<UserSearchInterface[]>>
  setCurrentStep?: React.Dispatch<React.SetStateAction<number>>
}

export function RecentAccountsComponent({
  methods,
  setSearchResults,
  setSearchQuery,
  setCurrentStep,
}: Prop) {
  const accounts = useFavouriteAccounts()

  return (
    <>
      {accounts && accounts?.length > 0 && (
        <div className=' flex flex-col  gap-2 '>
          <h3 className=' font-label__large text-neutral-80 '>Recent</h3>
          <div className=' flex gap-2  '>
            {accounts?.map((account) => (
              <div
                className='flex flex-col gap-2 items-center'
                key={account.account_user_id}
                onClick={() => {
                  methods.setValue(
                    "first_name",
                    account.favourite_account_user.first_name
                  )
                  methods.setValue(
                    "last_name",
                    account.favourite_account_user.last_name
                  )
                  methods.setValue(
                    "username",
                    account.favourite_account_user.username
                  )
                  methods.setValue(
                    "account_user_id",
                    account.favourite_account_user.account_user_id
                  )
                  setSearchResults(account.favourite_account_user)
                  setSearchQuery && setSearchQuery([])
                  setCurrentStep && setCurrentStep(2)
                  methods.reset()
                }}
              >
                <Avatar className=' cursor-pointer border-neutral-30 border-[2px] w-[44px] h-[44px] bg-neutral-20 '>
                  {/* <AvatarImage src='https://github.com/shadcn.png' /> */}
                  <AvatarFallback className=' text-purple font-bold   '>
                    {account.favourite_account_user.first_name.charAt(0)}
                    {account.favourite_account_user.last_name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <p className=' capitalize text-purple text-t-14   '>
                  {account.favourite_account_user.username}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
