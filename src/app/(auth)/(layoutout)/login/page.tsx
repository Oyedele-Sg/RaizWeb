import { IllustrationComponent, LoginForm } from "@/components"
import Image from "next/image"
import React from "react"

export default function Login() {
  return (
    <div className='   '>
      <div className=' fixed inset-0  flex  items-start justify-between gap-[7.49rem] py-[7.691rem]  px-[60px] overflow-auto  '>
        <section className='flex-1 basis-[554.1px]  h-screen  '>
          <IllustrationComponent
            illustrationName='login'
            width={554.1}
            height={400}
          />
        </section>
        <section className='flex-1  basis-[636px]  '>
          <div className=' bg-grey  px-[4.5rem] py-[10.25rem] rounded-r-12  '>
            <div className='flex flex-col gap-12 '>
              <h1 className='  text-purple font-headline__large  '>
                Welcome Back
              </h1>
              <LoginForm />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
