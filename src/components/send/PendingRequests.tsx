import { usePendingRequest } from "@/hooks/request/usePendingRequest"
import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAppDispatch } from "@/shared/redux/types"
import { getSelectedRequest } from "@/shared/redux/features/request"
import { useRouter } from "next/navigation"

export function PendingRequests() {
  const requests = usePendingRequest()
  const dispatch = useAppDispatch()
  const Router = useRouter()
  return (
    <>
      {requests && requests?.length > 0 && (
        <div className=' flex flex-col  gap-2 '>
          <h3 className=' font-label__large text-error '>Pending Request</h3>
          <div className=' flex gap-6  overflow-auto hide-scrollbar  w-[500px]  '>
            {requests?.map((request, index) => (
              <div
                className=' rounded-xl border-[2px] border-neutral-30 px-4  py-5 min-w-[320px] hover:bg-neutral-40 '
                onClick={() => {
                  dispatch(getSelectedRequest(request))

                  Router.push("/request/approve")
                }}
              >
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
    </>
  )
}
