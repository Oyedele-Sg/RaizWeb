"use client"
import { ComponentOne, ComponentTwo } from "@/components/split-bill"
import { useUser } from "@/hooks/user/useUser"
import {
  AccountInterface,
  Loading,
  QrCode,
  UserInterface,
  UserSearchInterface,
} from "@/shared"
import { useAppDispatch, useAppSelector } from "@/shared/redux/types"
import React, { useState, useEffect, useMemo } from "react"
import { FormProvider, useForm } from "react-hook-form"

interface TransferInputProps {
  phone_number: string
}

export default function page() {
  const user = useUser() as UserInterface
  const dispatch = useAppDispatch()
  const request = useAppSelector((state) => state.selectedRequest)

  const [selectedUsers, setSelectedUsers] = useState<
    (UserSearchInterface | AccountInterface)[]
  >([])
  const [groupName, setGroupName] = useState<string>("")
  const [total, setTotal] = useState<number>(request.transaction_amount)

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
          total={total}
        />
      )}
      {currentStep === 2 && (
        <ComponentTwo
          setSelectedUsers={setSelectedUsers}
          setCurrentStep={setCurrentStep}
          title='Bill Request'
          subtitle='Custom Spilt'
          selectedUsers={[user, ...selectedUsers]}
          setGroupName={setGroupName}
          groupName={groupName}
          total_amount={total}
        />
      )}
      {/* {currentStep === 3 && <ComponentThree />} */}
    </>
  )
}
