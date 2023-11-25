"use client"
import { ContentWrap } from "@/components/settings"
import { toast } from "@/components/ui/use-toast"
import { userService } from "@/services"
import {
  BtnMain,
  ChangePasswordDataInterface,
  Loading,
  RegisterInput,
  changePasswordSchema,
} from "@/shared"
import { setLoadingFalse, setLoadingTrue } from "@/shared/redux/features"
import { useAppDispatch } from "@/shared/redux/types"
import { passwordHash } from "@/utils/helpers"
import { yupResolver } from "@hookform/resolvers/yup"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"

function page() {
  const methods = useForm<ChangePasswordDataInterface>({
    defaultValues: {
      old_password: "",
      new_password: "",
    },
    resolver: yupResolver(changePasswordSchema),
  })
  const dispacth = useAppDispatch()
  const Router = useRouter()

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false)

  const onSubmit = async (data: ChangePasswordDataInterface) => {
    try {
      dispacth(setLoadingTrue())
      await userService.changePassword({
        ...data,
        old_password: passwordHash(data.old_password),
        new_password: passwordHash(data.new_password),
      })
      toast({
        title: "Password Changed Successfully",
        variant: "default",
        style: {
          backgroundColor: "#4B0082",
          color: "#fff",
          top: "20px",
          right: "20px",
        },
        duration: 5000,
      })
      methods.reset()
      setShowNewPassword(false)
      setShowPassword(false)
      userService.logout()
      Router.push(`/login`)

      dispacth(setLoadingFalse())
    } catch (error) {
      dispacth(setLoadingFalse())
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
        duration: 5000,
      })
    }
  }

  return (
    <>
      <Loading />
      <ContentWrap title='Reset Password'>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <RegisterInput
              name={`old_password`}
              inputPlaceholder={`Enter 8 characters long`}
              label='Current Password'
              childrenHandleClick={() => setShowPassword((state) => !state)}
              type={showPassword ? "text" : "password"}
              extraClass={`mt-6  `}
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
              name={`new_password`}
              inputPlaceholder={`Enter 8 characters long`}
              label='New Password'
              childrenHandleClick={() => setShowNewPassword((state) => !state)}
              type={showPassword ? "text" : "password"}
              extraClass={`mt-6  `}
            >
              <Image
                src={`/icons/${showNewPassword ? "eye" : "eye-slash"}.svg`}
                alt='show password'
                width={24}
                height={24}
                className='password_field-input  '
              />
            </RegisterInput>

            <BtnMain
              btnText='Submit'
              btnStyle='  text-grey bg-purple w-full mt-5'
            />
          </form>
        </FormProvider>
      </ContentWrap>
    </>
  )
}

export default page
