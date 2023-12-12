"use client"
import { ContentWrap } from "@/components/budget"
import React, { useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"

import { userService } from "@/services"
import {
  AjoDataInterface,
  BtnMain,
  Loading,
  UserSearchInterface,
} from "@/shared"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useParams, useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import Image from "next/image"
import { useAppDispatch } from "@/shared/redux/types"
import { setLoadingFalse, setLoadingTrue } from "@/shared/redux/features"

function Page() {
  const Router = useRouter()
  const Params = useParams()
  const dispatch = useAppDispatch()
  const methods = useForm<UserSearchInterface>({
    defaultValues: {
      account_user_id: "",
    },
  })
  const [ajoDetails, setAjoDetails] = useState<AjoDataInterface>()

  const [searchQuery, setSearchQuery] = useState<UserSearchInterface[]>([])

  const [searchResults, setSearchResults] = useState<UserSearchInterface>()

  const getData = async () => {
    try {
      const response = await userService.getAjoByID(Params.ajoID)

      setAjoDetails(response)
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
    }
  }

  const onSubmit = async (data: UserSearchInterface) => {
    const formData = {
      account_user_id: searchResults?.account_user_id as string,
      ajo_cycle_id: ajoDetails?.ajo_cycles[0]?.ajo_cycle_id as string,
    }
    try {
      dispatch(setLoadingTrue())
      const response = await userService.sendAjoJoinRequest(
        Params.ajoID,
        formData
      )
      toast({
        title: "Invite Sent",
        description: `${response}`,
        variant: "default",
        style: {
          backgroundColor: "#4caf50",
          color: "#fff",
          top: "20px",
          right: "20px",
        },
        duration: 5000,
      })
      methods.reset()
      Router.push(`/ajo/${Params.ajoID}/details`)
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

  useEffect(() => {
    getData()
  }, [])
  return (
    <>
      <Loading />

      <ContentWrap bg='bg-ajo-card'>
        <div className=' flex flex-col gap-9 '>
          <div className=''>
            <div className=''>
              <h1 className='  font-display__medium text-purple capitalize '>
                Share Ajo
              </h1>
              <p className=' text-neutral-70 font-title__large '>Invite</p>
            </div>
            <FormProvider {...methods}>
              <form
                action=''
                onSubmit={methods.handleSubmit(onSubmit)}
                className=' flex flex-col gap-9'
              >
                {searchResults ? (
                  <div className=''>
                    <div className='flex flex-col gap-3 '>
                      <p className={`font-label__large text-neutral-90  `}>
                        Username
                      </p>
                      <div className=' flex justify-between '>
                        <div className='flex items-center gap-4 '>
                          <Avatar className=' cursor-default border-neutral-30 border-[2px] w-[32px] h-[32px]  '>
                            <AvatarImage
                              src={searchResults.profile_image_url}
                            />
                            <AvatarFallback className=' text-purple font-bold  uppercase '>
                              {searchResults?.first_name.charAt(0)}
                              {searchResults?.last_name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <h2 className=' text-purple font-semi-bold text-t-18  '>
                            {searchResults?.first_name}{" "}
                            {searchResults?.last_name}
                          </h2>
                        </div>

                        <div
                          className=''
                          onClick={() => {
                            setSearchResults(undefined)
                          }}
                        >
                          <Image
                            src='/icons/close-circle.svg'
                            alt=''
                            width={20}
                            height={20}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className=''>
                    <input
                      type='search'
                      name=''
                      id=''
                      className=' form-input outline-none bg-transparent  w-full max-h-[3rem] placeholder:text-neutral-70 placeholder:font-body__large border-x-0 border-t-0 border-b-[1px] border-b-purple   '
                      placeholder='Search with Username, Phone Number, or Email Address'
                      // value={searchQuery}
                      onChange={async (e) => {
                        if (!e.target.value) {
                          setSearchQuery([])
                          return
                        }
                        const response = await userService.searchWallets(
                          e.target.value
                        )
                        setSearchQuery(response)
                        // setSearchQuery(e.target.value)
                      }}
                    />
                    <div className='  w-full '>
                      {searchQuery.map((user) => (
                        <div
                          className='flex w-full hover:bg-neutral-30    '
                          onClick={() => {
                            methods.setValue(
                              "account_user_id",
                              user.account_user_id
                            )
                            setSearchResults(user)
                            setSearchQuery([])
                            methods.reset()
                          }}
                        >
                          <div className=' w-full flex justify-between items-center '>
                            <p className='text-neutral-90  p-[0.5rem]'>
                              {user.first_name} {user.last_name}
                            </p>
                            <Avatar className=' cursor-default border-neutral-30 border-[2px] w-[32px] h-[32px]  '>
                              <AvatarImage src={user.profile_image_url} />
                              <AvatarFallback className=' text-purple font-bold  uppercase '>
                                {user.first_name.charAt(0)}
                                {user.last_name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <BtnMain
                  btnText=' Send Join Request '
                  btnStyle=' bg-gradient-ajo w-full text-grey  '
                />
              </form>
            </FormProvider>
          </div>
        </div>
      </ContentWrap>
    </>
  )
}

export default Page
