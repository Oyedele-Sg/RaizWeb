import {
  FavoriteAccountsDataInterface,
  ExternalDebitTransferInterface,
} from "@/shared"
import React from "react"
import { useForm, FormProvider, UseFormReturn } from "react-hook-form"
// import { UseFormReturn } from "react-hook-form/dist/types/form"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useFavouriteAccounts } from "@/hooks/fav-accounts/useFavouriteAccount"
import { useExternalFavouriteAccounts } from "@/hooks/fav-accounts/useExternalFavAccounts"

interface Prop {
  methods: UseFormReturn<ExternalDebitTransferInterface, any, undefined>
  setSearchResults?: React.Dispatch<
    React.SetStateAction<ExternalDebitTransferInterface | undefined>
  >
}

export function RecentAccountExternalComponent({
  methods,
  setSearchResults,
}: Prop) {
  const accounts = useExternalFavouriteAccounts()

  return (
    <>
      {accounts && accounts?.length > 0 && (
        <div className=' flex flex-col  gap-2 '>
          <h3 className=' font-label__large text-neutral-80 '>Recent</h3>
          <div className=' flex gap-2  '>
            {accounts?.map((account) => (
              <Avatar
                key={account.account_user_id}
                className=' cursor-pointer border-neutral-30 border-[2px] w-[44px] h-[44px] bg-neutral-20 '
                onClick={() => {
                  methods.setValue(
                    "beneficiary_account_name",
                    account.external_account.bank_account_name
                  )
                  methods.setValue(
                    "beneficiary_bank_code",
                    account.external_account.bank_short_code
                  )
                  methods.setValue(
                    "beneficiary_account_number",
                    account.external_account.bank_account_number
                  )
                }}
              >
                {/* <AvatarImage src='https://github.com/shadcn.png' /> */}
                <AvatarFallback className=' text-purple font-bold   '>
                  {account.external_account.bank_account_name.charAt(0)}
                  {account.external_account.bank_account_name.charAt(1)}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
