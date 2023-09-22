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
          <h3 className=' font-label__large text-neutral-80 '>
            Pending Request
          </h3>
          <div className=' flex gap-2  '>
            {requests?.map((account, index) => (
              <div
                className='flex flex-col gap-2 items-center'
                key={index}
                onClick={() => {
                  dispatch(getSelectedRequest(account))
                  Router.push("/request/approve")
                }}
              >
                <Avatar className=' cursor-pointer border-neutral-30 border-[2px] w-[44px] h-[44px] bg-neutral-20 '>
                  {/* <AvatarImage src='https://github.com/shadcn.png' /> */}
                  <AvatarFallback className=' text-purple font-bold   '>
                    {account.requester_account.first_name.charAt(0)}
                    {account.requester_account.last_name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <p className=' capitalize text-purple text-t-14   '>
                  {account.requester_account.username}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
