import React from "react"

interface Props {
  title: string
  data: string | number | undefined
}

export function SavingDetailsTile({ title, data }: Props) {
  return (
    <div className=' border border-neutral-30 rounded-lg p-4 flex-1 flex flex-col gap-4 '>
      <h4 className=' text-neutral-80 text-t-14  '> {title}</h4>
      <h3 className=' text-purple text-t-18 capitalize  '> {data} </h3>
    </div>
  )
}
