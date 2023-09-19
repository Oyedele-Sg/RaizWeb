"use client"
import { ContentWrap } from "@/components/settings"
import { CurrentUserContext } from "@/providers/CurrentUserProvider"
import Image from "next/image"
import React, { useContext } from "react"
import { Switch } from "@/components/ui/switch"
import { useRouter } from "next/navigation"

function page() {
  const { currentUser } = useContext(CurrentUserContext)

  const Router = useRouter()

  const links = [
    {
      title: "Reset Password",
      image: "lock",
      link: "reset-password",
    },
    {
      title: "Transaction PIN",
      image: "pin",
    },
    {
      title: "Enable/disable Face or Touch ID",

      image: "scan",
      link: "login-and-security",
    },
    {
      title: "Reset Security Questions",
      image: "pin",
    },
  ]

  return (
    <ContentWrap title='Login and Security'>
      {links.map((link, index) => (
        <div
          className={` flex  items-center justify-between   pb-4 border-b-[1.5px] border-b-neutral-30 
           `}
          onClick={() => Router.push(`/settings/${link.link}`)}
        >
          <div className='  flex items-center gap-4  '>
            <Image
              src={`/settings/login/${link.image}.svg`}
              alt=''
              width={24}
              height={24}
            />
            <h3 className=' text-neutral-70 text-t-16   '> {link.title} </h3>
          </div>

          {link.title === "Enable/disable Face or Touch ID" ? (
            <Switch />
          ) : (
            <Image
              src={`/icons/arrow-right.svg`}
              alt=''
              width={24}
              height={24}
            />
          )}
        </div>
      ))}
    </ContentWrap>
  )
}
export default page
