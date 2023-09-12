import { FC, ReactNode } from 'react'

interface Props {
	children: ReactNode
}

export const AuthFormWrap: FC<Props> = ({ children }) => {
	return <div className='flex flex-col gap-[26px]'>{children}</div>
}
