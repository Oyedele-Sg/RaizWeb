import React from "react"
import {
  useFormContext,
  UseFormGetValues,
  FieldValues,
  FieldError,
} from "react-hook-form"

interface RegisterInputProps {
  name: string
  label?: string
  type?: string
  rules?: Record<string, any>
  inputPlaceholder?: string
  extraClass?: string
  width?: string
  right?: boolean
  inputIcon?: React.ReactNode
  children?: React.ReactNode
  childrenHandleClick?: () => void
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
}) => {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext<UseFormContextValues<FieldValues>>()

  return (
    <div
      className={`relative w-full rounded-lg input_field ${extraClass} ${width} `}
    >
      {label && <label htmlFor={name}>{label}</label>}
      <div
        className={`absolute top-2/4 -translate-y-2/4 ${
          right ? "right-5" : "left-6"
        }  `}
        // onClick={() => {
        //   iconHandleClick()
        //   iconFunc()
        // }}
      >
        {inputIcon}
      </div>
      <input
        className={
          "w-full h-full text-sm bg-transparent rounded-lg px-14 outline-1 outline-blue-300 outfit-l input_field-input   " +
          (errors[name] ? "error" : "")
        }
        type={type || "text"}
        placeholder={inputPlaceholder}
        id={name}
        {...register(name, rules)}
        disabled={isSubmitting}
      />
      {errors[name] && (
        <span className='error-message'>{errors[name].message}</span>
      )}

      <div
        className='absolute top-2/4 -translate-y-2/4 right-8  '
        onClick={childrenHandleClick}
      >
        {children}
      </div>
    </div>
  )
}
