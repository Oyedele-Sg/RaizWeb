" use client "

import Image from "next/image"
import React from "react"

export const Sidebar = () => {
  const dashboardIcon = [
    "dashboard",
    "wallet",
    "icon-card",
    "icon-receipt",
    "chart",
  ]
  const mobileSashboardIcon = [
    "dashboard",
    "wallet",
    "icon-card",
    "icon-receipt",
    "chart",
  ]

  const utilsIcon = ["toggle-off-circle", "setting"]

  return (
    <aside className=' w-full px-5 py-4 lg:w-[144px]   lg:pt-8 lg:pb-[80px]   z-10 fixed lg:absolute bottom-0 lg:bottom-auto  lg:min-h-screen bg-grey '>
      <div className='  flex  lg:flex-col lg:gap-[300px]'>
        <div className=' flex  w-full  lg:flex-col lg:items-center lg:gap-[84px]  '>
          <div className='hidden lg:block'>
            <Image
              src={`/icons/pesa-logo-light.svg`}
              width={48}
              height={48}
              alt='pesa icon logo'
            />
          </div>
          <div className=' flex   justify-between w-full lg:items-center lg:flex-col  gap-[52px] '>
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
        </div>
        <div className=' hidden lg:flex flex-col items-center gap-[52px] '>
          {utilsIcon.map((icon, index) => (
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
      </div>
    </aside>
  )
}
