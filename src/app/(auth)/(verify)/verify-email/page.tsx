'use client'

import { AuthButton, BtnMain, Stepper } from '@/shared'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function VerifyMail() {
	return (
		<div className=' max-w-[502px] mx-auto flex flex-col gap-12  '>
			<div>
				<Stepper activeStep={0} />
			</div>

			<div className=' px-[35px] flex flex-col gap-[80px] '>
				<div className=' text-center flex flex-col gap-2   '>
					<h1 className=' font-headline__large  font-semi-mid text-purple   '>
						{' '}
						Email Verification Link Sent!
					</h1>
					<p className=' font-body__large text-neutral-90 '>
						{' '}
						Please check your email{' '}
						<Link href={''} className=' underline '>
							khadijaharowosegbe16@gmail.com
						</Link>{' '}
						for the verification link sent.{' '}
					</p>
				</div>

				<div className=' flex flex-col justify-center items-center  gap-8 '>
					<div className=' flex gap-12   '>
						<BtnMain
							btnStyle='  border-purple border-[1px] rounded-[8px] text-purple  px-[42px]  '
							btnText={'Resend Email'}
						/>
						<AuthButton
							btnStyle='flex-1 w-full px-[11.5px] '
							className=' flex-1 '
							btnText={'Verify Your Account'}
						/>
					</div>

					<div>
						<Link href={'  '} className=' text-neutral-90  text-center '>
							Wrong Email?
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
