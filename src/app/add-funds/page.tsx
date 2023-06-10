import { BtnMain, IconPesaColored, Logo } from '@/shared'
import Image from 'next/image'
import React from 'react'

export default function page() {
	return (
		<main className=' flex flex-col  gap-[140px]'>
			<header className=' flex  items-center justify-between pt-16  mx-[72px] '>
				<IconPesaColored />

				<Image
					src={`/patterns/add-funds-header-pattern.svg`}
					width={234}
					height={48}
					alt=''
				/>
			</header>

			<section className=' flex flex-col items-center justify-center '>
				<div className=''>
					<h1 className=' font-display__medium text-purple text-center '>
						Add Funds to Wallet
					</h1>
					<p className=' font-title__large text-neutral-70 text-center '>
						Debit Card {'  '} Bank Transfer
					</p>
				</div>

				<div className=' p-16 bg-neutral-30 rounded-lg '>
					<div className=' rounded-xl bg-neutral-20 max-w-[360px] '>
						<Image
							src={`/illustrations/fund-one.svg`}
							width={360}
							height={188}
							alt=''
							className=' rounded-tr-xl rounded-tl-xl '
						/>

						<div className=' pt-[33px] pb-[28px] pr-[28px] pl-[12px] '>
							<div className=' flex flex-col gap-2  '>
								<h2 className=' font-title__large text-purple   '>
									Debit Card
								</h2>
								<p className=' text-neutral-70 font-title__medium'>
									Add funds to your wallet through your debit card Add funds to
									your wallet through
								</p>
							</div>

							<div className=''>
								<BtnMain
									className='  text-grey  '
									btnText='Add Funds to Wallet'
								/>
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>
	)
}
