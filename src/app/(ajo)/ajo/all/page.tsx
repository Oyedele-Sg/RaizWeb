"use client"

import {
  ActivityItemWrap,
  AjoCard,
  AjoJoined,
  ExploreAjo,
  FeedComponent,
  HomeHeader,
  SubHeaders,
} from "@/components/ajo"
import SectionHeader from "@/components/ajo/SectionHeader"
import { toast } from "@/components/ui/use-toast"
import { userService } from "@/services"

import { AjoDataInterface, BtnMain, Loading, WhiteWrap } from "@/shared"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import { all } from "axios"
import moment from "moment"

export default function All() {
  const [allAjos, setAllAjos] = useState<AjoDataInterface[]>([])
  const getData = async () => {
    try {
      const response = await userService.getAjoAll()
      setAllAjos(response)
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

  useEffect(() => {
    getData()
  }, [])
  return (
    <>
      <Loading />
      <div className='   p-10'>
        <HomeHeader />

        <div className=' flex gap-10 min-h-full  '>
          <div className=' w-full  py-8 px-6   bg-grey  flex  flex-col gap-8'>
            <div className=' flex justify-between items-center '>
              <SectionHeader text='Explore Ajo  ' />
            </div>

            <div className='  flex flex-wrap gap-6   '>
              {allAjos.map((ajo, index) => (
                <AjoCard ajo={ajo} key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
