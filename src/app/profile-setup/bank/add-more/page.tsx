'use client'

import { Header, InputContainer, StepperComponent } from '@/components'
import { BtnMain, IconSavedList, RegisterInput, SetupLayout } from '@/shared'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import {
	useForm,
	FormProvider,
	FieldValues,
	FieldError,
	UseFormRegister,
} from 'react-hook-form'

interface BankInputProps extends Partial<FieldValues> {
	bank_name: string
	account_number: string
}
// create an array of 6 strings with the word 'pesa' in different variations
const pesa = ['pesa', 'Pesa', 'PESA', 'pEsa', 'peSa', 'pesA']

export default function Username() {
	const Router = useRouter()
	const methods = useForm<BankInputProps>({
		defaultValues: {
			bank_name: '',
			account_name: '',
		},
	})

	const onSubmit = async (data: BankInputProps) => {
		console.log('login data', data)
		Router.push('/profile-setup/bank/success')
	}
	return (
		<SetupLayout bg='bg-profile-1'>
			<div className=' px-[60px]  pt-[50px] flex flex-col gap-[70px] '>
				<div className=' w-full flex items-end justify-end  '>
					{' '}
					<Link className=' font-body__medium text-neutral-80  ' href={``}>
						Skip
					</Link>{' '}
				</div>
				<Header activeStep={1} />

				<div className=' flex n flex-col gap-3 '>
					<div className=' flex justify-between  items-center'>
						<h2 className='pl-3 font-body__large  text-purple font-semi-mid text-[18px]   '>
							Add Traditional Bank Number
						</h2>

						<div className='flex items-center gap-1 '>
							<IconSavedList />
							<span className=' text-[16px] leading-[20px] text-purple   '>
								{' '}
								Saved List{' '}
							</span>
						</div>
					</div>

					<InputContainer>
						<div className=''>
							<FormProvider {...methods}>
								<form
									onSubmit={methods.handleSubmit(onSubmit)}
									className=' flex flex-col gap-8 items-center  '>
									<RegisterInput
										name={`user_name`}
										inputPlaceholder={`Type a bank`}
										rules={{
											required: 'Input a bank name',
										}}
										label='Bank name'
									/>
									<RegisterInput
										name={`account_name`}
										inputPlaceholder={` Enter account number  `}
										rules={{
											required: 'Input an account number',
											pattern: {
												value: /^[0-9]*$/,
												message: 'Account number must be a number',
											},
										}}
										label='Account number'
									/>

									<BtnMain
										btnText='Verify Account'
										btnStyle=' bg-purple text-grey font-body__medium text-[18px]  w-[200px] h-[50px]  rounded-[8px] '
									/>
								</form>
							</FormProvider>
						</div>
					</InputContainer>
				</div>
			</div>
		</SetupLayout>
	)
}
