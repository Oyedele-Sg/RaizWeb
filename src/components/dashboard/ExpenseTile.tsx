import {
	BtnMain,
	IconAddCircle,
	IconMore,
	TimelineSelect,
	WhiteTileWrap,
} from '@/shared'
import Image from 'next/image'
import React from 'react'

export const ExpenseTile = () => {
	return (
		<WhiteTileWrap extraStyle=' pt-[22px] pb-[31px] px-4 h-full flex flex-col gap-6  '>
			<div className=' flex justify-between items-center  '>
				<h3 className=' text-neutral-100 font-title__medium   '>
					All Expenses
				</h3>
				<IconMore />
			</div>

			<div className='  flex flex-col gap-12 '>
				<TimelineSelect />
				<div className=' mx-auto '>
					<Image
						src={`/illustrations/expenses-dummy.svg`}
						width={174}
						height={174}
						alt=''
					/>
				</div>
				<div className=' flex flex-col items-center gap-3 '>
					<h4 className=' text-[18px] gradient-text font-semi-mid '>
						No Expenses Recorded
					</h4>
					<BtnMain
						btnText=' Top Up '
						btnStyle=' flex items-center  justify-center w-full  gap-2 text-purple font-body__medium  bg-neutral-30 py-3   '>
						<IconAddCircle />
					</BtnMain>
				</div>
			</div>
		</WhiteTileWrap>
	)
}
