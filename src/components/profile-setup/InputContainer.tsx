import React from "react"

interface InputContainerProps {
  children: React.ReactNode
}

export const InputContainer: React.FC<InputContainerProps> = ({ children }) => {
  return (
    <div className=' bg-neutral-20 py-12 px-4  lg:p-12 rounded-xl'>
      {children}
    </div>
  )
}
