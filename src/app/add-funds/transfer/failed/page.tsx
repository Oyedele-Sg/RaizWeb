"use client"

import { toast } from "@/components/ui/use-toast"
import { userService } from "@/services"
import { AuthButton, CloseIcon, VerifySuccess } from "@/shared"
import { useAppDispatch } from "@/shared/redux/types"
import React from "react"
import { setLoadingFalse, setLoadingTrue } from "@/shared/redux/features"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function Sucess() {
  const Router = useRouter()

  const dispatch = useAppDispatch()

  return (
    <>
      <div className=' flex items-center justify-center h-screen w-fullbug  '>
        <div className=' w-[771px]  bg-grey rounded-[80px] py-[70px] mx-5  '>
          <div className=' flex justify-center  flex-col gap-11  '>
            <div className='flex items-center justify-center '>
              <Image
                src='/illustrations/failed.svg'
                width={167.5}
                height={129.07}
                alt='insufficient funds'
              />
            </div>
            <div className='   '>
              <div className=' flex justiKWfy-center  flex-col  items-center gap-[38px] '>
                <div className=' text-center flex flex-col gap-2   '>
                  <h1 className=' font-headline__large  font-semi-mid text-purple   '>
                    Insufficient Funds
                  </h1>
                  <p className=' font-body__large text-neutral-90 '>
                    Your account balance is insufficient to complete this
                    action.
                  </p>
                </div>

                <AuthButton
                  btnText='Try Again'
                  btnStyle=' px-[101.5px] '
                  onClick={() => {
                    Router.push("/add-funds/transfer")
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
