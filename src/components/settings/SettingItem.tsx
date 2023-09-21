"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React from "react"
import { Switch } from "@/components/ui/switch"

interface Props {
  link: {
    title: string
    image: string
    link?: string
  }
}

export function SettingItem({ link }: Props) {
  const Router = useRouter()
  return (
    <div
      className={` flex  items-center justify-between   pb-4 border-b-[1.5px] border-b-neutral-30 
           `}
      onClick={() => {
        if (!link.link) return
        Router.push(`/settings/${link.link}`)
      }}
    >
      <div className='  flex items-center gap-4  '>
        <Image
          src={`/settings/${link.image}.svg`}
          alt=''
          width={24}
          height={24}
        />
        <h3 className=' text-neutral-70 text-t-16   '> {link.title} </h3>
      </div>

      {link.title === "Enable/disable Face or Touch ID" ? (
        <Switch />
      ) : (
        <Image src={`/icons/arrow-right.svg`} alt='' width={24} height={24} />
      )}
    </div>
  )
}
