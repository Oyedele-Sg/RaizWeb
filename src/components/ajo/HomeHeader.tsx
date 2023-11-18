import { UtilityIcons } from "@/shared"
import { useRouter } from "next/navigation"
import React from "react"

interface Props {
  title: string
}

export function HomeHeader({ title }: Props) {
  const Router = useRouter()
  return (
    <header className='  py-12   lg:py-8  '>
      <div className=' flex items-center justify-between '>
        <div className='' onClick={() => Router.push("/ajo/hub")}>
          <h1 className=' cursor-default font-display__small text-purple font-semi-mid   '>
            {title}
          </h1>
        </div>

        <UtilityIcons iconExtraStyle=' flex  gap-8 ' ajo />
      </div>
    </header>
  )
}
