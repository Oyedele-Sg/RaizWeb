import React, { useEffect, useState } from "react"
import SectionHeader from "../ajo/SectionHeader"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { userService } from "@/services"
import {
  GroupTargetSavingsDataInterface,
  LockSavingsDataInterface,
} from "@/shared"
import { toast } from "../ui/use-toast"
import { SavingsCard } from "./SavingsCard"
import { SavingDummy } from "./SavingDummy"
import { LockSavingsCard } from "./lock-savings"

export function LockSavingsComponent() {
  const Router = useRouter()

  const [allSavingsData, setAllSavingsData] = useState<
    LockSavingsDataInterface[]
  >([])
  const [hasWidthdrawn, setHasWidthdrawn] = useState(false)

  const getData = async (hasWidthdrawn: boolean) => {
    try {
      const response = await userService.getLockSavings(hasWidthdrawn)
      setAllSavingsData(response)
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
    getData(hasWidthdrawn)
  }, [hasWidthdrawn])
  return (
    <div className='  py-8 px-6  bg-grey  flex  flex-col gap-8'>
      <div className=' flex justify-between items-center  '>
        <SectionHeader text='Lock Saving ' />

        <button
          className=' text-purple flex items-center gap-3 font-font-body__large   '
          onClick={() => Router.push("/savings/lock-savings/all")}
        >
          <span className='  '>View All</span>
          <div className=' '>
            <Image src='/icons/arrow-right.svg' width={18} height={18} alt='' />{" "}
          </div>
        </button>
      </div>

      <div className=''>
        <div className='flex justify-between '>
          {TabLinks.map((link) => (
            <button
              key={link.title}
              className='flex-1 border-neutral-80 hover:border-neutral-90 border hover:bg-savings-bg  text-t-18 hover:text-neutral-90  text-neutral-80  py-4 '
              onClick={() => setHasWidthdrawn(link.hasWidthdrawn)}
            >
              {link.title}
            </button>
          ))}
        </div>
      </div>

      <div className=''>
        {allSavingsData.length > 0 ? (
          <div className='flex   flex-wrap gap-6'>
            {allSavingsData.map((data, index) => (
              <LockSavingsCard key={index} data={data} />
            ))}
          </div>
        ) : (
          <div className=''>
            <SavingDummy lock />
          </div>
        )}
      </div>
    </div>
  )
}
