import React, { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	btnText: string

	btnStyle?: string
	children?: React.ReactNode
}

export const BtnMain: React.FC<ButtonProps> = ({
	children,
	btnText,

	btnStyle,
	...rest
}) => {
	return (
		<button
			className={`rounded-lg py-4 text-center font-body__large  ${btnStyle} `}
			{...rest}>
			{children}
			{btnText}
		</button>
	)
}
