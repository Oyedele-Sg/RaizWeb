import React, { useContext } from "react"
import {
  IconAvatar,
  IconLogout,
  IconNotification,
  IconNotificationPending,
  IconScan,
} from "./icons"

import { useRouter } from "next/navigation"
import { userService } from "@/services"
import { useNotification } from "@/hooks/notification/useNotification"
import moment from "moment"
import { NotificationDrop } from "./NotificationDrop"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CurrentUserContext } from "@/providers/CurrentUserProvider"

interface Props {
  ajo?: boolean
  iconExtraStyle?: string
}

export function UtilityIcons({ ajo, iconExtraStyle }: Props) {
  const Router = useRouter()
  const notification = useNotification()
  const { currentUser } = useContext(CurrentUserContext)

  return (
    <div
      className={`${
        iconExtraStyle ? iconExtraStyle : "flex gap-[60px] "
      }items-center  `}
    >
      <div className=' flex gap-8'>
        {ajo ? <IconLogout /> : <IconScan />}

        <div className={` ${ajo ? "block " : ""} relative`}>
          {notification?.length ? (
            <IconNotificationPending />
          ) : (
            <IconNotification />
          )}

          <NotificationDrop />
        </div>
      </div>

      <div
        className=' hidden lg:block cursor-pointer '
        onClick={() => {
          Router.push(`/settings`)
        }}
      >
        <Avatar className=' cursor-default w-[48px] h-[48px]  '>
          <AvatarImage src={currentUser?.profile_image_url} />
          <AvatarFallback className=' text-purple font-bold  uppercase '>
            <IconAvatar />
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}
