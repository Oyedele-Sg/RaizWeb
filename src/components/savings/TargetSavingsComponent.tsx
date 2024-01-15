import React, { useEffect, useState } from "react"
import SectionHeader from "../ajo/SectionHeader"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { userService } from "@/services"
import { TargetSavingsGroupDataInterface } from "@/shared"
import { toast } from "../ui/use-toast"
import { SavingsCard } from "./SavingsCard"
import { SavingDummy } from "./SavingDummy"

export function TargetSavingsComponent() {
  const Router = useRouter()

  const [allSavingsData, setAllSavingsData] = useState<
    TargetSavingsGroupDataInterface[]
  >([])
  const [clicked, setClicked] = useState("In-Progress")

  const getData = async () => {
    try {
      const response = await userService.getAllTargetSavings()
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
      link: "/savings/hub",
    },
    {
      title: "My Target",
      link: "/savings/my-targets/all",
    },
    {
      title: "Explore",
      link: "/savings/target-savings/explore/all",
    },
    {
      title: "Completed",
      link: "/savings/hub",
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
          className=' text-purple flex items-center gap-3 font-font-body__large   '
          onClick={() => Router.push("/savings/target-savings/all")}
        >
          <span className='  '>View All</span>
          <div className='  '>
            <Image src='/icons/arrow-right.svg' width={18} height={18} alt='' />{" "}
          </div>
        </button>
      </div>

      <div className=''>
        <div className='flex justify-between '>
          {TabLinks.map((link) => (
            <button
              key={link.title}
              className={` flex-1 border-neutral-80 hover:border-neutral-90 border hover:bg-savings-bg  text-t-18 hover:text-neutral-90  text-neutral-80  py-4 ${
                clicked === link.title && "bg-savings-neutral border-neutral-90"
              }  `}
              onClick={() => {
                if (
                  link.title === "Completed" ||
                  link.title === "In-Progress"
                ) {
                  setClicked(link.title)
                } else {
                  Router.push(link.link)
                  setClicked(link.title)
                }
              }}
            >
              {link.title}
            </button>
          ))}
        </div>
      </div>

      <div className=''>
        {allSavingsData.length > 0 ? (
          clicked === "In-Progress" ? (
            <div className='flex   flex-wrap gap-6'>
              {allSavingsData.map((data, index) => {
                if (data.completion_percentage < 100) {
                  return <SavingsCard key={index} data={data} />
                }
              })}
            </div>
          ) : clicked === "Completed" ? (
            <div className='flex   flex-wrap gap-6'>
              {allSavingsData.map((data, index) => {
                if (data.completion_percentage == 100) {
                  return <SavingsCard key={index} data={data} />
                }
              })}
            </div>
          ) : null
        ) : (
          <div className=''>
            <SavingDummy />
          </div>
        )}
      </div>
    </div>
  )
}
