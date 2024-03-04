"use client"
import { ContentWrap } from "@/components/budget"
import { toast } from "@/components/ui/use-toast"
import { userService } from "@/services"
import { BudgetDataInterface } from "@/shared"
import { getMonthName } from "@/utils/helpers"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import React, { useEffect } from "react"
import {
  ComponentOne,
  ComponentTwo,
} from "../../../components/budget/categories"

function page() {
  const Router = useRouter()
  const Params = useParams()
  const [data, setData] = React.useState<BudgetDataInterface>()

  const [budgetID, setBudgetID] = React.useState<{
    month_name: string
    budgetID: string
    category_name: string
  }>()

  const getData = async () => {
    try {
      const response = await userService.getBudgetByID(
        Params.budgetID as string
      )
      setData(response)
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

  const handleNavigation = () => {
    budgetID ? setBudgetID(undefined) : Router.push(`/budget/all`)
  }

  useEffect(() => {
    getData()
  }, [Params.budgetID])

  return (
    <div>
      <ContentWrap handleNavigation={handleNavigation}>
        {!budgetID ? (
          <ComponentOne data={data} setBudgetID={setBudgetID} />
        ) : (
          <ComponentTwo budgetID={budgetID} />
        )}
      </ContentWrap>
    </div>
  )

  //   /icons/break-down
}

export default page
