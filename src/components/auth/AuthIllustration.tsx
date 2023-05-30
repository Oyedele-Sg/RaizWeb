import { Logo } from "@/shared"
import Image from "next/image"
import React from "react"

interface Props {
  illustrationName: string
}

const AuthIllustration: React.FC<Props> = ({ illustrationName }) => {
  return (
    <div className=' flex flex-col items-center justify-center  h-full gap-[90px] '>
      <Logo />
      <Image
        src={`/illustrations/${illustrationName}.svg`}
        width={573.3370971679688}
        height={464}
        alt=''
      />
    </div>
  )
}

export default AuthIllustration
