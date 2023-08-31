"use client"
import { usePendingRequest } from "@/hooks/request/usePendingRequest"
import {
  AddFundsCard,
  BackBtnCircle,
  BtnMain,
  FormTitledContainer,
  IconPesaColored,
  Logo,
  NextArrow,
  RouteCardSmall,
  SetupLayout,
} from "@/shared"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAppDispatch, useAppSelector } from "@/shared/redux/types"

export default function page() {
  const Router = useRouter()
  const dispatch = useAppDispatch()
  const selectedRequest = useAppSelector((state) => state.selectedRequest)
  console.log("selected reuest", selectedRequest)
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
  console.log("requests", requests) 

  return (
    <div>
      <SetupLayout bg='bg-profile-1'>
        <div className=' m-[72px] flex flex-col gap-[84px] '>
          <IconPesaColored />

          <div className=' flex flex-col gap-3 '>
            <div className='' onClick={() => Router.back}>
              <BackBtnCircle />
              <button title='next' className=''>
                <NextArrow />
              </button>
            </div>

            <FormTitledContainer
              title={"Send Money"}
              subtitle={"Choose Transfer Type"}
              // utils={<Utils />}
            >
              <div className='flex gap-6  '>
                {cardLink.map((card) => (
                  <RouteCardSmall
                    type={card.type}
                    subText={card.subText}
                    link={card.link}
                  />
                ))}
              </div>

              {requests && requests?.length > 0 && (
                <div>
                  <h3 className=' text-neutral-80  '>Pending Requests</h3>
                  <Select
                    onValueChange={(value) => {
                      // const selectedBank = category?.find(
                      //   (cat) => cat.category_name === value
                      // )
                      // @ts-ignore
                      // methods.setValue(
                      //   "category_id",
                      //   selectedBank?.category_id as number
                      // )
                      // @ts-ignore
                    }}
                  >
                    <SelectTrigger className='w-full outline-none rounded-none border-b-purple border-[1px] border-t-0 border-x-0  input_field-input capitalize  z-50  '>
                      <SelectValue
                        placeholder='Select  '
                        className=' text-purple capitalize placeholder:text-neutral-50   '
                      />
                    </SelectTrigger>
                    <SelectContent className=' bg-neutral-20 text-neutral-90 h-[200px] overflow-auto capitalize z-50 '>
                      {requests?.map((request, index) => (
                        <SelectItem
                          key={request.requester_account_id}
                          // @ts-ignore
                          value={`${request.requester_account.first_name} ${request.requester_account.last_name} `}
                          className=' hover:bg-neutral-50 z-50  select-item-reset '
                          onClick={(value) => {
                            // methods.setValue("category_id", cat.category_id)
                          }}
                        >
                          {/* <div className=' bug  '> */}
                          <span className=' text-neutral-90 '>{`${request.requester_account.first_name} ${request.requester_account.last_name} `}</span>
                          <span className=' text-purple '>
                            {request.transaction_amount}{" "}
                          </span>{" "}
                          {/* </div> */}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </FormTitledContainer>
          </div>
        </div>
      </SetupLayout>
    </div>
  )
}

// function Utils() {
//   return (
//     <>
//       <div className='flex gap-6  items-center  '>
//         <IconSearch />
//         <IconScan />
//       </div>
//     </>
//   )
// }
