import { IllustrationComponent, LoginForm } from '@/components'
import Image from 'next/image'
import React from 'react'

export default function Login() {
	return (
		<div>
			<div className='flex items-start py-[125px] max-h-[1024px] overflow-hidden '>
				<section className='flex-1  h-screen '>
					<IllustrationComponent
						illustrationName='login'
						width={554.1}
						height={400}
					/>
				</section>
				<section className='flex-1    pr-[70px]  '>
					<div className=' bg-grey w-[676px] max-h-[818px]  py-[164px] px-[50px] rounded-r-12  '>
						<div className='flex flex-col gap-12 '>
							<h1 className='  text-purple font-headline__large  '>
								Welcome Back
							</h1>
							<LoginForm />
						</div>
					</div>
				</section>
			</div>
		</div>
	)
}
