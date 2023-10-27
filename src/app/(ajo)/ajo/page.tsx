"use client"

import {
  ActivityItemWrap,
  AjoJoined,
  ExploreAjo,
  FeedComponent,
  HomeHeader,
  SubHeaders,
} from "@/components/ajo"
import SectionHeader from "@/components/ajo/SectionHeader"
import { toast } from "@/components/ui/use-toast"
import { userService } from "@/services"

import {
  AjoDataInterface,
  AuthButton,
  BtnMain,
  Loading,
  WhiteWrap,
} from "@/shared"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import { all } from "axios"
import moment from "moment"

export default function Ajo() {
  return (
    <>
      <Loading />
      <div className='  '>
        <div className=' py-12 px-5 lg:p-10 '>
          <HomeHeader />
        </div>

        <div className='  lg:p-10 flex gap-10 min-h-full '>
          <div className=' flex-1  flex flex-col gap-10   '>
            <ExploreAjo />
            <AjoJoined />
          </div>
          {/* <FeedComponent /> */}
        </div>
      </div>
    </>
  )
}
