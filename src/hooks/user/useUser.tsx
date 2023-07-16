import { useQuery, useQueryClient } from "@tanstack/react-query"
import { userService } from "@/services"

import { UserInterface, queryKeys } from "@/shared"

async function getUser(): Promise<UserInterface> {
  const response = await userService.getCurrentUser()
  return response
}

export function useUser(): UserInterface | undefined {
  const { data } = useQuery({
    queryKey: [queryKeys.user],
    queryFn: getUser,
  })
  return data
}
