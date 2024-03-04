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

  const state = useAppSelector((state) => state.loanDataReducer)

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
                    {state?.loan_category?.loan_category_name} Partially
                    Approved
                  </h1>
                  <p className=' font-body__large text-neutral-90 '>
                    Your of NGN{" "}
                    <span className=' font-semibold '>
                      ₦{state?.loan_amount?.toLocaleString()}
                    </span>{" "}
                    Tailored Financial Solution is Ready to Serve You
                  </p>
                </div>

                <div className=' flex  gap-12  '>
                  <BtnMain
                    btnText='Cancel'
                    btnStyle='flex-1 text-purple border-neutral-100 border   '
                    onClick={() => Router.push("/loan/hub")}
                  />
                  <AuthButton
                    btnText='View Summary'
                    btnStyle=' flex-1  w-[200px] h-[56px] bg-purple text-white font-semibold'
                    onClick={async () => {
                      Router.push(` /loan/flex-loan/${state?.loan_id} `)
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
