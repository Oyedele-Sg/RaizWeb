import { IllustrationComponent, LoginForm } from "@/components"
import Image from "next/image"
import React from "react"

export default function Login() {
  return (
    <div>
      <div className='flex items-start justify-between py-[125px] px-[60px] gap-[120px]  max-h-[1024px] overflow-hidden  '>
        <section className='flex-1 basis-[554.1px]  h-screen  '>
          <IllustrationComponent
            illustrationName='login'
            width={554.1}
            height={400}
          />
        </section>
        <section className='flex-1  basis-[636px]  '>
          <div className=' bg-grey  max-h-[818px]  py-[164px] px-[72px] rounded-r-12  '>
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
