import React from "react"

interface Props {
  text: string
}

export function SubHeaders({ text }: Props) {
  return (
    <h3 className=' text-neutral-70 font-semi-mid text-t-14   '> {text} </h3>
  )
}
