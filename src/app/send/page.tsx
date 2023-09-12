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
  PendingRequestDataInterface,
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
import { SearchSelect, SearchSelectItem } from "@tremor/react"
import { getSelectedRequest } from "@/shared/redux/features/request"

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
        <div className='mx-5 mt-[70px]  lg:m-[72px] flex flex-col gap-[84px] '>
          <div className=' hidden lg:block'>
            <IconPesaColored />
          </div>

          <div className=' flex flex-col gap-3  '>
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
                <div>
                  <h3 className=' text-neutral-80  '>Pending Requests</h3>

                  <SearchSelect
                    placeholder='Select...'
                    className=''
                    onValueChange={(value) => {
                      const selectedRequest = requests?.find(
                        (request) => request.request_transfer_id === value
                      )

                      dispatch(
                        getSelectedRequest(
                          selectedRequest as PendingRequestDataInterface
                        )
                      )

                      Router.push("/request/approve")
                    }}
                  >
                    {requests?.map((request, index) => (
                      <SearchSelectItem
                        value={request.request_transfer_id}
                        key={index}
                        className=' select-item-reset  '
                      >
                        <span className=' text-purple  '>{`${request.requester_account.first_name} ${request.requester_account.last_name}`}</span>
                        {"         "}
                        <span className=' text-purple   font-semi-mid'>
                          (₦{request.transaction_amount})
                        </span>
                      </SearchSelectItem>
                    ))}
                  </SearchSelect>
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

{
  /* <Select
onValueChange={(value) => {
  console.log("value", value)
  // const selectedRequest = requests?.find(
  //   (request) => request.category_id === value
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
      value={request.requester_account_id}
      className=' hover:bg-neutral-50 z-50  select-item-reset '
      onClick={(value) => {
        // methods.setValue("category_id", cat.category_id)
      }}
    >
      
      <span className=' text-neutral-90 '>{`${request.requester_account.first_name} ${request.requester_account.last_name} `}</span>
      <span className=' text-purple '>
        {request.transaction_amount}{" "}
      </span>{" "}
    </SelectItem>
  ))}
</SelectContent>
</Select> */
}
