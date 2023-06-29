"use client"
import React, { useEffect, useState } from "react"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { queryClient } from "@/shared"
import { userService } from "@/services"
import {
  useRouter,
  usePathname,
  useSearchParams,
  redirect,
} from "next/navigation"

export const ReactQueryProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const pathname = usePathname()

  // redirect to login page if accessing a private page and not logged in

  // run auth check on initial load

  const publicPaths = [
    "/login",
    "/forgot-password",
    // "/",
    "/register",
    "/password-reset",
    "/verify",
    "/verify/reset",
  ]

  if (!userService.userValue && !publicPaths.includes(pathname)) {
    redirect("/login")
  }

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
