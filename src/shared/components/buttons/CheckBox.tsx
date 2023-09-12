import { FC, useState } from 'react'

interface Props {
	checked: boolean
	setChecked: (checked: boolean) => void
}

export const CheckBox: FC<Props> = ({ checked, setChecked }) => {
	return (
		<div className='flex items-center'>
			<input
				type='checkbox'
				className='form-checkbox h-5 w-5 text-purple rounded-[4px] bg-transparent  '
				checked={checked}
				onChange={() => setChecked(!checked)}
			/>
		</div>
	)
}
