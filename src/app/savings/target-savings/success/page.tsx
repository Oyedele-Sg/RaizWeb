"use client"

import { toast } from "@/components/ui/use-toast"
import { userService } from "@/services"
import { AuthButton, BtnMain, CloseIcon, VerifySuccess } from "@/shared"
import { useAppDispatch, useAppSelector } from "@/shared/redux/types"
import React from "react"
import { setLoadingFalse, setLoadingTrue } from "@/shared/redux/features"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function Sucess() {
  const Router = useRouter()

  const dispatch = useAppDispatch()
  const savingsDetails = useAppSelector((state) => state.groupSavingSuccessData)

  return (
    <>
      <div className=' flex items-center justify-center h-screen w-full  '>
        <div className=' w-[771px]  bg-grey rounded-[80px] pt-[166px] pb-[113px] mx-5'>
          <div className=' flex justify-center  flex-col gap-11  '>
            <div className='flex items-center justify-center '>
              <Image
                src='/illustrations/verify-success.svg'
                width={167.5}
                height={129.07}
                alt='success'
              />
            </div>
            <div className='   '>
              <div className=' flex justiKWfy-center  flex-col  items-center gap-[38px] '>
                <div className=' text-center flex flex-col gap-2   '>
                  <h1 className=' font-headline__large  font-semi-mid text-purple   '>
                    Group Target Save Successfully Set-Up
                  </h1>
                  {/* <p className=' font-body__large text-neutral-90 '>
                    Cycle successfully added to hub!
                  </p> */}
                </div>

                <div className=' flex  gap-12  '>
                  <BtnMain
                    btnText='Add Member(s)?'
                    btnStyle=' text-purple border-neutral-100 border  capitalize px-6 '
                    onClick={() => {
                      Router.push(
                        `/savings/target-savings/${savingsDetails.target_save_group_id}/share`
                      )
                    }}
                  />
                  <AuthButton
                    btnText='Save hub'
                    btnStyle='   px-[46.5px] '
                    onClick={async () => {
                      Router.push("/savings/hub")
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
