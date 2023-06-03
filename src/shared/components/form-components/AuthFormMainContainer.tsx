import { FC, ReactNode } from 'react'

interface Props {
	children: ReactNode
}

export const AuthFormMainContainer: FC<Props> = ({ children }) => {
	return <div className='flex flex-col gap-[50px]'>{children}</div>
}
