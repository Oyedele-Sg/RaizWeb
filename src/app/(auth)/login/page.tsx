import { IllustrationComponent } from "@/components"
import Image from "next/image"
import React from "react"

export default function Login() {
  return (
    <div>
      <div className='flex '>
        <section className='flex-1  min-h-screen '>
          <IllustrationComponent illustrationName='sign-up' />
        </section>
        <section className='flex-1 min-h-screen bg-grey  '></section>
      </div>
    </div>
  )
}
