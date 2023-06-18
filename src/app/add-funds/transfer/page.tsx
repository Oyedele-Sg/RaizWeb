'use client'

import { InputContainer } from '@/components'
import {
	BackArrow,
	IconPesaColored,
	NextArrow,
	RegisterInput,
	SetupLayout,
} from '@/shared'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'

interface TransferInputProps {
	bank_name: string
	account_number: string
	beneficiary_name: string
}

export default function page() {
	const Router = useRouter()
	const methods = useForm<TransferInputProps>({
		defaultValues: {
			bank_name: '',
			account_number: '',
			beneficiary_name: '',
		},
	})

	const onSubmit = async (data: TransferInputProps) => {
		console.log('login data', data)
		Router.push('/profile-setup/bank/success')
	}

	return (
		<div>
			<SetupLayout bg='bg-profile-1'>
				<div className=' m-[72px] flex flex-col gap-[84px] '>
					<IconPesaColored />

					<div className=' flex flex-col gap-3 '>
						<div className=''>
							<button className=''>
								<BackArrow />
							</button>
							<button className=''>
								<NextArrow />
							</button>
						</div>

						<InputContainer>
							<div className=' flex flex-col gap-[36px]  '>
								<div>
									<h2 className='  font-display__medium text-purple font-semi-mid '>
										Bank Transfer
									</h2>
									<p className=' text-neutral-70 font-title__large   '>
										{' '}
										Add funds to wallets{' '}
									</p>
								</div>
								<FormProvider {...methods}>
									<form action='' onSubmit={methods.handleSubmit(onSubmit)}>
										<RegisterInput
											name={`bank_name`}
											inputPlaceholder={`Type a bank`}
											rules={{
												required: 'Input a bank name',
											}}
											label='Bank name'
										/>
									</form>
								</FormProvider>
							</div>
						</InputContainer>
					</div>
				</div>
			</SetupLayout>
		</div>
	)
}
