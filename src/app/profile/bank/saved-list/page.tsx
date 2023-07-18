"use client"
import { Header, InputContainer } from "@/components"
import { useUser } from "@/hooks/user/useUser"
import { BtnMain, IconCloseCircle, SetupLayout } from "@/shared"
import React from "react"

export default function page() {
  const user = useUser()
  console.log("user", user)
  return (
    <SetupLayout bg='bg-profile-1'>
      <div className=' pr-[107px]  pl-[60px] flex flex-col gap-[88px]  '>
        <div className=' mt-[180px]'>
          <Header activeStep={3} />
        </div>
        <InputContainer>
          <div className=' flex justify-between items-center  '>
            <div className=' flex flex-col gap-2  '>
              <h2 className=' text-purple  '>Saved Account Number</h2>
              <hr className=' bg-neutral-30  w-[125px] h-[2px] ' />
            </div>
            <div className=' '>
              <IconCloseCircle />
            </div>
          </div>

          {user?.withdrawal_accounts.map((item, index) => (
            <div
              className=' flex flex-col gap-4 mt-[40px]
						'
            >
              <div className=' flex items-center justify-between '>
                <div className=''>
                  <h3 className=' font-label__large text-neutral-80 '>
                    {item.withdrawal_bank_name}
                  </h3>
                  <p className=' font-body__large text-neutral-60 '>
                    {item.withdrawal_account_number}
                  </p>
                </div>
                <div className=' flex gap-4'>
                  <BtnMain
                    btnText='Edit'
                    className=' font-label__large text-neutral-80 hover:text-neutral-100  '
                  />
                  <BtnMain
                    btnText='Delete'
                    className=' font-label__large text-neutral-60 hover:text-neutral-100  '
                  />
                </div>
              </div>
            </div>
          ))}
        </InputContainer>
      </div>
    </SetupLayout>
  )
}
