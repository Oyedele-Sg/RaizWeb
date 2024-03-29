"use client"
import { useUser } from "@/hooks/user/useUser"
import { CurrentUserContext } from "@/providers/CurrentUserProvider"
import { userService } from "@/services"
import { AuthButton, BtnMain, UserInterface, WhiteTileWrap } from "@/shared"
import { useRouter } from "next/navigation"
import React, { useContext } from "react"

export const VerifyModal = () => {
  const Router = useRouter()
  const user = useUser()
  const { currentUser } = useContext(CurrentUserContext)

  return (
    <>
      {currentUser &&
        !currentUser?.is_bvn_verified &&
        !currentUser?.is_phone_verified && (
          <div className=' z-[10000] fixed  inset-0   flex items-center justify-center bg-loading-bg  '>
            <WhiteTileWrap extraStyle=' px-8 py-10 flex items-center justify-center lg:min-w-[580px] '>
              <div className=' flex flex-col   gap-10    '>
                <div className=' text-center flex flex-col gap-2   '>
                  <h1 className=' font-headline__large  font-semi-mid text-purple   '>
                    You are not yet verified!
                  </h1>
                  <p className=' font-body__large text-neutral-90 '>
                    Click the button bellow to verify your account.
                  </p>
                </div>

                <div className=' flex  gap-5 w-full   '>
                  <BtnMain
                    btnText=' Logout'
                    btnStyle=' border-neutral-100  border text-purple w-full px-5  '
                    onClick={() => {
                      userService.logout()
                      Router.push("/login")
                    }}
                  />

                  {!currentUser.has_transaction_pin || !currentUser.username ? (
                    <AuthButton
                      btnText='Profile Creation '
                      btnStyle='w-full px-5   '
                      onClick={() => Router.push("/profile/username")}
                    />
                  ) : (
                    <AuthButton
                      btnText='Verification'
                      btnStyle='w-full px-5   '
                      onClick={() => Router.push("/verification/add-number")}
                    />
                  )}
                </div>
              </div>
            </WhiteTileWrap>
          </div>
        )}
    </>
  )
}
