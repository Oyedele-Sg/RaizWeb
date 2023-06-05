'use client'

import { AuthButton, BtnMain, Stepper, VerifySuccess } from '@/shared'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function SucessBVN() {
	return (
		<>
			<VerifySuccess
				activeStep={1}
				title='BVN Verified Successfully'
				description='Your BVN has been sucessfully verified and your account is
				created.'
			/>
		</>
	)
}
