'use client'

import { BtnMain, SetupLayout } from '@/shared'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function BankSuccess() {
	const Router = useRouter()
	return (
		<SetupLayout bg='bg-profile-1'>
			<div className=' max-w-[502px] mx-auto  flex-col gap-12   h-full flex items-center justify-center'>
				<div className=' px-[35px] flex flex-col gap-8 '>
					<div className='flex items-center justify-center '>
						<Image
							src='/illustrations/verify-success.svg'
							width={167.5}
							height={129.07}
							alt='success'
						/>
					</div>
					<div className=''>
						<div className=' text-center flex flex-col gap-2   '>
							<h1 className=' font-headline__large  font-semi-mid text-purple   '>
								Account Number Added
							</h1>
							<p className=' font-body__large text-neutral-90 '>
								Your account number has been successfully verified and saved for
								later!
							</p>
						</div>
					</div>
					<div className=' flex items-center justify-center  gap-12 px-4 '>
						<BtnMain
							btnText='Add More'
							btnStyle=' border  w-full border-purple text-purple  '
							onClick={() => Router.push('/profile-setup/bank/add-more')}
						/>
						<BtnMain
							btnText='Done '
							btnStyle=' w-full  bg-purple text-grey   '
							onClick={() => Router.push('/profile-setup/bank/add-more')}
						/>
					</div>
				</div>
			</div>
		</SetupLayout>
	)
}
