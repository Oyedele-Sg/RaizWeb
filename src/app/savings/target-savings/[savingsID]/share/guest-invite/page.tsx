"use client"
import { IllustrationComponent, LoginForm } from "@/components"
import {
  BtnMain,
  JoinTargetSaveFormData,
  Loading,
  RegisterInput,
  RegisterTextArea,
} from "@/shared"
import { yupResolver } from "@hookform/resolvers/yup"
import React, { useContext, useEffect, useState } from "react"
import { Form, FormProvider, useForm } from "react-hook-form"
import { userService } from "@/services"
import { toast } from "@/components/ui/use-toast"
import { useParams, useRouter } from "next/navigation"
import { useAppDispatch } from "@/shared/redux/types"
import { setLoadingFalse, setLoadingTrue } from "@/shared/redux/features"
import { LocalizationProvider, TimeField } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { CurrentUserContext } from "@/providers/CurrentUserProvider"
import { ContentWrap } from "@/components/savings/ContentWrap"

function page() {
  const { currentUser } = useContext(CurrentUserContext)
  const Params = useParams()

  const methods = useForm<JoinTargetSaveFormData>({
    defaultValues: {
      account_user_id: null,
      email: "",
      phone_number: "",
      description: "",
      first_name: "",
      last_name: "",
    },
  })

  const onSubmit = async (data: JoinTargetSaveFormData) => {
    try {
      dispatch(setLoadingTrue())

      const response = await userService.inviteToGroupTargetSavings(
        data,
        Params.savingsID as string
      )
      toast({
        title: "Invite Sent",
        description: `${response.message}`,
        variant: "default",
        style: {
          backgroundColor: "#4caf50",
          color: "#fff",
          top: "20px",
          right: "20px",
        },
        duration: 5000,
      })

      Router.push(`/savings/target-savings/${Params.savingsID}/details`)
      dispatch(setLoadingFalse())
    } catch (error) {
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
      dispatch(setLoadingFalse())
    }
  }

  const Router = useRouter()
  const dispatch = useAppDispatch()

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Loading />
      <ContentWrap>
        <div className=' '>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className='  '>
              <div className='flex flex-col gap-9  '>
                <div className=''>
                  <h1 className='  font-display__medium text-purple capitalize '>
                    Guest Invite
                  </h1>
                  <p className=' text-neutral-70 font-title__large '>
                    Add Member(s)
                  </p>
                </div>
                <div className='flex flex-col gap-6 '>
                  <RegisterInput
                    name='first_name'
                    label='First Name'
                    rules={{ required: "First Name is required" }}
                  />

                  <RegisterInput
                    name='last_name'
                    label='Last Name'
                    rules={{ required: "Last Name is required" }}
                  />

                  <RegisterInput
                    name='email'
                    label='Email'
                    rules={{ required: "Email is required" }}
                    type='email'
                  />
                  <RegisterInput
                    name='phone_number'
                    label='Phone Number'
                    rules={{ required: "Phone is required" }}
                    type='number'
                    length={11}
                  />

                  <RegisterTextArea
                    name='description'
                    label='Description'
                    rules={{ required: " Description is required" }}
                  />
                </div>
                <BtnMain
                  btnText=' Next'
                  btnStyle=' w-full text-center text-grey  btn-gradient-savings  '
                  type='submit'
                />
              </div>
            </form>
          </FormProvider>
        </div>
      </ContentWrap>
    </LocalizationProvider>
  )
}

export default page
