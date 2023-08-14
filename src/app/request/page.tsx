"use client"
import { InputContainer } from "@/components"
import { ComponentOne, ComponentTwo } from "@/components/request"

import { Toast } from "@/components/ui/toast"
import { toast } from "@/components/ui/use-toast"
import { useUser } from "@/hooks/user/useUser"
import { userService } from "@/services"
import { Loading, UserInterface, UserSearchInterface } from "@/shared"
import { setLoadingFalse, setLoadingTrue } from "@/shared/redux/features"
import { useAppDispatch } from "@/shared/redux/types"
import { useRouter } from "next/navigation"
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
        />
      )}
      {currentStep === 2 && (
        <ComponentTwo
          searchResult={searchResults}
          setCurrentStep={setCurrentStep}
        />
      )}
      {/* {currentStep === 3 && <ComponentThree />} */}
    </>
  )
}
