"use client"
import { toast } from "@/components/ui/use-toast"
import { userService } from "@/services"
import { AuthButton, CloseIcon, VerifySuccess } from "@/shared"
import { useAppDispatch, useAppSelector } from "@/shared/redux/types"
import React from "react"
import { setLoadingFalse, setLoadingTrue } from "@/shared/redux/features"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function Sucess() {
  const Router = useRouter()
  const request = useAppSelector((state) => state.selectedRequest)

 

  return (
    <>
      <div className=' flex items-center justify-center h-screen w-full   '>
        <div className=' w-[771px]  bg-grey rounded-[80px] py-[70px] mx-5  '>
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
              <div className=' flex justify-center  flex-col  items-center gap-[38px] '>
                <div className=' text-center flex flex-col gap-2   '>
                  <h1 className=' font-headline__large  font-semi-mid text-purple   '>
                    Request Deleted
                  </h1>
                  <p className=' font-body__large text-neutral-90 '>
                    Request of{" "}
                    <span className=' font-semiBold '>
                      NGN {request?.transaction_amount?.toLocaleString()}
                    </span>{" "}
                    from {request?.requester_account?.first_name}{" "}
                    {request?.requester_account?.last_name} has been deleted.
                  </p>
                </div>

                <AuthButton
                  btnText='Pesa wallet'
                  btnStyle=' px-[101.5px] '
                  onClick={async () => {
                    Router.push("/dashboard")
                  }}
                />
              </div>
              ``
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
