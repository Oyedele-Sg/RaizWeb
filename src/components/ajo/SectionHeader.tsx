import React from "react"

interface Props {
  text: string
}

function SectionHeader({ text }: Props) {
  return (
    <h2 className=' font-semibold text-purple text-t-18  lg:text-t-24 '>
      {" "}
      {text}{" "}
    </h2>
  )
}

export default SectionHeader
