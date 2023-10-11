import Image from "next/image"
import React from "react"

interface Props {
  text: string
  title: string
  icons?: string
}

export function FeedItems({ text, title, icons }: Props) {
  return (
    <div className=' flex items-center  gap-2              '>
      <Image src={"/frame-584.png"} width={56} height={56} alt='' />
      <div className='flex flex-col  gap-2 font-body__large  '>
        <h3 className=' text-purple font-semi-mid  '>{title}</h3>
        <p className=' text-neutral-90 text-t-12 '>{text}</p>
      </div>
    </div>
  )
}
