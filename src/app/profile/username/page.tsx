'use client'

import { Header, StepperComponent } from '@/components'
import { BtnMain, RegisterInput, SetupLayout } from '@/shared'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import {
	useForm,
	FormProvider,
	FieldValues,
	FieldError,
	UseFormRegister,
} from 'react-hook-form'

interface UsernameInputProps extends Partial<FieldValues> {
	user_name: string
}
// create an array of 6 strings with the word 'pesa' in different variations
const pesa = ['pesa', 'Pesa', 'PESA', 'pEsa', 'peSa', 'pesA']

export default function Username() {
	const Router = useRouter()
	const methods = useForm<UsernameInputProps>({
		defaultValues: {
			user_name: '',
		},
	})

	const onSubmit = async (data: UsernameInputProps) => {
		console.log('login data', data)
		Router.push('/profile-setup/bank')
	}
	return (
		<SetupLayout bg='bg-profile-1'>
			<div className=' px-[60px]  pt-[180px] flex flex-col gap-[112px] '>
				<Header activeStep={0} />

				<div className=' bg-neutral-20 py-16 px-8 rounded-xl flex flex-col gap-[88px] '>
					<div className=''>
						<FormProvider {...methods}>
							<form
								className=' flex  flex-col gap-4 '
								onSubmit={methods.handleSubmit(onSubmit)}>
								<RegisterInput
									name={`user_name`}
									inputPlaceholder={`Enter Username`}
									rules={{
										required: 'Username is required',
									}}
									label='Username'
								/>

								<BtnMain
									btnText='Submit'
									className=' bg-purple py-4 px-[24px] font-body__large  text-grey rounded-lg  '
								/>
							</form>
						</FormProvider>
					</div>

					<div className=' flex flex-col gap-6  '>
						<h2 className=' font-body__large  text-neutral-70  '>
							Suggested Username
						</h2>

						<div className=' flex flex-wrap gap-4 '>
							{pesa.map((word, index) => (
								<div
									key={index}
									className=' flex items-center gap-4  cursor-pointer rounded-lg bg-purple px-8 py-2 '>
									<p className=' font-body__large text-grey '>{word}</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</SetupLayout>
	)
}
