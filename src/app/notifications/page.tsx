"use client"
import { AllNotificationList } from "@/components/notification"
import { useNotification } from "@/hooks/notification/useNotification"
import { BackArrow, BackBtnCircle, NotificationDataInterface } from "@/shared"
import { getSelectedNotification } from "@/shared/redux/features"
import { useAppDispatch, useAppSelector } from "@/shared/redux/types"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

function page() {
  const Router = useRouter()
  const notification = useNotification()
  const [detail, setDetail] = useState<NotificationDataInterface>()
  const dispatch = useAppDispatch()
  const notificationDetails = useAppSelector(
    (state) => state.selectedNotification
  )

  return (
    <div className=' flex flex-col gap-3 '>
      <div className='flex items-center  '>
        <button
          title='back'
          className=''
          onClick={() => {
            if (
              notificationDetails &&
              !(Object.keys(notificationDetails).length === 0)
            ) {
              dispatch(getSelectedNotification({} as NotificationDataInterface))
              return
            } else {
              Router.back()
            }
          }}
        >
          <BackArrow />
        </button>
        <div className=' w-full  flex justify-between'>
          <div className=' flex-1   '>
            <h1 className=' text-purple text-center text-t-24 font-semi-mid  '>
              Notifications
            </h1>
          </div>
          <div className=' border border-neutral-40 flex gap-6 p-2 rounded-lg    '>
            {" "}
            <div className=' flex items-center gap-2  '>
              <Image src={`/icons/filter.svg`} width={16} height={16} alt='' />{" "}
              <span className=' text-neutral-90  text-t-12  '> Sort By </span>{" "}
            </div>
            <Image
              src={`/icons/arrow-down-mobile.svg`}
              width={16}
              height={16}
              alt=''
            />
          </div>
        </div>
      </div>
      <AllNotificationList
        notification_id={notificationDetails.notification_id}
      />
    </div>
  )
}

export default page
