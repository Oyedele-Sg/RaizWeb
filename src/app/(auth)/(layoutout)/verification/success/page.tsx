"use client"

import { toast } from "@/components/ui/use-toast"
import { userService } from "@/services"
import { VerifySuccess } from "@/shared"
import { useAppDispatch } from "@/shared/redux/types"
import React from "react"
import { setLoadingFalse, setLoadingTrue } from "@/shared/redux/features"

export default function SucessOTP() {
  const dispatch = useAppDispatch()

  return (
    <>
      <VerifySuccess
        activeStep={2}
        title='BVN Verified Successfully'
        description='Your BVN has been sucessfully verified and your account is
				created.'
        btnLink='dashboard'
        btnFunc={async () => {
          try {
            dispatch(setLoadingTrue())
            // await userService.CreateWallet()
            toast({
              title: " User Wallet Created successfully",
              style: {
                backgroundColor: "#4B0082",
                color: "#fff",
              },
            })
            dispatch(setLoadingFalse())
          } catch (error) {
            toast({
              title: "Something Went Wrong",
              description: `${error}`,
              variant: "destructive",
              style: {
                backgroundColor: "#f44336",
                color: "#fff",
                top: "20px",
                right: "20px",
              },
            })
            dispatch(setLoadingFalse())
          }
        }}
      />
    </>
  )
}
