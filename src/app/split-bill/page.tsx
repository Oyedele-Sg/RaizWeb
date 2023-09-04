"use client"
import { ComponentOne } from "@/components/split-bill"
import { useUser } from "@/hooks/user/useUser"
import { Loading, UserInterface, UserSearchInterface } from "@/shared"
import { useAppDispatch } from "@/shared/redux/types"
import React, { useState, useEffect, useMemo } from "react"
import { FormProvider, useForm } from "react-hook-form"

interface TransferInputProps {
  phone_number: string
}

export default function page() {
  const user = useUser() as UserInterface
  const dispatch = useAppDispatch()

  const [searchResults, setSearchResults] = useState<UserSearchInterface>()

  const methods = useForm<TransferInputProps>({
    values: {
      phone_number: "",
    },
  })

  const [currentStep, setCurrentStep] = useState(1)

  return (
    <>
      <Loading />
      {currentStep === 1 && (
        <ComponentOne
          setSearchResults={setSearchResults}
          setCurrentStep={setCurrentStep}
          title='Request Money'
          subtitle='Find User'
          searchResults={searchResults}
        />
      )}
      {/* {currentStep === 2 && (
        <ComponentTwo
          searchResult={searchResults}
          setCurrentStep={setCurrentStep}
          setSearchResults={setSearchResults}
        />
      )} */}
      {/* {currentStep === 3 && <ComponentThree />} */}
    </>
  )
}
