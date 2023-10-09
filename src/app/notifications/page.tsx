"use client"
import {
  AllNotificationList,
  NotificationComponent,
} from "@/components/notification"
import { useNotification } from "@/hooks/notification/useNotification"
import { BackArrow, BackBtnCircle, NotificationDataInterface } from "@/shared"
import { getSelectedNotification } from "@/shared/redux/features"
import { useAppDispatch, useAppSelector } from "@/shared/redux/types"
import moment from "moment"
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
        <div className=' w-full '>
          <h1 className=' text-purple text-center text-t-24 font-semi-mid  '>
            Notifications
          </h1>
        </div>
      </div>

      {notification &&
        (notificationDetails &&
        !(Object.keys(notificationDetails).length === 0) ? (
          <NotificationComponent />
        ) : (
          <AllNotificationList />
        ))}
    </div>
  )
}

export default page
