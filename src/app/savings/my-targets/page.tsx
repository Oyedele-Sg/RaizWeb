"use client"

import { AjoCard, HomeHeader } from "@/components/ajo"
import SectionHeader from "@/components/ajo/SectionHeader"
import { PersonalSavingCard } from "@/components/savings"
import { toast } from "@/components/ui/use-toast"
import { userService } from "@/services"
import {
  AjoDataInterface,
  BtnMain,
  Loading,
  PersonalTargetSavingsDataInterface,
  WhiteWrap,
} from "@/shared"
import Image from "next/image"
import React, { useEffect, useState } from "react"

export default function All() {
  const [personalSavings, setPersonalSavings] = useState<
    PersonalTargetSavingsDataInterface[]
  >([])
  // const filter = [
  //   { title: "new", prompt: "new" },
  //   { title: "duration", prompt: "duration_desc" },
  //   { title: "amount", prompt: "amount_desc" },
  //   { title: "frequency", prompt: "frequency_desc" },
  //   { title: "members", prompt: "max_participants_desc" },
  // ]
  // const [filterClicked, setFilterClicked] = useState<string>("new")
  // const [filterPrompt, setFilterPrompt] = useState<string>("new")

  const getData = async () => {
    try {
      const response = await userService.getPersonalTargetSavings()
      setPersonalSavings(response)
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
      <div className=' '>
        <HomeHeader title='Saving Hub ' link='/savings/hub' />

        <div className=' flex gap-10 min-h-full  '>
          <div className=' w-full  py-8 px-6   bg-grey  flex  flex-col gap-8'>
            <div className=' flex justify-between items-center '>
              <SectionHeader text='My targets' />
            </div>

            <div className='  flex flex-wrap gap-6 items-center justify-center lg:justify-start  '>
              {personalSavings.map((item, index) => (
                <PersonalSavingCard data={item} key={item.target_save_id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
