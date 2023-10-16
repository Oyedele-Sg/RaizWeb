"use client"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { userService } from "@/services"

import { NotificationDataInterface, UserInterface, queryKeys } from "@/shared"
import { useEffect } from "react"

async function getNotifications(): Promise<NotificationDataInterface[]> {
  const response = await userService.getNotifications()
  return response
}

export function useNotification(): NotificationDataInterface[] | undefined {
  const queryClient = useQueryClient()

  const { data } = useQuery({
    queryKey: [queryKeys.notifications],
    queryFn: getNotifications,
    staleTime: 30000,
  })

  useEffect(() => {
    const refetchInterval = setInterval(() => {
      queryClient.invalidateQueries([queryKeys.notifications])
    }, 30000)

    return () => clearInterval(refetchInterval)
  }, [queryClient])

  return data
}
