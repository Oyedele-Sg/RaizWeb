import React, { useEffect, useState } from "react"
import SectionHeader from "../ajo/SectionHeader"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { userService } from "@/services"
import { TargetSavingsGroupDataInterface, LoanDataInterface } from "@/shared"
import { toast } from "../ui/use-toast"
import { LoanCard } from "./LoanCard"

export function LoanHubComponent() {
  const Router = useRouter()

  const [loanData, setLoanData] = useState<LoanDataInterface[]>([])
  const [hasWidthdrawn, setHasWidthdrawn] = useState(false)
  const [clicked, setClicked] = useState("In-Progress")

  const getData = async () => {
    try {
      const response = await userService.getUserLoan()
      setLoanData(response)
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

  const TabLinks = [
    {
      title: "In-Progress",
      hasWidthdrawn: false,
    },

    {
      title: "Completed",
      hasWidthdrawn: true,
    },
  ]

  useEffect(() => {
    getData()
  }, [])
  return (
    <div className='  py-8 px-6  bg-grey  flex  flex-col gap-8'>
      <div className=' flex justify-between items-center  '>
        <SectionHeader text='Loan ' />

        {/* <button
          className={` text-purple flex items-center gap-3 font-font-body__large `}
          onClick={() => Router.push("/savings/lock-savings/all")}
        >
          <span className='  '>View All</span>
          <div className=' '>
            <Image src='/icons/arrow-right.svg' width={18} height={18} alt='' />
          </div>
        </button> */}
      </div>

      <div className=''>
        <div className='flex gap-6 flex-wrap  '>
          {loanData.map((data, index) => (
            <div key={index} className=''>
              <LoanCard data={data} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
