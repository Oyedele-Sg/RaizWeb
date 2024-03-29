"use client"
import { ContentWrap, SettingItem } from "@/components/settings"
import { CurrentUserContext } from "@/providers/CurrentUserProvider"
import Image from "next/image"
import React, { useContext } from "react"
import { useRouter } from "next/navigation"

function page() {
  const links = [
    {
      title: "Reset Password",
      image: "login/lock",
      link: "reset-password",
    },
    {
      title: "Change Transaction PIN",
      image: "login/key",
      link: "reset-pin",
    },
    {
      title: "Reset Transaction PIN",
      image: "login/key",
      link: "forgot-pin",
    },

    {
      title: "Reset Security Questions",
      image: "login/pin",
    },
  ]

  return (
    <ContentWrap title='Login and Security'>
      {links.map((link, index) => (
        <SettingItem link={link} key={index} />
      ))}
    </ContentWrap>
  )
}
export default page
