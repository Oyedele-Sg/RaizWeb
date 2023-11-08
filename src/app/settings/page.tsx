"use client"
import {
  BtnMain,
  IconRaizColored,
  Loading,
  NavigationButtons,
  SetupLayout,
  UserInterface,
} from "@/shared"
import React, { useContext, useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CurrentUserContext } from "@/providers/CurrentUserProvider"
import Image from "next/image"
import Link from "next/link"
import { userService } from "@/services"
import { useRouter } from "next/navigation"
import axios from "axios"
import { useAppDispatch } from "@/shared/redux/types"
import { set } from "date-fns"
import { setLoadingFalse, setLoadingTrue } from "@/shared/redux/features"

export default function page() {
  const Router = useRouter()
  const dispatch = useAppDispatch()

  const { currentUser } = useContext(CurrentUserContext)
  const [user, setUser] = useState<UserInterface>()
  const [showAproveModal, setShowApproveModal] = useState(false)

  const [file, setFile] = useState<any>(null)

  const handleLogout = () => {
    userService.logout()
    Router.push(`/login`)
  }

  const handleLink = (link: string | undefined) => {
    if (link === "logout") {
      setShowApproveModal(true)
    } else {
      Router.push(`/settings/${link}`)
    }
  }

  const settings = [
    {
      title: "Account Information",
      description: "Information about our account",
      image: "account",
      link: "account-information",
    },
    {
      title: "Help and support",
      description: "Need aid? We're here.",
      image: "help",
    },
    {
      title: "Login and security",
      description: "Keep your account secured",
      image: "key",
      link: "login-and-security",
    },
    {
      title: "Manage connected accounts",
      description: "Eternal accounts connected",
      image: "manage",
    },
    {
      title: "About",
      description: "Information about RAIZ",
      image: "about",
      link: "about",
    },
    {
      title: "Logout",
      description: "",
      image: "logout",
      link: "logout",
    },
  ]

  const uploadFile = async () => {
    try {
      dispatch(setLoadingTrue())
      const formData = new FormData()
      formData.append("file", file)
      formData.append("type", file.type)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
        headers: {
          // You don't need to set Content-Type for FormData
          // "Content-Type": "multipart/form-data",
          // "Access-Control-Allow-Origin" header is not needed here
        },
      })

      if (response.ok) {
        const data = await response.json()
        await userService.updateUserProfileImage({
          profile_image_url: data.url,
        })
      }

      dispatch(setLoadingFalse())
      getData()

      setFile(null)
    } catch (err) {
      console.error(err)
      dispatch(setLoadingFalse())
    }
  }

  const getData = async () => {
    try {
      const response = await userService.getCurrentUser()
      setUser(response)
    } catch (error) {}
  }

  useEffect(() => {
    if (file) {
      uploadFile()
    }
  }, [file])

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <Loading />
      {showAproveModal ? (
        <div className=' z-[10000] h-screen fixed top-0 bottom-0 left-0 right-0  flex items-center justify-center bg-loading-bg  '>
          <div className='    flex gap-4 items-center '>
            <div className=' bg-grey py-[72px]  px-12 rounded-2xl  flex gap-12 flex-col min-w-[75%] mx-5 '>
              <div className=' text-center '>
                <h2 className=' text-purple text-[28px] font-semi-mid     '>
                  Confirming Your Logout
                </h2>
                <p className='  text-t-18  text-neutral-70   '>
                  {" "}
                  Are you certain you wish to log out?{" "}
                </p>
              </div>
              <div className='  flex gap-12 '>
                <BtnMain
                  btnText='Back'
                  btnStyle='  border border-neutral-70 text-purple flex-1'
                  onClick={() => setShowApproveModal(false)}
                />
                <BtnMain
                  btnText='Log Out'
                  btnStyle='  bg-error  text-grey  flex-1'
                  onClick={() => handleLogout()}
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div className=''>
        <NavigationButtons />

        <div className='  p-12 rounded-r-8  border-neutral-20 border-[2px]  flex flex-col gap-9  '>
          <div className=' flex  gap-8 '>
            <div className=' relative '>
              <Avatar className=' cursor-pointer border-neutral-30 border-[2px] w-[64px] h-[64px]  '>
                <AvatarImage src={user?.profile_image_url} />
                <AvatarFallback className=' text-purple font-bold  uppercase '>
                  {currentUser?.first_name.charAt(0)}
                  {currentUser?.last_name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className=' p-1 rounded-full  bg-neutral-20 absolute right-0 bottom-0 '>
                <input
                  type='file'
                  accept='image/*'
                  name='image'
                  id='selectFile'
                  className='hidden'
                  onChange={(e: any) => setFile(e.target.files[0])}
                ></input>
                <label htmlFor='selectFile' className=' '>
                  <Image
                    src={`/icons/camera.svg`}
                    width={16}
                    height={16}
                    alt=''
                  />
                </label>
              </div>
            </div>

            <div className=' flex flex-col justify-between '>
              <h1 className=' text-purple font-semi-mid text-t-24   '>
                {currentUser?.first_name} {currentUser?.last_name}
              </h1>
              <p className=' text-neutral-70  text-t-18    '>
                {currentUser?.email}
              </p>
            </div>
          </div>

          <div className='flex flex-col gap-[45px] '>
            {settings.map((setting, index) => (
              <div
                className='flex items-center justify-between hover:bg-neutral-20  cursor-pointer '
                key={index}
                onClick={() => handleLink(setting.link)}
              >
                <div className='flex items-center gap-5 '>
                  <div
                    className={` ${
                      setting.title === "Logout"
                        ? " border-[2px] border-neutral-20 rounded-full"
                        : "bg-neutral-20"
                    }  p-3 rounded-full text-neutral-20 `}
                  >
                    <Image
                      src={`/settings/${setting.image}.svg`}
                      width={24}
                      height={24}
                      alt=''
                    />
                  </div>
                  <div className=''>
                    <h2
                      className={`${
                        setting.title === "Logout"
                          ? " text-error"
                          : "text-neutral-90"
                      } text-t-20 font-semi-mid  `}
                    >
                      {setting.title}
                    </h2>
                    <p className='text-neutral-70'>{setting.description}</p>
                  </div>
                </div>
                <div className=''>
                  <Image
                    src={`/icons/arrow-right.svg`}
                    width={24}
                    height={24}
                    alt=''
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
