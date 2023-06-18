'use client'

import { BtnMain, IconAddCircle, IconMore, WhiteTileWrap } from '@/shared'
import Image from 'next/image'
import React from 'react'

export const CardTile = () => {
	return (
		<WhiteTileWrap extraStyle=' py-6 px-[22px] flex flex-col gap-4  '>
			<div className=' flex justify-between items-center  '>
				<h3 className=' text-neutral-100 font-title__medium   '> My Cards </h3>{' '}
				<IconMore />
			</div>

			<div>
				<Image
					src='/illustrations/pesa-dummy-card.svg'
					width={350.6}
					height={152}
					alt='pesa dummy card'
				/>
			</div>

			<div className=' flex flex-col gap-[28px] '>
				{' '}
				<div className='  flex flex-col gap-2  '>
					<h4 className=' text-neutral-70 font-body__medium  '> Get Started</h4>{' '}
					<div className=' flex justify-between items-center  '>
						<h2 className=' gradient-text text-[18px] font-semi-mid   '>
							₦0.00
						</h2>
						<div className=' flex  '>
							<Image
								src={'/icons/arrow-up.svg'}
								width={16}
								height={16}
								alt='  '
							/>
							<span className='  font-title__large text-positive '>0% </span>
						</div>
						<div className=' flex '>
							<Image
								src={'/icons/arrow-down.svg'}
								width={16}
								height={16}
								alt='  '
							/>
							<span className='  font-title__large text-error '>0% </span>
						</div>
					</div>
				</div>
				<BtnMain
					btnText=' Add Card '
					btnStyle=' flex items-center  justify-center w-full  gap-2 text-purple font-body__medium  bg-neutral-30 py-3   '>
					{' '}
					<IconAddCircle />{' '}
				</BtnMain>
			</div>
		</WhiteTileWrap>
	)
}
