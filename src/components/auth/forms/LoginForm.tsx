"use client"

import { userService } from "@/services"
import {
  AuthButton,
  AuthFieldWrap,
  AuthFormMainContainer,
  AuthFormWrap,
  AuthSubmit,
  RegisterInput,
} from "@/shared"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { FC, useEffect, useState } from "react"
import {
  useForm,
  FormProvider,
  FieldValues,
  FieldError,
  UseFormRegister,
} from "react-hook-form"

interface LoginFormProps extends Partial<FieldValues> {
  email: string
  password: string
  user_type_id: number
}

export const LoginForm: FC = () => {
  const router = useRouter()
  const methods = useForm<LoginFormProps>({
    defaultValues: {
      email: "",
      password: "",
      user_type_id: 2,
    },
  })

  const [showPassword, setShowPassword] = useState<boolean>(false)

  const onSubmit = async (data: LoginFormProps) => {
    console.log("login data", data)
  }

  useEffect(() => {
    // redirect to home if already logged in
    if (userService.userValue) {
      router.push("/dashboard")
    }
  }, [])

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <AuthFormMainContainer>
          <AuthFormWrap>
            <AuthFieldWrap>
              <RegisterInput
                name={`email`}
                inputPlaceholder={`Enter Email Address`}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                }}
                extraClass={`mt-6`}
                label='Email Address'
              />
              <RegisterInput
                name={`password`}
                inputPlaceholder={`Enter 8 characters long`}
                label='Password'
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must have at least 8 characters",
                  },
                  pattern: {
                    value:
                      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must have at least 1 uppercase, 1 lowercase and 1 number",
                  },
                }}
                childrenHandleClick={() => setShowPassword((state) => !state)}
                type={showPassword ? "text" : "password"}
                extraClass={`mt-6`}
              >
                <Image
                  src={`/icons/eye-slash.svg`}
                  alt='show password'
                  width={24}
                  height={24}
                  className='.password_field-input top-[20px] '
                />
              </RegisterInput>
            </AuthFieldWrap>

            <div className=' self-end '>
              <Link
                className='text-neutral-80 underline '
                href='/forgot-password'
              >
                Forgot Password?
              </Link>
            </div>
          </AuthFormWrap>
          <AuthSubmit
            btnText='Log In'
            linkHref='/register'
            linkPreText={`Don't have an account?`}
            linkText='Sign Up'
          />
        </AuthFormMainContainer>
      </form>
    </FormProvider>
  )
}
