import React from "react"
import { WhiteWrap } from "./container"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { BtnMain } from "./buttons"
interface Props {
  title: string
  description: string
  btnLink?: string
  btnFunc?: () => void
  btnText?: string
}

export function VerifyFail({
  title,
  description,
  btnLink,
  btnFunc,
  btnText,
}: Props) {
  const Router = useRouter()

  return (
    <div className=' h-screen flex items-center justify-center '>
      <WhiteWrap extraStyle=' rounded-2xl mx-[1.25rem] py-[5.12rem] lg:rounded-[80px]   '>
        <div className=' lg:w-[502px] mx-auto flex flex-col gap-12 mt-10  '>
          <div className='  flex flex-col gap-8'>
            <div className='flex items-center justify-center '>
              <Image
                src='/illustrations/verify-failed.svg'
                width={167.5}
                height={129.07}
                alt='success'
              />
            </div>
            <div className=' '>
              <div className=' text-center flex flex-col gap-2   '>
                <h1 className=' font-headline__large  font-semi-mid text-purple   '>
                  {title}
                </h1>
                <p className=' font-body__large text-neutral-90 '>
                  {description}
                </p>
              </div>
            </div>
            <div className=' flex items-center justify-center   '>
              <BtnMain
                btnStyle=' authBtn text-purple  px-[42px]  '
                btnText={btnText || "Continue"}
                type='reset'
                onClick={() => {
                  btnFunc && btnFunc()
                  Router.push(btnLink as string)
                }}
              />
            </div>
          </div>
        </div>
      </WhiteWrap>
    </div>
  )
}
