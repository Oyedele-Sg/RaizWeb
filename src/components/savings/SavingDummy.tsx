import { BtnMain } from "@/shared"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React from "react"

interface Props {
  lock?: boolean
}

export function SavingDummy({ lock }: Props) {
  const Router = useRouter()
  return (
    <div className=' flex items-center justify-center gap-8'>
      <Image
        src='/illustrations/saving-dummy-1.svg'
        width={219}
        height={178}
        alt=''
      />
      <div className=' flex flex-col gap-6'>
        <h2 className=' text-purple text-t-24   '>
          {`No ${lock ? "Lock" : "Target"} Save Recorded`}
        </h2>
        <BtnMain
          btnStyle=' bg-[#3C91E6] rounded-lg text-white flex items-center  gap-2 px-6 '
          btnText={`Get Started with ${lock ? "Lock" : "Target"} Save  `}
          onClick={() =>
            lock
              ? Router.push("/savings/lock-savings/create")
              : Router.push("/savings/target-savings/create")
          }
        >
          {" "}
          <Image
            src={`/icons/add-circle.svg`}
            width={16}
            height={16}
            alt=''
          />{" "}
        </BtnMain>
      </div>
    </div>
  )
}
