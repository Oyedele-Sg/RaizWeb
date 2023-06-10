import React, { FC } from 'react'

interface Props {
	children: React.ReactNode
	bg: string
}

export const SetupLayout: FC<Props> = ({ children, bg }) => {
	return (
		<main className=' flex h-screen '>
			<div className='flex-[1]  h-full '>{children}</div>
			<div className={`flex-1 ${bg} bg-no-repeat bg-cover `}></div>
		</main>
	)
}
