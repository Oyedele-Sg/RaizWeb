"use client"
import { useNotification } from "@/hooks/notification/useNotification"
import moment from "moment"
import { useRouter } from "next/navigation"
import React, { useEffect, useRef } from "react"
import { useAppDispatch, useAppSelector } from "../redux/types"
import { setNotificationFalse } from "../redux/features"

export function NotificationDrop() {
  const dispatch = useAppDispatch()
  const isShowing = useAppSelector(
    (state) => state.showNotificationDrop.isShowing
  )

  const Router = useRouter()

  const notification = useNotification()

  const modalRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    // Function to handle clicks outside the modal
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        dispatch(setNotificationFalse())
      }
    }

    document.addEventListener("mousedown", handleOutsideClick)

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [])
  return (
    <>
      {isShowing && (
        <div
          className=' bg-grey border-[1px] border-neutral-70 p-8  absolute top-[70px] w-[450px] right-1/2 translate-x-1/2  rounded-lg z-[1000000000000] mr-[100px] '
          ref={modalRef}
          onClick={() => {
            Router.push(`/notifications`)
            dispatch(setNotificationFalse())
          }}
        >
          <div className='flex flex-col gap-12 '>
            <div className=''>
              <h2 className='  text-purple text-t-24 font-semi-mid  '>
                {" "}
                Notifications{" "}
              </h2>
            </div>

            <div className='flex flex-col gap-7 '>
              {notification?.slice(3).map((item, index) => (
                <div
                  className=' flex gap-4 cursor-default items-start p-3 hover:bg-neutral-20 '
                  key={index}
                >
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
    </>
  )
}
