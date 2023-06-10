import { Stepper } from '@/shared'
import React from 'react'

interface Props {
	activeStep: number
}

export const StepperComponent: React.FC<Props> = ({ activeStep }) => {
	const steps = ['Username', 'Bank', 'Done!']

	return (
		<div>
			<Stepper activeStep={activeStep} steps={steps} />
		</div>
	)
}
