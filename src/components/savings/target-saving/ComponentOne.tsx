import React from "react"

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
            <div
              className=' px-6 py-4  border border-neutral-50 rounded-lg flex flex-col gap-2 w-full hover:bg-neutral-30 cursor-pointer '
              key={index}
              onClick={() => setCurrent(item.link)}
            >
              <h3 className=' font-title__large text-purple  cursor-pointer '>
                {" "}
                {item.title}{" "}
              </h3>
              <p className=' text-neutral-80 font-body__large cursor-pointer '>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
