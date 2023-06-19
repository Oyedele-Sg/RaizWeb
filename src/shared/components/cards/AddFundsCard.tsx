import Image from 'next/image'
import React from 'react'
import { BtnMain } from '../buttons'

interface Props {
	data: {
		type: string
		illustration: string
		subText: string
		link: string
	}
}

export const AddFundsCard = ({ data }: Props) => {
	return (
		<div className=' rounded-xl bg-neutral-20 max-w-[360px]   '>
			<Image
				src={`/illustrations/${data.illustration}.svg`}
				width={360}
				height={188}
				alt=''
				className=' rounded-tr-xl rounded-tl-xl '
			/>

			<div className=' pt-[33px] pb-[28px] pr-[28px] pl-[12px]  '>
				<div className=' flex flex-col gap-2  '>
					<h2 className=' font-title__large text-purple   '>{data.type}</h2>
					<p className=' text-neutral-70 font-title__medium'>{data.subText}</p>
				</div>

				<div className=' flex items-center justify-center mt-[67px] '>
					<BtnMain
						className='  text-grey  py-4 px-[60px] rounded-lg btn-gradient-default hover:btn-gradient-hovered '
						btnText='Add Funds to Wallet'
					/>
				</div>
			</div>
		</div>
	)
}
