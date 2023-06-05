'use client'

import { VerifySuccess } from '@/shared'

import React from 'react'

export default function SucessMail() {
	return (
		<>
			<VerifySuccess
				activeStep={0}
				title='Email Verified Successfully'
				description='Your email has been sucessfully verified and your account is
			created.'
			/>
		</>
	)
}
