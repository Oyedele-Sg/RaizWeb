import React from "react"

interface Props {
  children: React.ReactNode
}

export function ActivityItemWrap({ children }: Props) {
  return <div className=' flex flex-col gap-5  '>{children}</div>
}
