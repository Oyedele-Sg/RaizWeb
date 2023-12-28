import React from "react"

interface Props {
  data: {
    title: string
    description: string
    link: string
  }
  handleLink: () => void
}

export function LinkItem({ data, handleLink }: Props) {
  return (
    <div
      className=' px-6 py-4  border border-neutral-50 rounded-lg flex flex-col gap-2 w-full hover:bg-neutral-30 cursor-pointer '
      onClick={() => handleLink()}
    >
      <h3 className=' font-title__large text-purple  cursor-pointer '>
        {" "}
        {data.title}{" "}
      </h3>
      <p className=' text-neutral-80 font-body__large cursor-pointer '>
        {data.description}
      </p>
    </div>
  )
}
