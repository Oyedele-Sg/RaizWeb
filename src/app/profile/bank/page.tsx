"use client"

import { AddBankSuccess, Header, StepperComponent } from "@/components"
import AddBankForm from "@/components/profile-setup/AddBankForm"
import { useBank } from "@/hooks/banks/useBank"
import {
  BtnMain,
  Loading,
  RegisterInput,
  SetupLayout,
  SkipLink,
} from "@/shared"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Bank() {
  const Router = useRouter()

  const [success, setSuccess] = useState<boolean>(false)

  // const banks = useBank()
  // console.log("bamks", banks)

  return (
    <>
      <Loading />

      <SetupLayout bg='bg-profile-1'>
        <div className=' px-[60px]  pt-[50px] flex flex-col gap-[70px] '>
          <SkipLink link='/profile/bank/saved-list' />
          <Header activeStep={1} />
          {!success ? (
            <AddBankForm setSuccess={setSuccess} />
          ) : (
            <AddBankSuccess
              addFunc={() => Router.push("/profile/bank/add-more")}
              cancelFunc={() => {}}
            />
          )}
        </div>
      </SetupLayout>
    </>
  )
}
