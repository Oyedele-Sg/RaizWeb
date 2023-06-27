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

  const utilsIcon = ["toggle-off-circle", "setting"]

  return (
    <aside className='   w-[144px] pt-8 pb-[80px]   z-10 absolute   min-h-screen bg-grey '>
      <div className='  flex flex-col gap-[300px]  '>
        <div className=' flex flex-col items-center gap-[84px]  '>
          <div className=''>
            <Image
              src={`/icons/pesa-logo-light.svg`}
              width={48}
              height={48}
              alt='pesa icon logo'
            />
          </div>
          <div className=' flex flex-col gap-[52px] '>
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
        <div className=' flex flex-col items-center gap-[52px] '>
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
