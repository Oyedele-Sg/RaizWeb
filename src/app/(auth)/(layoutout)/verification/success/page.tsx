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
      />
    </>
  )
}
