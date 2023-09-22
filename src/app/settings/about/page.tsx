import { ContentWrap, SettingItem } from "@/components/settings"
import React from "react"

function page() {
  const links = [
    {
      title: "Legal",
      image: "about/legal",
    },
    {
      title: "Social Media",
      image: "about/social",
      link: "social",
    },
    {
      title: "Visit our blog",
      image: "about/visit",
    },
    {
      title: "App rating",
      image: "about/rating",
    },
    {
      title: "Contact us",
      image: "about/contact",
    },
  ]
  return (
    <ContentWrap title='About'>
      {links.map((link, index) => (
        <SettingItem link={link} key={index} />
      ))}
    </ContentWrap>
  )
}

export default page
