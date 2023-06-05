'use client'

import { AuthButton, BtnMain, Stepper, VerifySuccess } from '@/shared'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function SucessOTP() {
	return (
		<>
			<VerifySuccess
				activeStep={2}
				title='OTP Confirmed'
				description='OTP confirmed, your account is created! let’s get your profile ready.'
			/>
		</>
	)
}
