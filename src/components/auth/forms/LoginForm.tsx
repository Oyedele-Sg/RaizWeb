"use client"

import { userService } from "@/services"
import {
  AuthButton,
  AuthFieldWrap,
  AuthFormMainContainer,
  AuthFormWrap,
  AuthSubmit,
  LoginDataInterface,
  RegisterInput,
} from "@/shared"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { FC, useEffect, useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { loginSchema } from "@/shared/types/yupSchema"

export const LoginForm: FC = () => {
  const router = useRouter()
  const methods = useForm<LoginDataInterface>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
  })

  const [showPassword, setShowPassword] = useState<boolean>(false)

  const onSubmit = async (data: LoginDataInterface) => {
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
                extraClass={`mt-6`}
                label='Email Address'
              />
              <RegisterInput
                name={`password`}
                inputPlaceholder={`Enter 8 characters long`}
                label='Password'
                childrenHandleClick={() => setShowPassword((state) => !state)}
                type={showPassword ? "text" : "password"}
                extraClass={`mt-6  `}
              >
                <Image
                  src={`/icons/eye-slash.svg`}
                  alt='show password'
                  width={24}
                  height={24}
                  className='password_field-input  '
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
