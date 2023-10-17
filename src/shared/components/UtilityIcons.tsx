import React from "react"
import { IconAvatar, IconNotification, IconScan } from "./icons"
import { useRouter } from "next/navigation"
import { userService } from "@/services"
import { useNotification } from "@/hooks/notification/useNotification"
import moment from "moment"
import { NotificationDrop } from "./NotificationDrop"

export function UtilityIcons() {
  const Router = useRouter()
  const notification = useNotification()

  return (
    <div className='hidden lg:flex items-center gap-[60px]  '>
      <div className=' flex gap-8'>
        <IconScan />
        <div className='relative'>
          <IconNotification />

          <NotificationDrop />
        </div>
      </div>

      <div
        className=''
        onClick={() => {
          Router.push(`/settings`)
        }}
      >
        <IconAvatar />
      </div>
    </div>
  )
}
