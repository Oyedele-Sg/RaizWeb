import { UtilityIcons } from "@/shared"
import { useRouter } from "next/navigation"
import React from "react"

interface Props {
  title: string
  link: string
}

export function HomeHeader({ title, link }: Props) {
  const Router = useRouter()
  return (
    <header className='  py-12   lg:pt-[42px] lg:pb-11  '>
      <div className=' flex items-center justify-between '>
        <div className='' onClick={() => Router.push(link)}>
          <h1 className=' cursor-default font-display__small text-purple font-semi-mid   '>
            {title}
          </h1>
        </div>

        <UtilityIcons iconExtraStyle=' flex  gap-8 ' ajo />
      </div>
    </header>
  )
}
