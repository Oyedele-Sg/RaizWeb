import React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useFormContext, FieldValues, FieldError } from "react-hook-form"

type RegisterSelectProps = {
  name: string
  label?: string
  rules?: Object
  extraClass?: string
  width?: string
}

export const RegisterSelect: React.FC<RegisterSelectProps> = ({
  name,
  label,
  rules,
  extraClass,
  width,
}) => {
  const {
    register,
    formState: { errors, isSubmitting },
    setValue,
  } = useFormContext<FieldValues>()

  return (
    <div
      className={`relative w-full rounded-lg input_field ${extraClass} ${width}`}
    >
      {label && (
        <label
          className={`font-label__large text-purple ${
            errors[name] ? "text-error" : ""
          }`}
          htmlFor={name}
        >
          {label}
        </label>
      )}

      <div className='relative'>
        <Select >
          <SelectTrigger >
            <SelectValue placeholder='Select A bank' className={errors[name] ? "input_field-input_error" : ""} />
          </SelectTrigger>
          <SelectContent className='bg-neutral-20 text-neutral-90 h-[200px] overflow-auto'>
            {/* Replace the following sample data with your actual data */}
            {/* {banks?.banks.map((bank) => (
              <SelectItem
                key={bank.bankName}
                value={bank.bankName}
                className='hover:bg-neutral-50'
                onClick={() => setValue("bank_name", bank.bankName)}
              >
                {bank.bankName}
              </SelectItem>
            ))} */}
          </SelectContent>
        </Select>

        {errors[name] && (
          <span className='error-message'>
            {(errors[name] as FieldError).message}
          </span>
        )}
      </div>
    </div>
  )
}
