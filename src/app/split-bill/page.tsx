"use client"
import { ComponentOne, ComponentTwo } from "@/components/split-bill"
import { useUser } from "@/hooks/user/useUser"
import { Loading, QrCode, UserInterface, UserSearchInterface } from "@/shared"
import { useAppDispatch } from "@/shared/redux/types"
import React, { useState, useEffect, useMemo } from "react"
import { FormProvider, useForm } from "react-hook-form"

interface TransferInputProps {
  phone_number: string
}

export default function page() {
  const user = useUser() as UserInterface
  const dispatch = useAppDispatch()

  const [selectedUsers, setSelectedUsers] = useState<UserSearchInterface[]>([])
  const [groupName, setGroupName] = useState<string>("")
  const [total, setTotal] = useState<number>(0)
 

  const methods = useForm<TransferInputProps>({
    values: {
      phone_number: "",
    },
  })

  const [currentStep, setCurrentStep] = useState(1)

  return (
    <>
      <Loading />
      <QrCode />
      {currentStep === 1 && (
        <ComponentOne
          setSelectedUsers={setSelectedUsers}
          setCurrentStep={setCurrentStep}
          title='Split Bill'
          subtitle='Find User(s) to split with'
          selectedUsers={selectedUsers}
          setGroupName={setGroupName}
          setTotal={setTotal}
        />
      )}
      {currentStep === 2 && (
        <ComponentTwo
          setSelectedUsers={setSelectedUsers}
          setCurrentStep={setCurrentStep}
          title='Bill Request'
          subtitle='Custom Spilt'
          selectedUsers={selectedUsers}
          setGroupName={setGroupName}
          groupName={groupName}
          total_amount={total}
        />
      )}
      {/* {currentStep === 3 && <ComponentThree />} */}
    </>
  )
}
