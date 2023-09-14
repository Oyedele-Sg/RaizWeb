"use client"
import { CurrentUserContext } from "@/providers/CurrentUserProvider"
import React, { useContext, useEffect, useRef } from "react"
import { WhiteTileWrap } from "./container"
import QRCode from "react-qr-code"
import { useAppDispatch, useAppSelector } from "../redux/types"
import { setQRFalse } from "../redux/features"
import Image from "next/image"

export function QrCode() {
  const dispatch = useAppDispatch()
  const { currentUser } = useContext(CurrentUserContext)
  const isShowing = useAppSelector((state) => state.showQR.isShowing)

  const modalRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    // Function to handle clicks outside the modal
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        dispatch(setQRFalse())
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
        <div className=' fixed top-0 left-0 right-0 bottom-0  bg-loading-bg  flex  items-center  justify-center z-[10000] '>
          <div className='' ref={modalRef}>
            {currentUser && (
              <WhiteTileWrap extraStyle=' px-6 py-12 '>
                <div className='  bg-neutral-20 rounded-2xl px-4 py-12 flex flex-col gap-8   '>
                  <div className=' flex flex-col items-center '>
                    <h2 className=' text-purple font-semi-mid text-[28px] '>
                      {currentUser?.first_name} {currentUser?.last_name}{" "}
                    </h2>
                    <p className=' text-neutral-70 text-[18px] '>
                      Scan to pay {currentUser?.username}
                    </p>
                  </div>

                  <div className=' relative '>
                    <div className=' absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center  '>
                      <Image
                        src='/icons/icon-mark.svg'
                        width={50}
                        height={50}
                        alt=''
                        className=' rounded-r-8  '
                      />
                    </div>

                    <div
                      style={{
                        height: "300px",
                        margin: "0 auto",
                        width: "300px",
                      }}
                    >
                      <QRCode
                        size={300}
                        style={{
                          height: 300,
                          maxWidth: "300px",
                          width: "300px",
                        }}
                        value={currentUser?.qr_code}
                        viewBox={`0 0 256 256`}
                      />
                    </div>
                  </div>
                </div>
              </WhiteTileWrap>
            )}
          </div>
        </div>
      )}
    </>
  )
}
