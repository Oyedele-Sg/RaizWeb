"use client"
import { useUser } from "@/hooks/user/useUser"
import { BtnMain, WhiteTileWrap } from "@/shared"

import { useRouter } from "next/navigation"
import React from "react"

export const VerifyModal = () => {
  const Router = useRouter()
  const user = useUser()
  return (
    <>
      {!user?.is_bvn_verified && !user?.is_phone_verified && (
        <div className=' z-[10000] fixed  inset-0   flex items-center justify-center bg-loading-bg  '>
          <WhiteTileWrap extraStyle=' px-8 py-10 flex items-center justify-center '>
            <div className=' flex flex-col items-center  gap-10  '>
              <div className=' text-center flex flex-col gap-2   '>
                <h1 className=' font-headline__large  font-semi-mid text-purple   '>
                  You are not yet verified!
                </h1>
                <p className=' font-body__large text-neutral-90 '>
                  Click the button bellow to verify your account.
                </p>
              </div>

              <div>
                <BtnMain
                  btnText=' Go to verification page '
                  btnStyle=' border-error border text-error px-[42px]  '
                  onClick={() => Router.push("/verification/add-number")}
                />
              </div>
            </div>
          </WhiteTileWrap>
        </div>
      )}
    </>
  )
}
