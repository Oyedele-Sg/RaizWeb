import { ContentWrap, SettingItem } from "@/components/settings"
import React from "react"

function page() {
  const links = [
    {
      title: "Facebook",
      image: "social/facebook",
    },
    {
      title: "Instagram",
      image: "social/instagram",
    },
    {
      title: "Website",
      image: "social/website",
    },
  ]
  return (
    <ContentWrap title='Social Media'>
      {links.map((link, index) => (
        <SettingItem link={link} key={index} />
      ))}
    </ContentWrap>
  )
}

export default page
