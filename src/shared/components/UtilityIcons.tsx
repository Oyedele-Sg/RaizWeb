import React from "react"
import { IconAvatar, IconLogout, IconNotification, IconScan } from "./icons"
import { useRouter } from "next/navigation"
import { userService } from "@/services"
import { useNotification } from "@/hooks/notification/useNotification"
import moment from "moment"
import { NotificationDrop } from "./NotificationDrop"

interface Props {
  ajo?: boolean
}

export function UtilityIcons({ ajo }: Props) {
  const Router = useRouter()
  const notification = useNotification()

  return (
    <div className='hidden lg:flex items-center gap-[60px]  '>
      <div className=' flex gap-8'>
        {ajo ? <IconLogout /> : <IconScan />}

        <div className='relative'>
          <IconNotification />

          <NotificationDrop />
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
