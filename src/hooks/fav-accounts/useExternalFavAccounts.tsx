import { useQuery, useQueryClient } from "@tanstack/react-query"
import { userService } from "@/services"

import {
  ExternalFavoriteAccountsDataInterface,
  FavoriteAccountsDataInterface,
  queryKeys,
} from "@/shared"
import { useEffect } from "react"

async function getFavAccounts(): Promise<
  ExternalFavoriteAccountsDataInterface[]
> {
  const response = await userService.getExternalFavoriteAccounts()
  return response
}

export function useExternalFavouriteAccounts():
  | ExternalFavoriteAccountsDataInterface[]
  | undefined {
  // const queryClient = useQueryClient()
  const { data } = useQuery({
    queryKey: [queryKeys.exfavaccounts],
    queryFn: getFavAccounts,
  })

  // useEffect(() => {
  //   // Refetch the data on page reload
  //   queryClient.prefetchQuery([queryKeys.user], getUser)
  // }, [queryClient])
  return data
}
