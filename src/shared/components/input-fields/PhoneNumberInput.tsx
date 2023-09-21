"use client"

import Image from "next/image"
import React, { ReactNode } from "react"
import { useFormContext, FieldValues, FieldError } from "react-hook-form"

type PhoneNumberProps = {
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
}

export const PhoneNumberInput: React.FC<PhoneNumberProps> = ({
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
          className={`font-label__large text-purple ${
            errors[name] ? "text-error" : ""
          }  `}
          htmlFor={name}
        >
          {label}
        </label>
      )}

      <div className=' relative  '>
        <div className=' flex flex-col gap-2  '>
          <div
            className={` flex items-center  border-b-purple border-b-[1px]  ${
              errors[name] ? "input_field-input_error" : ""
            } `}
          >
            <span className=' text-neutral-60  '>+234</span>
            <input
              className={` form-input   w-full h-full    font-body__large text-neutral-90 placeholder:text-neutral-50  bg-transparent pb-2 border-none outline-none `}
              type={"tel"}
              placeholder={inputPlaceholder}
              id={name}
              {...register(name as any, rules)}
              disabled={isSubmitting}
              autoComplete='off'
            />
          </div>
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
