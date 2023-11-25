import { FC, ReactNode } from 'react'

interface Props {
	children: ReactNode
}

export const AuthFieldWrap: FC<Props> = ({ children }) => {
	return <div className='flex flex-col gap-8 '>{children}</div>
}
