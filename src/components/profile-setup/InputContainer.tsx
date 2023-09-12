import React from 'react'

interface InputContainerProps {
	children: React.ReactNode
}

export const InputContainer: React.FC<InputContainerProps> = ({ children }) => {
	return <div className=' bg-neutral-20  py-16 px-8 rounded-xl'>{children}</div>
}
