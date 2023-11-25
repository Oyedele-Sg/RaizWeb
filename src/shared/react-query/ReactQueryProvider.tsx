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
import { Provider as ReduxProvider } from "react-redux"
import { store } from "../redux/store"

const events = ["load", "mousemove", "mousedown", "click", "scroll", "keypress"]

export const ReactQueryProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const pathname = usePathname()
  const Router = useRouter()

  // redirect to login page if accessing a private page and not logged in

  // run auth check on initial load

  const publicPaths = [
    "/login",
    "/forgot-password",
    "/register",
    "/reset-password",
    "/verify",
    "/verification/email",
    "/verification/email/resend-otp",
  ]

  let timeInterval: any

  const handleLogoutTimer = () => {
    timeInterval = setTimeout(() => {
      // clears any pending timer.
      resetTimer()
      // Listener clean up. Removes the existing event listener from the window
      Object.values(events).forEach((item) => {
        window.removeEventListener(item, resetTimer)
      })
      // logs out user
      userService.logout()
      Router.push("/login")
    }, 15 * 60 * 1000) // 10000ms = 10secs.
  }

  const resetTimer = () => {
    if (timeInterval) clearInterval(timeInterval)
  }

  useEffect(() => {
    if (!userService.userValue && !publicPaths.includes(pathname)) {
      redirect("/login")
    }

    // if (!userService.userValue) {
    //   // User is not logged in, no need to start the timer
    //   return
    // }

    Object.values(events).forEach((item) => {
      window.addEventListener(item, () => {
        resetTimer()
        handleLogoutTimer()
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider store={store}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </ReduxProvider>
    </QueryClientProvider>
  )
}
