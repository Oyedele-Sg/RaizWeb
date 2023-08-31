"use client"
import { InputContainer } from "@/components"
import { ComponentTwo } from "@/components/request"
import { ComponentOne } from "@/components/send"

import { Toast } from "@/components/ui/toast"
import { toast } from "@/components/ui/use-toast"
import { useUser } from "@/hooks/user/useUser"
import { userService } from "@/services"
import {
  BackBtnCircle,
  FormTitledContainer,
  IconPesaColored,
  Loading,
  NextArrow,
  SetupLayout,
  UserInterface,
  UserSearchInterface,
} from "@/shared"
import { setLoadingFalse, setLoadingTrue } from "@/shared/redux/features"
import { useAppDispatch } from "@/shared/redux/types"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { useState, useEffect, useMemo } from "react"
import { FormProvider, useForm } from "react-hook-form"

export default function page() {
  const Router = useRouter()
  return (
    <div className=''>
      <SetupLayout bg='bg-profile-1'>
        <div className='m-[72px] flex flex-col gap-[84px]'>
          <IconPesaColored />

          <div className='flex flex-col gap-3  '>
            <div className='' onClick={() => Router.back}>
              <BackBtnCircle />
              <button title='next' className=''>
                <NextArrow />
              </button>
            </div>

            <FormTitledContainer
              title={"Bill Request"}
              subtitle={"Pay, Split or Reject"}
              utils={<Utils />}
            >
              <div></div>
            </FormTitledContainer>
          </div>
        </div>
      </SetupLayout>
    </div>
  )
}

function Utils() {
  return (
    <>
      <div className='flex gap-6  items-center  '>
        <Image
          src='/icons/trash.svg'
          width={24}
          height={24}
          alt='Delete Request Options'
        />
      </div>
    </>
  )
}
