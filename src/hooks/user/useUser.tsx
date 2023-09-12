import { useQuery, useQueryClient } from "@tanstack/react-query"
import { userService } from "@/services"

import { UserInterface, queryKeys } from "@/shared"
import { useEffect } from "react"

async function getUser(): Promise<UserInterface> {
  const response = await userService.getCurrentUser()
  return response
}

export function useUser(): UserInterface | undefined {
  // const queryClient = useQueryClient()
  const { data } = useQuery({
    queryKey: [queryKeys.user],
    queryFn: getUser,
    refetchInterval: 30000,
  })

  // useEffect(() => {
  //   // Refetch the data on page reload
  //   queryClient.prefetchQuery([queryKeys.user], getUser)
  // }, [queryClient])
  return data
}
