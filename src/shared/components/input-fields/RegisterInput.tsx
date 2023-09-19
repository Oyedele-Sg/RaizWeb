"use client"

import Image from "next/image"
import React, { ReactNode } from "react"
import { useFormContext, FieldValues, FieldError } from "react-hook-form"

interface RegisterInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name: string
  label?: string
  type?: string
  rules?: Object
  inputPlaceholder?: string
  extraClass?: string
  width?: string
  right?: boolean
  inputIcon?: ReactNode
  children?: ReactNode
  childrenHandleClick?: () => void
  onchange?: () => void
  disabled?: boolean
  value?: string
}

export const RegisterInput: React.FC<RegisterInputProps> = ({
  name,
  label,
  type,
  rules,
  inputPlaceholder,
  extraClass,
  width,
  right,
  inputIcon,
  children,
  childrenHandleClick,
  onchange,
  disabled,
  value
}) => {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext<FieldValues>()

  const iconHandleClick = () => {
    // Handle click logic for the inputIcon
  }

  const iconFunc = () => {
    // Perform any specific functionality related to the inputIcon
  }

  const renderInputIcon = () => {
    if (typeof inputIcon === "string") {
      return <span>{inputIcon}</span>
    }

    return inputIcon
  }

  return (
    <div
      className={`relative w-full rounded-lg input_field  ${extraClass} ${width}`}
    >
      {label && (
        <label
          className={`font-label__large text-neutral-90 ${
            errors[name] ? "text-error" : ""
          }  `}
          htmlFor={name}
        >
          {label}
        </label>
      )}

      <div className=' relative  '>
        <div className=' flex flex-col gap-2 '>
          <input
            className={` form-input pl-0   input_field-input  ${
              errors[name] ? "input_field-input_error" : ""
            }`}
            type={type || "text"}
            placeholder={inputPlaceholder}
            id={name}
            {...register(name as any, rules)}
            autoComplete='off'
            // onChange={onchange}
            value={value}

            disabled={disabled}
          />
          {errors[name] && (
            <span className='error-message'>
              {(errors[name] as FieldError).message}
            </span>
          )}
        </div>

        {children && (
          <div
            className='  absolute password_field-input top-[30px] '
            onClick={childrenHandleClick}
          >
            {!errors[name] ? (
              children
            ) : (
              <Image
                src={`/icons/info-circle.svg`}
                width={24}
                height={24}
                alt='error'
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
}
