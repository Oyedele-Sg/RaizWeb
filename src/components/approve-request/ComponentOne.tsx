"use client"
import { InputContainer } from "@/components"
import { Toast } from "@/components/ui/toast"
import { toast } from "@/components/ui/use-toast"
import { useUser } from "@/hooks/user/useUser"
import { userService } from "@/services"
import moment from "moment"
import {
  AuthButton,
  BackBtnCircle,
  BtnMain,
  DeletePopUp,
  FormTitledContainer,
  IconRaizColored,
  NextArrow,
  TransactionPinInterface,
  SetupLayout,
  transactionPinSchema,
} from "@/shared"
import { setLoadingFalse, setLoadingTrue } from "@/shared/redux/features"
import { useAppDispatch, useAppSelector } from "@/shared/redux/types"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { useState, useEffect, useMemo, useRef } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Router } from "lucide-react"
import PinInput from "react-pin-input"
import { yupResolver } from "@hookform/resolvers/yup"

export function ComponentOne() {
  const Router = useRouter()
  const [showPin, setShowPin] = useState(false)
  const dispatch = useAppDispatch()
  const request = useAppSelector((state) => state.selectedRequest)

  return (
    <div className=''>
      <SetupLayout bg='bg-profile-1'>
        <div className='my-[72px] mx-5 lg:mx-[72px] flex flex-col gap-[84px] '>
          <IconRaizColored />

          <div className='flex flex-col gap-3  '>
            <div
              className=''
              onClick={() => {
                !showPin ? setShowPin(false) : Router.back
              }}
            >
              <BackBtnCircle />
              <button title='next' className=''>
                <NextArrow />
              </button>
            </div>

            <FormTitledContainer
              title={"Bill Request"}
              subtitle={"Pay, Split or Reject"}
              utils={<Utils request_id={request.request_transfer_id} />}
            >
              {showPin ? (
                <Pin request_id={request.request_transfer_id} />
              ) : (
                <div className=' flex flex-col gap-9 '>
                  <div className=' flex flex-col gap-10 '>
                    <div className='flex flex-col  gap-5 justify-center items-center '>
                      <div className=''>
                        <Avatar className=' cursor-pointer border-neutral-30 border-[2px] w-[120px] h-[120px] bg-neutral-20 '>
                          {/* <AvatarImage src='https://github.com/shadcn.png' /> */}
                          <AvatarFallback className=' text-purple font-bold   '>
                            {request?.requester_account?.first_name.charAt(0)}
                            {request?.requester_account?.last_name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div className=' flex flex-col gap-2 justify-center '>
                        <h3 className=' text-neutral-70 text-[18px] font-semi-mid text-center '>
                          Hey {request?.requestee_account?.first_name}{" "}
                          {request?.requestee_account?.last_name}{" "}
                        </h3>
                        <h2 className=' text-purple text-[20px] text-center '>
                          <span className='font-semi-mid '>
                            {request?.requester_account?.first_name}{" "}
                            {request?.requester_account?.last_name}
                          </span>{" "}
                          sent you a bill request{" "}
                        </h2>
                      </div>
                    </div>
                    <div className=' flex justify-between items-center '>
                      <span className=' font-title__medium text-neutral-80 '>
                        Split Bill
                      </span>
                      <span className=' text-purple font-semibold  '>
                        {request.currency}{" "}
                        {request.transaction_amount?.toLocaleString()}{" "}
                      </span>
                    </div>
                    <div className=' flex justify-between items-center '>
                      <span className=' font-title__medium text-neutral-80 '>
                        Description
                      </span>
                      <span className=' text-purple font-semibold  '>
                        {request.narration}
                      </span>
                    </div>
                    <div className=' flex justify-between items-center '>
                      <span className=' font-title__medium text-neutral-80 '>
                        Date
                      </span>
                      <span className=' text-purple font-semibold  '>
                        {moment(request?.created_at).format(
                          "dddd, Do [of] MMMM YYYY"
                        )}
                      </span>
                    </div>
                  </div>

                  <div className=' flex justify-between gap-12 '>
                    <BtnMain
                      btnText='Split Bill'
                      btnStyle=' py-2 px-4 border-purple border text-purple rounded-lg font-label__large flex-1 '
                      onClick={() => Router.push("/split-bill")}
                    />
                    <AuthButton
                      btnText='Pay'
                      btnStyle=' w-full flex-1   '
                      onClick={() => setShowPin(true)}
                    />
                  </div>
                </div>
              )}
            </FormTitledContainer>
          </div>
        </div>
      </SetupLayout>
    </div>
  )
}

function Utils({ request_id }: { request_id: string }) {
  const Router = useRouter()
  const [showDelete, setShowDelete] = useState(false)
  const dispatch = useAppDispatch()
  return (
    <>
      <div className=' relative '>
        <div
          className='flex gap-6  items-center '
          onClick={() => setShowDelete(!showDelete)}
        >
          <Image
            src='/icons/trash.svg'
            width={24}
            height={24}
            alt='Delete Request Options'
          />
        </div>

        {showDelete && (
          <DeletePopUp
            title='Delete Bill Request'
            ConfirmFunc={async () => {
              try {
                dispatch(setLoadingTrue())
                await userService.disapproveRequest(request_id)

                Router.push("/request/decline")
                dispatch(setLoadingFalse())
              } catch (error) {
                dispatch(setLoadingFalse())
                toast({
                  title: "Error",
                  description: `${error}`,
                  variant: "destructive",
                  style: {
                    backgroundColor: "#f44336",
                    color: "#fff",
                    top: "20px",
                    right: "20px",
                  },
                })
              }
            }}
            CancelFunc={() => setShowDelete(false)}
          />
        )}
      </div>
    </>
  )
}

interface PinProps {
  request_id: string
}

function Pin({ request_id }: PinProps) {
  const dispatch = useAppDispatch()
  const Router = useRouter()
  const pinInputRefs = useRef<Array<HTMLInputElement | null>>([])
  const methods = useForm<TransactionPinInterface>({
    defaultValues: {
      transaction_pin: "",
    },
    resolver: yupResolver(transactionPinSchema),
  })

  const onSubmit = async (data: TransactionPinInterface) => {
    if (!data.transaction_pin) {
      toast({
        title: "OTP is required",
        variant: "destructive",
        style: {
          backgroundColor: "#f44336",
          color: "#fff",
          top: "20px",
          right: "20px",
        },
      })
      return
    }

    try {
      dispatch(setLoadingTrue())
      await userService.approveRequest(request_id, data)

      Router.push("/request/approve/success")
      dispatch(setLoadingFalse())
    } catch (error) {
      dispatch(setLoadingFalse())

      toast({
        title: "Error",
        description: `${error}`,
        variant: "destructive",
        style: {
          backgroundColor: "#f44336",
          color: "#fff",
          top: "20px",
          right: "20px",
        },
      })
    }
  }

  const handleInputChange = (value: string, index: number) => {
    methods.setValue("transaction_pin", value)
  }
  return (
    <>
      <div className=' '>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className=' flex flex-col gap-8 '
        >
          <PinInput
            length={4}
            initialValue=''
            secret
            onChange={(value, index) => handleInputChange(value, index)}
            type='numeric'
            inputMode='number'
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
            inputStyle={{
              padding: "10px",
              borderTop: "none",
              borderLeft: "none",
              borderRight: "none",
              borderBottom: "1px solid #4B0082",
            }}
            inputFocusStyle={{
              borderBottom: "1px solid #4B0082",
            }}
            autoSelect={true}
            regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
          />

          {methods.formState.errors.transaction_pin && (
            <span className=' text-center  text-error text-t-12  '>
              OTP is required and must be 4 digits
            </span>
          )}

          <div className=' flex gap-8 '>
            <AuthButton
              btnStyle='flex-1 w-full px-[42px] '
              btnText={"Confirm Transfer"}
              type='submit'
            />
          </div>
        </form>
      </div>
    </>
  )
}
