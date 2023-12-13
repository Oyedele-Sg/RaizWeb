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
import { PendingRequests } from "@/components/send"

export default function page() {
  const Router = useRouter()
 

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

              <PendingRequests />
            </FormTitledContainer>
          </div>
        </div>
      </SetupLayout>
    </div>
  )
}
