'use client'

import { AuthStepper } from '@/components'
import { AuthButton, BtnMain, RegisterInput, Stepper } from '@/shared'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import {
	useForm,
	FormProvider,
	FieldValues,
	FieldError,
	UseFormRegister,
} from 'react-hook-form'

interface WrongEmailFormProps extends Partial<FieldValues> {
	email: string
}

export default function WrongMail() {
	const Router = useRouter()

	const methods = useForm<WrongEmailFormProps>({
		defaultValues: {
			email: '',
		},
	})

	const onSubmit = async (data: WrongEmailFormProps) => {
		console.log('login data', data)
		Router.push('/verification/email')
	}
	return (
		<div className=' max-w-[502px] mx-auto flex flex-col gap-12  '>
			<div>
				<AuthStepper activeStep={0} />
			</div>

			<div className=' flex flex-col gap-[80px] '>
				<div className=' text-center flex flex-col gap-2   '>
					<h1 className=' font-headline__large  font-semi-mid text-purple   '>
						{' '}
						Wrong Email?
					</h1>
					<p className=' font-body__large text-neutral-90 '>
						Enter correct email to verify your account.
					</p>
				</div>

				<div className=' '>
					<FormProvider {...methods}>
						<form
							onSubmit={methods.handleSubmit(onSubmit)}
							className='flex flex-col gap-8'>
							<RegisterInput
								name={`email`}
								inputPlaceholder={`Enter Email Address`}
								rules={{
									required: 'Email is required',
									pattern: {
										value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
										message: 'Invalid email address',
									},
								}}
								label='Email Address'
							/>

							<div className=' flex items-center justify-center   '>
								<AuthButton
									btnStyle=' px-[101.5px] '
									className='  '
									btnText={'Send Email'}
								/>
							</div>
						</form>
					</FormProvider>
				</div>
			</div>
		</div>
	)
}
