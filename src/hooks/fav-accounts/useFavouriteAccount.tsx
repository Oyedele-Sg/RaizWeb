import { useQuery, useQueryClient } from "@tanstack/react-query"
import { userService } from "@/services"

import { FavoriteAccountsDataInterface, queryKeys } from "@/shared"
import { useEffect } from "react"

async function getFavAccounts(): Promise<FavoriteAccountsDataInterface[]> {
  const response = await userService.getFavoriteAccounts()
  return response
}

export function useFavouriteAccounts():
  | FavoriteAccountsDataInterface[]
  | undefined {
  // const queryClient = useQueryClient()
  const { data } = useQuery({
    queryKey: [queryKeys.favaccounts],
    queryFn: getFavAccounts,
  })

  // useEffect(() => {
  //   // Refetch the data on page reload
  //   queryClient.prefetchQuery([queryKeys.user], getUser)
  // }, [queryClient])
  return data
}
