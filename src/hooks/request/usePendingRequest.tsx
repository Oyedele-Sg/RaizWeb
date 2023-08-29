import { useQuery, useQueryClient } from "@tanstack/react-query"
import { userService } from "@/services"

import { PendingRequestDataInterface, queryKeys } from "@/shared"

async function getRequests(): Promise<PendingRequestDataInterface[]> {
  const response = await userService.getPendingRequests()
  return response
}

export function usePendingRequest(): PendingRequestDataInterface[] | undefined {
  const { data } = useQuery({
    queryKey: [queryKeys.requests],
    queryFn: getRequests,
  })
  return data
}
