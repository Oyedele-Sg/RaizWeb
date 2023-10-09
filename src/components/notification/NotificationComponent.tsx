import { useAppSelector } from "@/shared/redux/types"
import moment from "moment"
import React from "react"

export function NotificationComponent() {
  const notificationDetails = useAppSelector(
    (state) => state.selectedNotification
  )
  return (
    <div className=' bg-grey border-[2px] border-neutral-20 p-8 rounded-lg max-h-[600px] overflow-auto '>
      <div className='flex flex-col gap-12  '>
        <h2 className=' text-purple font-semi-mid text-t-20 lg:text-t-32  '>
          {" "}
          {notificationDetails?.notification_title}{" "}
        </h2>

        <div className=' flex flex-col gap-8'>
          <div className=' flex flex-col gap-5 '>
            <p className=' text-t-18 text-neutral-70 '>
              {moment(notificationDetails.updated_at).format(
                "dddd, Do [of] MMMM YYYY"
              )}
            </p>
            <h3 className=' text-purple text-t-20 lg:text-t-32  font-semi-mid leading-6   '>
              {notificationDetails.notification_body}
            </h3>
          </div>
          <div className=' flex flex-col gap-5 '>
            <p className=' text-t-18 text-neutral-70 '>Status:</p>
            <h3 className=' text-neutral-90 text-t-20 font-semi-mid leading-6 flex items-center gap-2   '>
              <span className=''>
                {" "}
                <div className=' rounded-full w-[11px] h-[11px] bg-yellow     '></div>{" "}
              </span>{" "}
              <span className=''>
                {
                  notificationDetails.notification_category
                    ?.notification_category_name
                }
              </span>
            </h3>
          </div>
        </div>
      </div>
    </div>
  )
}
