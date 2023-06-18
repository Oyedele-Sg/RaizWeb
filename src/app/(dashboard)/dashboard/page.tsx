'use client'

import {
	CardTile,
	ExpenseTile,
	Menucard,
	RecentTransaction,
	SpendingTile,
} from '@/components'
import {
	BtnMain,
	IconAddCircle,
	IconMore,
	TimelineSelect,
	WhiteTileWrap,
} from '@/shared'
import { time } from 'console'
import Image from 'next/image'
import React from 'react'

function page() {
	const spendingTrackingData = [
		{
			type: 'income',
			amount: 10000,
			icon: 'income',
		},
		{
			type: 'spending',
			amount: 10000,
			icon: 'spending',
		},
		{
			type: 'spending limit',
			amount: 10000,
			icon: 'limit',
		},
	]

	return (
		<div className=' grid grid-rows-2 grid-cols-[396px_1fr] gap-6  '>
			<div className=''>
				<Menucard />
			</div>
			<div className=' grid grid-cols-[1fr_218px] gap-6 h-full  '>
				<div className=' grid grid-rows-[126px_1fr] gap-6 '>
					<div className=' flex  justify-between '>
						{spendingTrackingData.map((data, index) => (
							<SpendingTile key={index} data={data} />
						))}
					</div>
					<div className=''>
						<WhiteTileWrap extraStyle=' pt-8  pb-[22px] px-[34px] h-full flex flex-col gap-6  '>
							<div className=' flex justify-between items-center  '>
								<h3 className=' text-neutral-100 font-title__medium   '>
									Analytics Report
								</h3>
								<TimelineSelect />
								<BtnMain
									btnText=' Top-Up '
									btnStyle=' py-2 px-4 bg-purple text-grey rounded-lg font-label__large  '
								/>
							</div>
						</WhiteTileWrap>
					</div>
				</div>
				<div className=''>
					<ExpenseTile />
				</div>
			</div>
			<div className=''>
				<CardTile />
			</div>
			<div>
				<RecentTransaction />
			</div>
		</div>
	)
}

export default page
