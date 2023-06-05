import React, { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	btnText: string
	border?: boolean
	btnStyle?: string
}

export const BtnMain: React.FC<ButtonProps> = ({
	btnText,
	border,
	btnStyle,
	...rest
}) => {
	return (
		<button
			className={` py-4 text-center font-body__large  ${btnStyle} `}
			{...rest}>
			{btnText}
		</button>
	)
}
