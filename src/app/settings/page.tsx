"use client"
import { IconPesaColored, NavigationButtons, SetupLayout } from "@/shared"
import React, { useContext } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CurrentUserContext } from "@/providers/CurrentUserProvider"
import Image from "next/image"
import Link from "next/link"
import { userService } from "@/services"
import { useRouter } from "next/navigation"

export default function page() {
  const Router = useRouter()

  const { currentUser } = useContext(CurrentUserContext)

  const handleLogout = () => {
    userService.logout()
    Router.push(`/login`)
  }

  const handleLink = (link: string | undefined) => {
    if (link === "logout") {
      handleLogout()
    } else {
      Router.push(`/settings/${link}`)
    }
  }

  const settings = [
    {
      title: "Account Information",
      description: "Information about our account",
      image: "account",
      link: "account-information",
    },
    {
      title: "Help and support",
      description: "Need aid? We're here.",
      image: "help",
    },
    {
      title: "Login and security",
      description: "Keep your account secured",
      image: "key",
      link: "login-and-security",
    },
    {
      title: "Manage connected accounts",
      description: "Eternal accounts connected",
      image: "manage",
    },
    {
      title: "About",
      description: "Information about RAIZ",
      image: "about",
    },
    {
      title: "Logout",
      description: "",
      image: "logout",
      link: "logout",
    },
  ]

  return (
    <div className=''>
      <NavigationButtons />

      <div className='  p-12 rounded-r-8  border-neutral-20 border-[2px]  flex flex-col gap-9  '>
        <div className=' flex  gap-8 '>
          <Avatar className=' cursor-pointer border-neutral-30 border-[2px] w-[64px] h-[64px]  '>
            {/* <AvatarImage src='https://github.com/shadcn.png' /> */}
            <AvatarFallback className=' text-purple font-bold  uppercase '>
              {currentUser?.first_name.charAt(0)}
              {currentUser?.last_name.charAt(1)}
            </AvatarFallback>
          </Avatar>

          <div className=' flex flex-col justify-between '>
            <h1 className=' text-purple font-semi-mid text-t-24   '>
              {currentUser?.first_name} {currentUser?.last_name}
            </h1>
            <p className=' text-neutral-70  text-t-18    '>
              {currentUser?.email}
            </p>
          </div>
        </div>

        <div className='flex flex-col gap-[45px] '>
          {settings.map((setting, index) => (
            <div
              className='flex items-center justify-between hover:bg-neutral-20  cursor-pointer  '
              key={index}
              onClick={() => handleLink(setting.link)}
            >
              <div className='flex items-center gap-5 '>
                <div className=' bg-neutral-20  p-3 rounded-full text-neutral-20 '>
                  <Image
                    src={`/settings/${setting.image}.svg`}
                    width={24}
                    height={24}
                    alt=''
                  />
                </div>
                <div className=''>
                  <h2 className='text-purple '>{setting.title}</h2>
                  <p className='text-neutral-70'>{setting.description}</p>
                </div>
              </div>
              <div className=''>
                <Image
                  src={`/icons/arrow-right.svg`}
                  width={24}
                  height={24}
                  alt=''
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
