"use client"
import { useNotification } from "@/hooks/notification/useNotification"
import { BackBtnCircle, NotificationDataInterface } from "@/shared"
import moment from "moment"
import React, { useState } from "react"

function page() {
  const notification = useNotification()
  const [detail, setDetail] = useState<NotificationDataInterface>()

  return (
    <div className=' flex flex-col gap-3 '>
      <div className='flex items-center  '>
        <BackBtnCircle />
        <div className=' w-full '>
          <h1 className=' text-purple text-center text-t-24 font-semi-mid  '>
            Notifications
          </h1>
        </div>
      </div>

      {notification &&
        (detail ? (
          <div className=' bg-grey border-[2px] border-neutral-20 p-8 rounded-lg max-h-[600px] overflow-auto '>
            <div className='flex flex-col gap-12  '>
              <h2 className=' text-purple font-semi-mid text-t-20 lg:text-t-32  '>
                {" "}
                {detail.notification_title}{" "}
              </h2>

              <div className=' flex flex-col gap-8'>
                <div className=' flex flex-col gap-5 '>
                  <p className=' text-t-18 text-neutral-70 '>
                    {moment(detail.updated_at).format(
                      "dddd, Do [of] MMMM YYYY"
                    )}
                  </p>
                  <h3 className=' text-purple text-t-20 lg:text-t-32  font-semi-mid leading-6   '>
                    {detail.notification_body}
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
                      {detail.notification_category.notification_category_name}
                    </span>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className=' bg-grey border-[2px] border-neutral-20 p-8 rounded-lg max-h-[600px] overflow-auto '>
            <div className='flex flex-col gap-12 '>
              <div className='flex flex-col gap-11'>
                {notification?.map((item, index) => (
                  <div
                    className=' flex gap-4  items-center  bug '
                    key={index}
                    onClick={() => setDetail(item)}
                  >
                    <div className=' rounded-full w-[11px] h-[11px] bg-yellow     '></div>
                    <div className='   w-full flex flex-col gap-2 '>
                      <div className=' flex  justify-between   '>
                        <div className='flex'>
                          <h2 className=' text-neutral-90 text-t-20 font-semi-mid   '>
                            {item.notification_title}
                          </h2>
                        </div>
                        <div className=' text-t-20 text-neutral-50   '>
                          {" "}
                          {moment(item.created_at).format("MMM D")}{" "}
                        </div>
                      </div>
                      <div className=''>
                        <p className=' text-neutral-70 text-t-18  leading-6  '>
                          {" "}
                          {item.notification_body}{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}

export default page
