"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React from "react"

export const Sidebar = () => {
  const Router = useRouter()
  const dashboardIcon = [
    "dashboard",
    "piggy-bank",
    "wallet",
    "icon-card",
    "icon-receipt",
    "chart",
  ]
  const mobileSashboardIcon = [
    { icon: "dashboard", link: "/dashboard", title: "Home" },
    { icon: "piggy-bank", link: "/dashboard", title: "Savings" },
    { icon: "chart", link: "/dashboard", title: "Analytics" },
    { icon: "money-tick", link: "/dashboard", title: "Loans" },
    { icon: "profile", link: "/dashboard", title: "Profile" },
  ]

  const utilsIcon = ["toggle-off-circle", "setting"]

  return (
    <aside className=' w-full px-5 py-4 lg:w-[144px]   lg:py-8 lg:h-screen   z-10 fixed  bottom-0 lg:bottom-auto  bg-grey overflow-auto hide-scrollbar '>
      <div className='  flex  lg:flex-col lg:justify-between  lg:h-full'>
        <div className=' flex  w-full  lg:flex-col lg:items-center lg:gap-[64px]  '>
          <div className='hidden lg:block'>
            <Image
              src={`/icons/pesa-logo-light.svg`}
              width={48}
              height={48}
              alt='pesa icon logo'
            />
          </div>
          <div className=' hidden lg:flex   justify-between w-full lg:items-center lg:flex-col  gap-[52px] '>
            {dashboardIcon.map((icon, index) => (
              <div key={index} className=''>
                <Image
                  src={`/icons/${icon}.svg`}
                  width={32}
                  height={32}
                  alt={`dashboard ${icon} icon`}
                />
              </div>
            ))}
          </div>
          <div className=' lg:hidden flex   justify-between w-full lg:items-center lg:flex-col  gap-[52px] '>
            {mobileSashboardIcon.map((icon, index) => (
              <div key={index} className=' flex flex-col items-center gap-1 '>
                <Image
                  src={`/icons/${icon.icon}.svg`}
                  width={32}
                  height={32}
                  alt={`dashboard ${icon} icon`}
                />
                <h5 className=" text-neutral-70     " >{icon.title}</h5>
              </div>
            ))}
          </div>
        </div>
        <div className=' hidden lg:flex flex-col items-center gap-[52px] mt-[100px]'>
          <div className=''>
            <Image
              src={`/icons/toggle-off-circle.svg`}
              width={32}
              height={32}
              alt={`dashboard toggle-off-circle icon`}
            />
          </div>

          <div className='' onClick={() => Router.push("/settings")}>
            <Image
              src={`/icons/setting.svg`}
              width={32}
              height={32}
              alt={`dashboard setting icon`}
            />
          </div>
        </div>
      </div>
    </aside>
  )
}
