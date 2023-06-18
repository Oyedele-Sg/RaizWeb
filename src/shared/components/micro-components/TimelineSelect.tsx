import React from 'react'

export const TimelineSelect = () => {
	const timelineSelect = ['1W', '1M', '1Y']

	return (
		<div className=' flex justify-between  '>
			{timelineSelect.map((item, index) => (
				<div
					key={index}
					className=' flex justify-between items-center py-1 px-4 rounded hover:bg-neutral-20  '>
					<h4 className=' text-purple font-title__medium  '>{item}</h4>
				</div>
			))}
		</div>
	)
}
