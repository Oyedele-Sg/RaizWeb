"use client"
import { ComponentOne, ComponentTwo } from "@/components/approve-request"
import { Loading } from "@/shared"
import { useAppSelector } from "@/shared/redux/types"
import { useState } from "react"

export default function page() {
  const request = useAppSelector((state) => state.selectedRequest)
  console.log("request", request)
  const [currentStep, setCurrentStep] = useState(1)
  return (
    <>
      <Loading />
      {currentStep === 1 && (
        <ComponentOne request={request} />
      )}
      {currentStep === 2 && (
        <ComponentTwo request_id={request.request_transfer_id} />
      )}
    </>
  )
}
