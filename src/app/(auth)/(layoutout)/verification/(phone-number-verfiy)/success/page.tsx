'use client'

import { VerifySuccess } from '@/shared'
import React from 'react'

export default function SucessOTP() {
	return (
		<>
			<VerifySuccess
				activeStep={3}
				title='OTP Confirmed'
				description='OTP confirmed, your account is created! let’s get your profile ready.'
				btnLink='/profile-setup/username'
			/>
		</>
	)
}
