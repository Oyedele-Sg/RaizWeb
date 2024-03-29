import { AuthButton, BtnMain } from "@/shared"
import React from "react"

function AjoTerms() {
  return (
    <div className=' z-[10000] h-screen fixed top-0 bottom-0 left-0 right-0  flex items-center justify-center bg-bg-overlay  '>
      <div className=' bg-grey  rounded-2xl pt-[56px] px-6 pb-12 w-[1000px] '>
        <div className=' border-b  border-b-neutral-30 pb-5 '>
          <h2 className=' uppercase font-semibold text-purple text-center '>
            {" "}
            TERMS AND CONDITIONS{" "}
          </h2>
        </div>

        <div className=' flex flex-col gap-6 pt-12 '>
          <p className='  text-neutral-70  font-font-title__medium  '>
            Updated July 07, 2023{" "}
          </p>

          <div className='text-t-22 text-purple flex flex-col  gap-3  '>
            <h3 className='  text-purple  font-semibold  '>Section 1.1</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur. Amet tempor mi nulla
              aliquam habitasse felis sollicitudin. Nam diam enim sit enim
              malesuada. Sed ornare montes eros diam sit mauris. Magna lacus
              semper nulla mattis ut quis dolor lacus viverra. Gravida
              adipiscing ipsum scelerisque neque massa amet. Elementum quisque
              non velit augue pretium mauris. Orci sagittis cursus au
            </p>
          </div>

          <div className='  flex justify-center it gap-[56px] pt-[56px]'>
            <BtnMain
              btnText='Decline'
              btnStyle='  px-[55px] border border-neutral-100 text-purple '
            />
            <AuthButton btnText=' Accept' btnStyle='  px-[55px]   ' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AjoTerms
