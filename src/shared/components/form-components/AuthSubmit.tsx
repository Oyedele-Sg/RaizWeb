import { FC } from 'react'
import { AuthButton } from '../buttons'
import Link from 'next/link'

interface Props {
	btnText: string
	linkText: string
	linkHref: string
	linkPreText: string
}

export const AuthSubmit: FC<Props> = ({
	btnText,
	linkText,
	linkHref,
	linkPreText,
}) => {
	return (
		<div className=' flex flex-col items-center gap-4 '>
			<AuthButton btnText={btnText} btnStyle=' w-full ' />
			<div className='  font-body__large text-neutral-90  '>
				{linkPreText}{' '}
				<Link className=' text-neutral-80 underline ' href={linkHref}>
					{linkText}
				</Link>
			</div>
		</div>
	)
}
