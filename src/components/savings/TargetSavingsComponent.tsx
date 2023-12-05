import React, { useEffect, useState } from "react"
import SectionHeader from "../ajo/SectionHeader"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { userService } from "@/services"
import { GroupTargetSavingsDataInterface } from "@/shared"
import { toast } from "../ui/use-toast"
import { SavingsCard } from "./SavingsCard"
import { SavingDummy } from "./SavingDummy"

export function TargetSavingsComponent() {
  const Router = useRouter()

  const [allSavingsData, setAllSavingsData] = useState<
    GroupTargetSavingsDataInterface[]
  >([])
  console.log("savings data", allSavingsData)

  const getData = async () => {
    try {
      const response = await userService.getPublicTargetSavings()
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
      title: "Create",
      link: "/savings/target-savings/create",
    },
    {
      title: "My Target",
      link: "/savings/my-targets",
    },
    {
      title: "Explore",
      link: "/savings/target-savings/create",
    },
    {
      title: "Completed",
      link: "/savings/target-savings/create",
    },
  ]

  useEffect(() => {
    getData()
  }, [])
  return (
    <div className='  py-8 px-6  bg-grey  flex  flex-col gap-8'>
      <div className=' flex justify-between items-center  '>
        <SectionHeader text='Target Saving ' />
        <button
          className=' text-purple flex items-center gap-3 font-font-body__large'
          onClick={() => Router.push("/savings/target-savings/all")}
        >
          View All{" "}
          <span>
            {" "}
            <Image
              src='/icons/arrow-right.svg'
              width={18}
              height={18}
              alt=''
            />{" "}
          </span>
        </button>
      </div>

      <div className=''>
        <div className='flex justify-between '>
          {TabLinks.map((link) => (
            <button
              key={link.title}
              className='flex-1 border-neutral-80 hover:border-neutral-90 border hover:bg-savings-bg  text-t-18 hover:text-neutral-90  text-neutral-80  py-4 '
              onClick={() => Router.push(link.link)}
            >
              {link.title}
            </button>
          ))}
        </div>
      </div>

      <div className=''>
        {allSavingsData.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {allSavingsData.map((data, index) => (
              <SavingsCard key={index} data={data} />
            ))}
          </div>
        ) : (
          <div className=''>
            <SavingDummy />
          </div>
        )}
      </div>
    </div>
  )
}
