"use client"

import { AjoCard, HomeHeader } from "@/components/ajo"
import SectionHeader from "@/components/ajo/SectionHeader"
import { PersonalSavingCard } from "@/components/savings"
import { LockSavingsCard } from "@/components/savings/lock-savings"
import { toast } from "@/components/ui/use-toast"
import { userService } from "@/services"
import { Loading, LockSavingsDataInterface } from "@/shared"
import Image from "next/image"
import React, { useEffect, useState } from "react"

export default function All() {
  const [savingDetails, setSavingDetails] = useState<
    LockSavingsDataInterface[]
  >([])

  const getData = async () => {
    try {
      const response = await userService.getAllLockSavings()
      setSavingDetails(response)
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
              <SectionHeader text='Lock Targets' />
            </div>

            <div className='  flex flex-wrap gap-6 items-center justify-center lg:justify-start  '>
              {savingDetails.map((item, index) => (
                <LockSavingsCard data={item} key={item.lock_save_id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
