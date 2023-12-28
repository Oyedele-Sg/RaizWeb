import React from "react"
import { LinkItem } from "../LinkItem"

interface Props {
  setCurrent: React.Dispatch<React.SetStateAction<string | undefined>>
}

export function ComponentOne({ setCurrent }: Props) {
  const options = [
    {
      title: "Personal Save",
      description:
        "Save with full control and privacy. Your personal savings goals, your way.",
      link: "personal",
    },
    {
      title: "Group Save",
      description:
        "Open your savings goals to the world. Crowdfund and achieve your goals collectively, priavtely or publicly.",
      link: "group",
    },
  ]
  return (
    <div className=' flex flex-col gap-9 '>
      <div className=' flex flex-col gap-1 '>
        <h2 className=' font-display__medium text-purple font-semi-mid '>
          Target Save
        </h2>
        <p className=' text-neutral-70  font-title__large '>
          Types of Target Save
        </p>
      </div>

      <div className=''>
        <div className=' flex flex-col gap-5  '>
          {options.map((item, index) => (
            <LinkItem data={item} handleLink={() => setCurrent(item.link)} />
          ))}
        </div>
      </div>
    </div>
  )
}
