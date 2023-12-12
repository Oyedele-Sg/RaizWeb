"use client"
import { usePendingRequest } from "@/hooks/request/usePendingRequest"
import {
  AddFundsCard,
  BackBtnCircle,
  BtnMain,
  FormTitledContainer,
  IconRaizColored,
  Logo,
  NextArrow,
  PendingRequestDataInterface,
  RouteCardSmall,
  SetupLayout,
} from "@/shared"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { useEffect } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAppDispatch, useAppSelector } from "@/shared/redux/types"
import { SearchSelect, SearchSelectItem } from "@tremor/react"
import { getSelectedRequest } from "@/shared/redux/features/request"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function page() {
  const Router = useRouter()
  const dispatch = useAppDispatch()
  const selectedRequest = useAppSelector((state) => state.selectedRequest)

  const cardLink = [
    {
      type: "Internal Transfer",
      illustration: "fund-one",
      subText: "Send money to someone in pesastash, fast and efficient ",
      link: "/send/wallet-transfer",
    },
    {
      type: "External Transfer",
      illustration: "fund-two",
      subText: " Send money to someone outside of pesastash ",
      link: "/send/external-transfer",
    },
  ]

  const requests = usePendingRequest()

  return (
    <div>
      <SetupLayout bg='bg-profile-1'>
        <div className='mx-5 mt-[70px]  lg:m-[72px] flex flex-col gap-[84px] '>
          <IconRaizColored />

          <div className=' flex flex-col gap-3  '>
            <div className='flex  gap-3' onClick={() => Router.back}>
              <BackBtnCircle />
              <button title='next' className=''>
                <NextArrow />
              </button>
            </div>

            <FormTitledContainer
              title={"Send Money"}
              subtitle={"Choose Transfer Type"}
            >
              <div className='flex flex-col lg:flex-row gap-6  '>
                {cardLink.map((card, index) => (
                  <RouteCardSmall
                    type={card.type}
                    subText={card.subText}
                    link={card.link}
                    key={index}
                  />
                ))}
              </div>

              {requests && requests?.length > 0 && (
                <div className=' flex flex-col gap-3 '>
                  <h3 className=' text-error  '>Pending Requests</h3>

                  <div className=' flex gap-6  overflow-auto  w-[500px] '>
                    {requests?.map((request, index) => (
                      <div className=' rounded-xl border-[2px] border-neutral-30 px-4  py-5 min-w-[320px] hover:bg-neutral-40 '>
                        <div className=' flex items-center gap-4 '>
                          <Avatar className=' cursor-default border-neutral-30 border-[2px] w-[40px] h-[40px]  '>
                            <AvatarImage
                              src={request.requester_account.profile_image_url}
                            />
                            <AvatarFallback className=' text-purple font-bold  uppercase '>
                              {request.requester_account.first_name.charAt(0)}
                              {request.requester_account.last_name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className=' flex flex-col gap-1 '>
                            <span className=' text-neutral-90 font-semi-mid text-t-16    '>{`${request.requester_account.first_name} ${request.requester_account.last_name}`}</span>
                            <span className=' text-purple     '>
                              ₦{request.transaction_amount}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
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
