import React from 'react'

interface Props {
	extraStyle?: string
	children: React.ReactNode
}

export const WhiteTileWrap = ({ extraStyle, children }: Props) => {
	return (
		<div className={` bg-grey rounded-lg ${extraStyle}  `}> {children} </div>
	)
}
