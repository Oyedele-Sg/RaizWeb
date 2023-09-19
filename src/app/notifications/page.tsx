"use client"
import { useNotification } from "@/hooks/notification/useNotification"
import { BackBtnCircle } from "@/shared"
import moment from "moment"
import React from "react"

function page() {
  const notification = useNotification()
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

      {notification && (
        <div className=' bg-grey border-[2px] border-neutral-20 p-8 rounded-lg max-h-[600px] overflow-auto '>
          <div className='flex flex-col gap-12 '>
            <div className='flex flex-col gap-11 '>
              {notification?.map((item, index) => (
                <div className=' flex gap-4  items-start ' key={index}>
                  <div className=' rounded-full w-[11px] h-[11px] bg-yellow   '></div>
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
      )}
    </div>
  )
}

export default page
