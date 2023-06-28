"use client"
import React, { useEffect, useState } from "react"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { queryClient } from "@/shared"
import { userService } from "@/services"
import { useRouter, usePathname, useSearchParams } from "next/navigation"

export const ReactQueryProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [authorized, setAuthorized] = useState(true)

  console.log("ReactQueryProvider", { pathname, searchParams })

  // redirect to login page if accessing a private page and not logged in

  useEffect(() => {
    // run auth check on initial load
    authCheck(pathname)
  }, [])

  function authCheck(url: string) {
    // redirect to login page if accessing a private page and not logged in
    const publicPaths = [
      "/login",
      "/forgot-password",
      "/register",
      "/",
      "/password-reset",
      "/verify",
      "/verify/reset",
    ]
    const path = url

    if (!userService.userValue && !publicPaths.includes(path)) {
      setAuthorized(false)
      router.push("/login")
    } else {
      setAuthorized(true)
    }
  }

  return (
    authorized && (
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    )
  )
}
