import React, { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	btnText: string
	btnStyle?: string
}

export const AuthButton: React.FC<ButtonProps> = ({
	btnText,
	btnStyle,
	...rest
}) => {
	return (
		<div className={`authBtn ${btnStyle} `}>
			<button {...rest}>{btnText}</button>
		</div>
	)
}
