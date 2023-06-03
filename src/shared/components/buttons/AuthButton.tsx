import React, { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	btnText: string
}

export const AuthButton: React.FC<ButtonProps> = ({ btnText, ...rest }) => {
	return (
		<div className='authBtn '>
			<button className='  ' {...rest}>
				{btnText}
			</button>
		</div>
	)
}
