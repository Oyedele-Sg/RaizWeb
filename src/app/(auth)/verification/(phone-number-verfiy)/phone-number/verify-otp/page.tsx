'use client'

import { AuthStepper } from '@/components'
import { AuthButton, BtnMain, Stepper } from '@/shared'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { FC, useRef } from 'react'
import { useForm, FieldValues } from 'react-hook-form'

interface OTPFormValues extends FieldValues {
	digit1: string
	digit2: string
	digit3: string
	digit4: string
}

const VerifyOTP = () => {
	const Router = useRouter()

	const otpInputRefs = useRef<Array<HTMLInputElement | null>>([])

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<OTPFormValues>()

	const onSubmit = (data: OTPFormValues) => {
		const otp = `${data.digit1}${data.digit2}${data.digit3}${data.digit4}`
		console.log('otp', otp)
		// onOtpSubmit(otp)
	}

	const handleInputChange = (index: number) => {
		if (otpInputRefs.current[index]?.value.length === 1) {
			if (index < otpInputRefs.current.length - 1) {
				otpInputRefs.current[index + 1]?.focus()
			} else {
				otpInputRefs.current[index]?.blur()
				// Submit OTP or perform the desired action here
			}
		}
	}

	return (
		<div className=' max-w-[502px] mx-auto flex flex-col gap-12  '>
			<div>
				<AuthStepper activeStep={2} />
			</div>

			<div className=' px-[35px] flex flex-col gap-[104px] '>
				<div className=' text-center flex flex-col gap-2   '>
					<h1 className=' font-headline__large  font-semi-mid text-purple   '>
						{' '}
						Enter OTP
					</h1>
					<p className=' font-body__large text-neutral-90 '>
						We sent you OTP to your phone number
					</p>
				</div>

				<div>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className=' flex flex-col gap-8 '>
						<div className='flex gap-[33px] justify-center'>
							{Array.from({ length: 4 }, (_, index) => (
								<input
									key={index}
									type='text'
									{...register(`digit${index + 1}`, { required: true })}
									maxLength={1}
									className={`form-input otp_field-input ${
										errors[`digit${index + 1}`] ? 'otp_field-input_error' : ''
									}`}
									ref={(ref) => {
										otpInputRefs.current[index] = ref
									}}
									onChange={() => handleInputChange(index)}
								/>
							))}
						</div>

						{/* {errors.digit1 && <span>This field is required</span>}
						{errors.digit2 && <span>This field is required</span>}
						{errors.digit3 && <span>This field is required</span>}
						{errors.digit4 && <span>This field is required</span>} */}

						<div className=' flex flex-col justify-center items-center  gap-8 '>
							<div className=' flex gap-12   '>
								<BtnMain
									btnStyle='  border-purple border-[1px] rounded-[8px] text-purple  px-[42px]  '
									btnText={'Resend OTP'}
									type='reset'
								/>
								<AuthButton
									btnStyle='flex-1 w-full px-[42px] '
									btnText={'Verify OTP'}
									type='submit'
									onClick={() =>
										Router.push('/verification/phone-number/verify-otp/success')
									}
								/>
							</div>

							<div>
								<Link href={'  '} className=' text-neutral-90  text-center '>
									Wrong Email?
								</Link>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default VerifyOTP
