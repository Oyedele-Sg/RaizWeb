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
        <IconNotification />
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
