"use client"
import React, { useEffect, useRef } from "react"
import { BtnMain } from "./buttons"

interface DeletePopUpProps {
  title: string
  message?: string
  ConfirmFunc: () => void
  ConfirmText?: string
  CancelFunc: () => void
  CancelText?: string
}

export function DeletePopUp({
  title,
  message,
  ConfirmFunc,
  ConfirmText,
  CancelFunc,
  CancelText,
}: DeletePopUpProps) {
  const popupRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click target is outside the popup
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        // Call the CancelFunc to close the popup
        CancelFunc()
      }
    }

    // Add click event listener to the document
    document.addEventListener("click", handleClickOutside)

    return () => {
      // Remove the event listener when the component unmounts
      document.removeEventListener("click", handleClickOutside)
    }
  }, [CancelFunc])
  return (
    <div
      ref={popupRef}
      className=' bg-purple rounded-tremor-default py-4 px-3 absolute min-w-[206px]  right-0  translate-x-[45%] mt-2 '
    >
      <div className='  flex flex-col gap-3 '>
        <div className='  flex flex-col  gap-1  '>
          <h2 className='  text-grey font-title__small font- font-semi-mid  '>
            {title}
          </h2>
          <p className=' text-neutral-40  font-body__small  '>
            {message || `Are you sure you want to delete this bill request?`}
          </p>
        </div>
        <div className='flex gap-3  '>
          <BtnMain
            btnText={ConfirmText || "Confirm"}
            btnStyle=' bg-error  text-grey  force-padding px-2 '
            onClick={() => ConfirmFunc()}
          />
          <BtnMain
            btnText={CancelText || "No"}
            btnStyle=' border-grey border-[1px] text-grey  force-padding  px-[20.5px]'
            onClick={async () => CancelFunc()}
          />
        </div>
      </div>
    </div>
  )
}
