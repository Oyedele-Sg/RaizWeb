'use client'

import * as React from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import { IconConnector, IconConnectorActive } from './icons'
import { StepIconProps } from '@mui/material'
import StepConnector, {
	stepConnectorClasses,
} from '@mui/material/StepConnector'
import { styled } from '@mui/material/styles'

interface Props {
	activeStep: number
	steps: string[]
}

const QontoConnector = styled(StepConnector)(({ theme }) => ({
	[`&.${stepConnectorClasses.alternativeLabel}`]: {
		top: 10,
		left: 'calc(-50% + 16px)',
		right: 'calc(50% + 16px)',
	},
	[`&.${stepConnectorClasses.active}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			borderColor: '#7E6298',
		},
	},
	[`&.${stepConnectorClasses.completed}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			borderColor: '#4B0082',
		},
	},
	[`& .${stepConnectorClasses.line}`]: {
		borderColor:
			theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
		borderTopWidth: 5,
		borderRadius: 10,
	},
}))

const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
	({ theme, ownerState }) => ({
		color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
		display: 'flex',
		height: 22,
		alignItems: 'center',
		...(ownerState.active && {
			color: '#784af4',
		}),
		'& .QontoStepIcon-completedIcon': {
			color: '#784af4',
			zIndex: 1,
			fontSize: 18,
		},
		'& .QontoStepIcon-circle': {
			width: 8,
			height: 8,
			borderRadius: '50%',
			backgroundColor: 'currentColor',
		},
	})
)

function StepIcon(props: StepIconProps) {
	const { active, completed, className } = props

	return (
		<QontoStepIconRoot ownerState={{ active }} className={className}>
			{completed ? <IconConnectorActive /> : <IconConnector />}
		</QontoStepIconRoot>
	)
}

const QontoStepLabel = styled(StepLabel)<{
	completed: boolean
	active: boolean
}>(({ theme, completed, active }) => ({
	'& .MuiStepLabel-iconContainer': {
		position: 'relative',
		'& .MuiStepIcon-root': {
			zIndex: 1,
			border: `2px solid  #B3261E`,
		},
	},
	'& .MuiStepLabel-labelContainer': {
		position: 'absolute',
		top: '-200%',
		left: '50%',
		transform: 'translateX(-50%)',
		textAlign: 'center',
		color: theme.palette.mode === 'dark' ? '#4B0082' : '#BFABD3',
		width: '100%',
		transition: 'color 0.3s ease',
	},
	'& .MuiStepLabel-label': {
		fontSize: 12,
		top: '-200% ',
	},
	...(active && {
		'& .MuiStepLabel-label': {
			color: '#7E6298',
		},
	}),

	...(completed && {
		'& .MuiStepLabel-labelContainer': {},
		'& .MuiStepLabel-label': {
			position: 'absolute',
			top: '-200%',
			left: '50%',
			transform: 'translateX(-50%)',
			color: '#4B0082',
		},
	}),
}))
export default function HorizontalLabelPositionBelowStepper({
	activeStep,
	steps,
}: Props) {
	return (
		<div className='  w-full '>
			<Box sx={{ width: '100%' }}>
				<Stepper
					alternativeLabel
					activeStep={activeStep}
					connector={<QontoConnector />}>
					{steps.map((label, index) => (
						<Step className='  ' key={label}>
							<QontoStepLabel
								StepIconComponent={StepIcon}
								completed={activeStep > index}
								active={activeStep === index}>
								{label}
							</QontoStepLabel>
						</Step>
					))}
				</Stepper>
			</Box>
		</div>
	)
}
