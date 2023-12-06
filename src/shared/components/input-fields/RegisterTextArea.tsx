"use client"

import React from "react"
import { useFormContext, FieldValues, FieldError } from "react-hook-form"

interface RegisterTextAreaProps {
  name: string
  label: string
  rules: Object
  width?: string
  extraClass?: string
  inputPlaceholder?: string
}

export const RegisterTextArea: React.FC<RegisterTextAreaProps> = ({
  name,
  label,
  rules,
  width,
  extraClass,
  inputPlaceholder,
}) => {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext<FieldValues>()

  return (
    <div
      className={`relative w-full rounded-lg input_field  ${extraClass} ${width}`}
    >
      {label && (
        <label
          className={`font-label__large text-neutral-90 capitalize ${
            errors[name] ? "text-error" : ""
          }  `}
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <div className=' relative  '>
        <div className=' flex flex-col gap-2 '>
          <textarea
            id={name}
            placeholder={inputPlaceholder}
            {...register(name as any, rules)}
            disabled={isSubmitting}
            className={` form-input pl-0 bg-transparent  input_field-input  ${
              errors[name] ? "input_field-input_error" : ""
            }`}
          />
          {errors[name] && (
            <span className='error-message'>
              {(errors[name] as FieldError).message}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
