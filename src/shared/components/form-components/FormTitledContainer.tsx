import { InputContainer } from '@/components'
import React from 'react'

interface Props {
	children: React.ReactNode
	title: string
	subtitle: string
	utils?: React.ReactNode
}

export const FormTitledContainer = ({
	children,
	title,
	subtitle,
	utils,
}: Props) => {
	return (
		<InputContainer>
			<div className=' flex flex-col gap-[36px]  '>
				<div className=' flex items-center justify-between '>
					<div>
						<h2 className='  font-display__medium text-purple font-semi-mid '>
							{title}
						</h2>
						<p className=' text-neutral-70 font-title__large   '>{subtitle}</p>
					</div>
					{utils}
				</div>
				{children}
			</div>
		</InputContainer>
	)
}
