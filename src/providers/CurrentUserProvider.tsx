"use client"
import React, { useEffect, useState } from "react"
import { userService } from "@/services"
import { toast } from "@/components/ui/use-toast"
import { UserInterface } from "@/shared"
import { useRouter } from "next/navigation"

// Define the CurrentUserContext with a UserInterface type
export const CurrentUserContext = React.createContext<{
  currentUser: UserInterface | undefined
  isLoading: boolean
}>({ currentUser: undefined, isLoading: false })

const CurrentUserProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const [currentUser, setCurrentUser] = useState<UserInterface | undefined>(
    undefined
  )
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const Router = useRouter()

  const getCurrentUser = async () => {
    setIsLoading(true)

    try {
      const response = await userService.getCurrentUser()
      if (response) {
        response.username === null && Router.push("/profile/username")
        setIsLoading(false)
        setCurrentUser(response)
      }
    } catch (e: any) {
      setIsLoading(false)
      toast({
        title: "Error",
        description: `Something went wrong. ${e}`,
        variant: "destructive",
        style: {
          backgroundColor: "#f44336",
          color: "#fff",
          top: "20px",
          right: "20px",
        },
      })
    }
  }

  useEffect(() => {
    // Call getCurrentUser immediately when the component mounts
    getCurrentUser()

    // Set up an interval to call getCurrentUser every 30 seconds
    const intervalId = setInterval(() => {
      getCurrentUser()
    }, 30000) // 30,000 milliseconds = 30 seconds

    // Clear the interval when the component unmounts to prevent memory leaks
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <CurrentUserContext.Provider value={{ currentUser, isLoading }}>
      {props.children}
    </CurrentUserContext.Provider>
  )
}

export default CurrentUserProvider
