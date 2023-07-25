import { IllustrationComponent, LoginForm } from "@/components"
import React from "react"

export default function Login() {
  return (
    <div className='   '>
      <div className=' fixed inset-0  flex  items-center justify-between gap-[7.49rem]  px-[60px]  h-screen '>
        <section className='flex-1 basis-[554.1px]   '>
          <IllustrationComponent
            illustrationName='login'
            width={554.1}
            height={400}
          />
        </section>
        <section className='flex-1  basis-[636px]'>
          <div className=' bg-grey  px-[4.5rem] py-[4.25rem] rounded-r-12 max-h-[48.5rem] '>
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
