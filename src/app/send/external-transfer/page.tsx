"use client"
import { InputContainer } from "@/components"
import { ComponentOne } from "@/components/send/transfer"

import { useUser } from "@/hooks/user/useUser"

import { Loading, UserInterface, UserSearchInterface } from "@/shared"

import { useAppDispatch } from "@/shared/redux/types"
import { useRouter } from "next/navigation"
import React, { useState, useEffect, useMemo } from "react"
import { FormProvider, useForm } from "react-hook-form"

interface TransferInputProps {
  phone_number: string
}

export default function page() {
  const Router = useRouter()
  const user = useUser() as UserInterface
  const dispatch = useAppDispatch()

  const [searchResults, setSearchResults] = useState<UserSearchInterface>()

  const [currentStep, setCurrentStep] = useState(1)

  const onNext = (step: number) => {
    setCurrentStep(step) // Update thi`s with the correct step number
  }

  return (
    <>
      <Loading />
      {currentStep === 1 && (
        <ComponentOne />
      )}
      {/* {currentStep === 2 && <ComponentTwo searchResult={searchResults} />}
      {currentStep === 3 && <ComponentThree />} */}
    </>
  )
}
