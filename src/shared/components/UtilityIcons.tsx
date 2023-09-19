import React from "react"
import { IconAvatar, IconNotification, IconScan } from "./icons"
import { useRouter } from "next/navigation"
import { userService } from "@/services"

export function UtilityIcons() {
  const Router = useRouter()

  return (
    <div className='hidden lg:flex items-center gap-[60px]  '>
      <div className=' flex gap-8'>
        <IconScan />
        <div className='relative'>
          <IconNotification />

          <div className=' bg-grey border-[1px] border-neutral-70 p-8  absolute top-[70px] w-[450px] bug  '>
            <div className=''>
              <h2 className=''> Notifications </h2>
            </div>
          </div>
        </div>
      </div>

      <div
        className=''
        onClick={() => {
          userService.logout()
          Router.push(`/login`)
        }}
      >
        <IconAvatar />
      </div>
    </div>
  )
}
