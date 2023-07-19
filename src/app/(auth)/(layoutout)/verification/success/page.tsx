"use client"

import { VerifySuccess } from "@/shared"
import React from "react"

export default function SucessOTP() {
  return (
    <>
      <VerifySuccess
        activeStep={2}
        title='BVN Verified Successfully'
        description='Your BVN has been sucessfully verified and your account is
				created.'
        btnLink='/dashboard'
      />
    </>
  )
}
