"use client"

import {
  AuthButton,
  AuthFieldWrap,
  AuthFormMainContainer,
  AuthFormWrap,
  AuthSubmit,
  CheckBox,
  Loading,
  RegisterDataInterface,
  RegisterFormDataInterface,
  RegisterInput,
  registerSchema,
} from "@/shared"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { FC, useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { userService } from "@/services"
import { useAppDispatch } from "@/shared/redux/types"
import {
  getSignUpEmail,
  setLoadingFalse,
  setLoadingTrue,
} from "@/shared/redux/features"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { passwordHash } from "@/utils/helpers"
import { TrackGoogleAnalyticsEvent } from "@/utils/google-analytics"
import UserSignUpFormCategory, {
  UserSignUpStartedAction,
  UserSignUpStartedLabel,
} from "@/utils/google-analytics/events/signUpForm"

export const RegisterForm: FC = () => {
  const Router = useRouter()
  const dispatch = useAppDispatch()
  TrackGoogleAnalyticsEvent(
    UserSignUpFormCategory,
    UserSignUpStartedAction,
    UserSignUpStartedLabel
  )

  const methods = useForm<RegisterFormDataInterface>({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      user_type_id: 1,
      confirm_password: "",
      referred_by_code: "",
    },
    resolver: yupResolver(registerSchema),
  })

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)

  const [checked, setChecked] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit = async (data: RegisterDataInterface) => {
    try {
      if (!checked) {
        toast({
          title: "Error",
          description: `Please agree to our terms and conditions`,
          variant: "destructive",
          style: {
            backgroundColor: "#f44336",
            color: "#fff",
            top: "20px",
            right: "20px",
          },
          action: (
            <ToastAction
              altText='Accept Terms and conditions'
              onClick={() => setChecked(true)}
            >
              Accept
            </ToastAction>
          ),
        })

        return
      }

      dispatch(setLoadingTrue())

      await userService.signup({
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        password: passwordHash(data.password),
        user_type_id: data.user_type_id,
        referred_by_code: data.referred_by_code,
      })

      dispatch(getSignUpEmail(data.email))
      methods.reset()
      dispatch(setLoadingFalse())
      Router.push("/verification/email")
    } catch (error) {
      dispatch(setLoadingFalse())

      if (error === "Duplicate entry") {
        toast({
          title: "Error",
          description: `Email already exists`,
          variant: "destructive",
          style: {
            backgroundColor: "#f44336",
            color: "#fff",
            top: "20px",
            right: "20px",
          },
        })

        return
      }

      toast({
        title: "Something Went Wrong",
        description: `${error}`,
        variant: "destructive",
        style: {
          backgroundColor: "#f44336",
          color: "#fff",
          top: "20px",
          right: "20px",
        },
      })
    }
  }
  return (
    <>
      <Loading />
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
                  inputPlaceholder={`Enter Password`}
                  label='Password'
                  childrenHandleClick={() => setShowPassword((state) => !state)}
                  type={showPassword ? "text" : "password"}
                >
                  <Image
                    src={`/icons/${showPassword ? "eye" : "eye-slash"}.svg`}
                    alt='show password'
                    width={24}
                    height={24}
                    className='password_field-input  '
                  />
                </RegisterInput>
                <RegisterInput
                  name={`confirm_password`}
                  inputPlaceholder={`Confirm Password`}
                  label='Confirm Password'
                  childrenHandleClick={() => setShowPassword((state) => !state)}
                  type={showPassword ? "text" : "password"}
                >
                  <Image
                    src={`/icons/${showPassword ? "eye" : "eye-slash"}.svg`}
                    alt='show password'
                    width={24}
                    height={24}
                    className='password_field-input  '
                  />
                </RegisterInput>
                <RegisterInput
                  name={`referred_by_code`}
                  inputPlaceholder={`Referral Code`}
                  label='Referral Code'
                />
              </AuthFieldWrap>

              <div className=' flex items-center gap-4 '>
                <CheckBox checked={checked} setChecked={setChecked} />
                <div className='text-neutral-80 '>
                  I agree to the company’s{" "}
                  <span className='text-neutral-90 underline '>
                    Terms of Use
                  </span>{" "}
                  and{" "}
                  <span className='text-neutral-90 underline '>
                    Privacy Policy
                  </span>
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
    </>
  )
}
