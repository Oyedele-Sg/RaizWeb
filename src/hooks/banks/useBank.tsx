import { useQuery, useQueryClient } from "@tanstack/react-query"
import { userService } from "@/services"

import { BankDataInterface, UserInterface, queryKeys } from "@/shared"

async function getBanks(): Promise<BankDataInterface> {
  const response = await userService.getBanks()("banks", response)
  return response
}

export function useBank(): BankDataInterface | undefined {
  const { data } = useQuery({
    queryKey: [queryKeys.banks],
    queryFn: getBanks,
  })
  return data
}
