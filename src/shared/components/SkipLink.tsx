import Link from "next/link"
import React from "react"

interface Props {
  link: string
}

export function SkipLink({ link }: Props) {
  return (
    <div className="w-full flex items-end justify-end ">
        <Link className=' font-body__medium text-neutral-80  ' href={link}>
          Skip
        </Link>
    </div>
  )
}


