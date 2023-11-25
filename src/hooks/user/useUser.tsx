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
  })

  // useEffect(() => {
  //   // Refetch the data on page reload
  //   queryClient.prefetchQuery([queryKeys.user], getUser)
  // }, [queryClient])
  return data
}
// "use client"
// import { useQuery, useQueryClient } from "@tanstack/react-query"
// import { userService } from "@/services"

// import { UserInterface, queryKeys } from "@/shared"
// import { useEffect } from "react"

// async function getUser(): Promise<UserInterface> {
//   const response = await userService.getCurrentUser()
//   return response
// }

// export function useUser(): UserInterface | undefined {
//   const queryClient = useQueryClient()
//   const { data } = useQuery({
//     queryKey: [queryKeys.user],
//     queryFn: getUser,
//   })

//   // useEffect(() => {
//   //   // Function to refetch the data
//   //   const refetchData = async () => {
//   //     await queryClient.prefetchQuery([queryKeys.user], getUser)
//   //   }

//   //   // Add an event listener for the 'focus' event
//   //   window.addEventListener("focus", refetchData)

//   //   // Remove the event listener when the component unmounts
//   //   return () => {
//   //     window.removeEventListener("focus", refetchData)
//   //   }
//   // }, [queryClient])

//   return data
// }
