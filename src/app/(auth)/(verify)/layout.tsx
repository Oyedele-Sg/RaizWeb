import { AuthButton, BtnMain, Stepper } from '@/shared'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function VerifyLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<main className=' flex items-center  justify-center min-h-screen  '>
			<div className=' w-[771px]  bg-grey rounded-[80px] p-16 my-[50px]  '>
				<div className=' w-full flex justify-end  '>
					<Image
						src='/icons/close-circle.svg'
						width={40}
						height={40}
						alt='close'
					/>
				</div>
				<div className=' mt-10 '>{children}</div>
			</div>
		</main>
	)
}
