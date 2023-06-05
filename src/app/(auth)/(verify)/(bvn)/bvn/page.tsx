'use client'

import { AuthStepper } from '@/components/auth/AuthStepper'
import { AuthButton, BtnMain, RegisterInput, Stepper } from '@/shared'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import {
	useForm,
	FormProvider,
	FieldValues,
	FieldError,
	UseFormRegister,
} from 'react-hook-form'

interface InputBVNFormProps extends Partial<FieldValues> {
	bvn: string
}

export default function InputBVN() {
	const methods = useForm<InputBVNFormProps>({
		defaultValues: {
			bvn: '',
		},
	})

	const [showBVN, setShowBVN] = useState<boolean>(false)

	const onSubmit = async (data: InputBVNFormProps) => {
		console.log('login data', data)
	}
	return (
		<div className=' max-w-[502px] mx-auto flex flex-col gap-12  '>
			<div>
				<AuthStepper activeStep={1} />
			</div>

			<div className=' flex flex-col gap-[56px] '>
				<div className=' text-center flex flex-col gap-2   '>
					<h1 className=' font-headline__large  font-semi-mid text-purple   '>
						{' '}
						Bank Verification Number
					</h1>
					<p className=' font-body__large text-neutral-90 '>
						Enter BVN to verify your account.
					</p>
				</div>

				<div className=' '>
					<FormProvider {...methods}>
						<form
							onSubmit={methods.handleSubmit(onSubmit)}
							className='flex flex-col gap-8'>
							<RegisterInput
								name={`bvn`}
								inputPlaceholder={`Enter BVN`}
								label='Bank Verification Number'
								rules={{
									required: 'Password is required',
									minLength: {
										value: 11,
										message: 'BVN must have  11 characters',
									},
									pattern: {
										value: /^[0-9]{11}$/,
										message: 'BVN must have  11 digit characters',
									},
								}}
								childrenHandleClick={() => setShowBVN((state) => !state)}
								type={showBVN ? 'text' : 'password'}
								extraClass={`mt-6`}>
								<Image
									src={`/icons/eye-slash.svg`}
									alt='show password'
									width={24}
									height={24}
									className='.password_field-input top-[20px] '
								/>
							</RegisterInput>

							<div className=' flex items-center justify-center   '>
								<AuthButton
									btnStyle=' px-[101.5px] '
									className='  '
									btnText={'Verify BVN'}
								/>
							</div>
						</form>
					</FormProvider>
				</div>
			</div>
		</div>
	)
}
