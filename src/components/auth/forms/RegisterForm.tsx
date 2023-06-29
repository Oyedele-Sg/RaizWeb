"use client"

import {
  AuthButton,
  AuthFieldWrap,
  AuthFormMainContainer,
  AuthFormWrap,
  AuthSubmit,
  CheckBox,
  RegisterDataInterface,
  RegisterInput,
  registerSchema,
} from "@/shared"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { FC, useState } from "react"
import {
  useForm,
  FormProvider,
  FieldValues,
  FieldError,
  UseFormRegister,
} from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

export const RegisterForm: FC = () => {
  const Router = useRouter()

  const methods = useForm<RegisterDataInterface>({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      user_type_id: 2,
    },
    resolver: yupResolver(registerSchema),
  })

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [checked, setChecked] = useState<boolean>(false)

  const onSubmit = async (data: RegisterDataInterface) => {
    console.log("login data", data)
    // const response = await login(data)
    // if (response) {
    // Router.push("/verification/email")
  }
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <AuthFormMainContainer>
          <AuthFormWrap>
            <AuthFieldWrap>
              <div className=' flex gap-6  '>
                <RegisterInput
                  name={`first_name`}
                  inputPlaceholder={`Enter your first name`}
                  label='First Name'
                />
                <RegisterInput
                  name={`last_name`}
                  inputPlaceholder={`Enter your last name`}
                  label='Last Name'
                />
              </div>

              <RegisterInput
                name={`email`}
                inputPlaceholder={`Enter Email Address`}
                label='Email Address'
              />
              <RegisterInput
                name={`password`}
                inputPlaceholder={`Enter 8 characters long`}
                label='Password'
                childrenHandleClick={() => setShowPassword((state) => !state)}
                type={showPassword ? "text" : "password"}
              >
                <Image
                  src={`/icons/eye-slash.svg`}
                  alt='show password'
                  width={24}
                  height={24}
                  className=' top-[20px] '
                />
              </RegisterInput>
            </AuthFieldWrap>

            <div className=' flex items-center gap-4 '>
              <CheckBox checked={checked} setChecked={setChecked} />
              <div className='text-neutral-80 '>
                I agree to the company’s{" "}
                <Link
                  className='text-neutral-90 underline '
                  href='/forgot-password'
                >
                  terms of use
                </Link>{" "}
                and{" "}
                <Link
                  className='text-neutral-90 underline '
                  href='/forgot-password'
                >
                  privacy policy
                </Link>
              </div>
            </div>
          </AuthFormWrap>
          <AuthSubmit
            btnText='Get Started'
            linkHref='/login'
            linkPreText={`Already have an account?`}
            linkText='Log In'
          />
        </AuthFormMainContainer>
      </form>
    </FormProvider>
  )
}
