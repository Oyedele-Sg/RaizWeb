'use client'

import React from 'react'
import {
	useFormContext,
	UseFormGetValues,
	FieldValues,
	FieldErrors,
	RegisterOptions,
} from 'react-hook-form'

interface RegisterTextAreaProps {
	name: keyof FieldErrors<UseFormGetValues<FieldValues>>
	label: string
	rules: RegisterOptions<UseFormGetValues<FieldValues>>
}

export const RegisterTextArea: React.FC<RegisterTextAreaProps> = ({
	name,
	label,
	rules,
}) => {
	const {
		register,
		formState: { errors, isSubmitting },
	} = useFormContext<UseFormGetValues<FieldValues>>()

	const registerProps = {
		name: name as string,
		...(rules && { rules }),
	}

	return (
		<div>
			{label && <label htmlFor={name}>{label}</label>}
			<textarea
				id={name}
				{...register(
					registerProps.name as string as never,
					registerProps.rules
				)}
				disabled={isSubmitting}
				className={errors && errors[name] ? 'error' : ''}
			/>
			{errors[name] && (
				<span className='error-message'>{errors[name]?.message}</span>
			)}
		</div>
	)
}
