"use client"
import { HomeHeader } from "@/components/ajo"
import { BudgetCard } from "@/components/budget"
import { toast } from "@/components/ui/use-toast"
import { CurrentUserContext } from "@/providers/CurrentUserProvider"
import { userService } from "@/services"
import { BudgetDataInterface, Loading } from "@/shared"
import { useAppDispatch } from "@/shared/redux/types"

import Image from "next/image"
import React, { useContext, useEffect, useState } from "react"

function page() {
  const [budget, setBudget] = useState<BudgetDataInterface[]>()
  const dispatch = useAppDispatch()

  const getData = async () => {
    try {
      const response = await userService.getBudget()
      setBudget(response)
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
      <div className=' px-10 min-h-screen '>
        <HomeHeader title='Budget' link='/budget/all' />

        <div className=' bg-grey rounded-lg  px-6 py-8  flex flex-wrap  gap-y-12 gap-x-[47.5px] min-h-full  '>
          {budget?.map((item, index) => (
            <BudgetCard data={item} key={index} />
          ))}
        </div>
      </div>
    </>
  )
}

export default page
