import { IllustrationComponent, RegisterForm } from "@/components"
import Image from "next/image"
import React from "react"

export default function Register() {
  return (
    <div className='   '>
      <div className='fixed inset-0 bg-purple  bg-auth-pattern bg-center bg-no-repeat lg:flex lg:items-center     h-screen   '>
        <section className=' hidden lg:flex items-center justify-center  lg:flex-1 lg:basis-[554.1px]  '>
          <IllustrationComponent
            illustrationName='login'
            width={554.1}
            height={400}
          />
        </section>

        <section className='lg:flex-1  lg:basis-[636px]  h-full '>
          <div className='   bg-grey flex items-center justify-center  h-full '>
            <div className='flex flex-col gap-12 w-full mx-[1.94rem] '>
              <h1 className='  text-purple font-headline__large  '>
                Create an Account
              </h1>
              <RegisterForm />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
