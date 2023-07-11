import { IllustrationComponent, RegisterForm } from "@/components"
import Image from "next/image"
import React from "react"

export default function Register() {
  return (
    <div className=' fixed inset-0 w-screen h-screen  '>
      <div className='flex h-full  '>
        <section className='flex-1  py-[125px]  bg-purple bg-auth-pattern bg-center bg-no-repeat flex items-center justify-center    '>
          <div className=' '>
            <IllustrationComponent
              illustrationName='sign-up'
              width={554.1}
              height={400}
            />
          </div>
        </section>
        <section className='flex-1 py-[125px]  bg-grey  h-full flex items-center justify-center  '>
          <div className='   w-full py-[164px] px-[50px] '>
            <div className='flex flex-col gap-12 '>
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
