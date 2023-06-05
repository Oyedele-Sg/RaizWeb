import { Stepper } from '@/shared'
import React from 'react'

interface Props {
	activeStep: number
}

export const AuthStepper: React.FC<Props> = ({ activeStep }) => {
	const steps = ['Email', 'BVN', 'Phone Number']
	return (
		<div>
			{' '}
			<Stepper steps={steps} activeStep={activeStep} />{' '}
		</div>
	)
}
