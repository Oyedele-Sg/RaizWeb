"use client"
import React, { useEffect, useState } from "react"
import { userService } from "@/services"
import { toast } from "@/components/ui/use-toast"
import { UserInterface } from "@/shared"
import { useRouter } from "next/navigation"

export const CurrentUserContext = React.createContext<any>({})

const CurrentUserProvider = (props: { children: any }) => {
  const [currentUser, setCurrentUser] = useState<UserInterface>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const Router = useRouter()

  const getCurrentUser = async () => {
    // setIsLoading(true)

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
    getCurrentUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <CurrentUserContext.Provider value={{ currentUser, isLoading }}>
      {props.children}
    </CurrentUserContext.Provider>
  )
}

export default CurrentUserProvider
