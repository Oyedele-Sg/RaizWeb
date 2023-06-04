'use client'

import {
	AuthButton,
	AuthFieldWrap,
	AuthFormMainContainer,
	AuthFormWrap,
	AuthSubmit,
	CheckBox,
	RegisterInput,
} from '@/shared'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC, useState } from 'react'
import {
	useForm,
	FormProvider,
	FieldValues,
	FieldError,
	UseFormRegister,
} from 'react-hook-form'

interface RegisterFormProps extends Partial<FieldValues> {
	firstName: string
	lastName: string
	email: string
	password: string
	user_type_id: number
}

export const RegisterForm: FC = () => {
	const methods = useForm<RegisterFormProps>({
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			user_type_id: 2,
		},
	})

	const [showPassword, setShowPassword] = useState<boolean>(false)
	const [checked, setChecked] = useState<boolean>(false)

	const onSubmit = async (data: RegisterFormProps) => {
		console.log('login data', data)
	}
	return (
		<FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(onSubmit)}>
				<AuthFormMainContainer>
					<AuthFormWrap>
						<AuthFieldWrap>
							<div className=' flex gap-6  '>
								<RegisterInput
									name={`firstName`}
									inputPlaceholder={`Enter your first name`}
									rules={{
										required: 'First name is required',
									}}
									label='First Name'
								/>
								<RegisterInput
									name={`lastName`}
									inputPlaceholder={`Enter your last name`}
									rules={{
										required: 'Last name is required',
									}}
									label='Last Name'
								/>
							</div>

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
							<RegisterInput
								name={`password`}
								inputPlaceholder={`Enter 8 characters long`}
								label='Password'
								rules={{
									required: 'Password is required',
									minLength: {
										value: 8,
										message: 'Password must have at least 8 characters',
									},
									pattern: {
										value:
											/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
										message:
											'Password must have at least 1 uppercase, 1 lowercase and 1 number',
									},
								}}
								childrenHandleClick={() => setShowPassword((state) => !state)}
								type={showPassword ? 'text' : 'password'}>
								<Image
									src={`/icons/eye-slash.svg`}
									alt='show password'
									width={24}
									height={24}
									className=' top-[20px] '
								/>
							</RegisterInput>
						</AuthFieldWrap>

						<div className=' flex items-center gap-4 '>
							<CheckBox checked={checked} setChecked={setChecked} />
							<div className='text-neutral-80 '>
								I agree to the company’s{' '}
								<Link
									className='text-neutral-90 underline '
									href='/forgot-password'>
									terms of use
								</Link>{' '}
								and{' '}
								<Link
									className='text-neutral-90 underline '
									href='/forgot-password'>
									privacy policy
								</Link>
							</div>
						</div>
					</AuthFormWrap>
					<AuthSubmit
						btnText='Log In'
						linkHref='/login'
						linkPreText={`Already have an account?`}
						linkText='Log In'
					/>
				</AuthFormMainContainer>
			</form>
		</FormProvider>
	)
}
