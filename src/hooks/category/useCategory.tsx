import { useQuery, useQueryClient } from "@tanstack/react-query"
import { userService } from "@/services"

import { CategoryDataInterface, queryKeys } from "@/shared"

async function getCategory(): Promise<CategoryDataInterface[]> {
  const response = await userService.getCategory()
  return response
}

export function useCategory(): CategoryDataInterface[] | undefined {
  const { data } = useQuery({
    queryKey: [queryKeys.category],
    queryFn: getCategory,
  })
  return data
}
