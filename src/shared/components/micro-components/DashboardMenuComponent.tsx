"use client"

import { Link } from "@mui/material"
import Image from "next/image"
import React from "react"

interface Props {
  menu: {
    name: string
    icon: string
    link: string
  }
}

export function DashboardMenuComponent({ menu }: Props) {
  return (
    <div className=' bg-grey hover:bg-neutral-20 focus:bg-purple  rounded-xl  py-[14px] min-w-[84px]  '>
      <Link
        href={menu.link}
        className=' flex  flex-col items-center justify-center gap-2 no-underline '
      >
        <Image
          src={`/icons/dashboard/${menu.icon}.svg`}
          width={24}
          height={24}
          alt={menu.name}
        />

        <span className=' font-label__large text-neutral-100 no-underline   '>
          {menu.name}{" "}
        </span>
      </Link>
    </div>
  )
}
