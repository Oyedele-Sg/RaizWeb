import { SetupLayout } from '@/shared'
import Image from 'next/image'

export default function Username() {
	return (
		<SetupLayout bg='bg-profile-1'>
			<div className=''>
				<h1 className=' font-display__medium text-purple font-semi-mid '>
					Profile Set-Up
				</h1>
			</div>
		</SetupLayout>
	)
}
