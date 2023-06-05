'use client'

import * as React from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'

interface Props {
	activeStep: number
	steps: string[]
}

export default function HorizontalLabelPositionBelowStepper({
	activeStep,
	steps,
}: Props) {
	return (
		<Box sx={{ width: '100%' }}>
			<Stepper className='  ' activeStep={activeStep} alternativeLabel>
				{steps.map((label) => (
					<Step className='  ' key={label}>
						<StepLabel>{label}</StepLabel>
					</Step>
				))}
			</Stepper>
		</Box>
	)
}
