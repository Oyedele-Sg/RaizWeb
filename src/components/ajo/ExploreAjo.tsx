import React, { useEffect, useState } from "react"

import SectionHeader from "./SectionHeader"
import Image from "next/image"
import { AjoDataInterface, BtnMain } from "@/shared"
import { userService } from "@/services"
import { toast } from "../ui/use-toast"
import moment from "moment"
import { AjoCard } from "./AjoCard"
import { useRouter } from "next/navigation"

export function ExploreAjo() {
  const Router = useRouter()

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
    <div className='  py-8 px-6  bg-grey  flex  flex-col gap-8'>
      <div className=' flex justify-between items-center  '>
        <SectionHeader text='Explore Ajo  ' />
        <button
          className=' text-purple flex items-center gap-3 font-font-body__large'
          onClick={() => Router.push("/ajo/all")}
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

      <div className='  flex flex-wrap gap-6  justify-center  lg:justify-start  '>
        {allAjos.slice(0, 4).map((ajo, index) => (
          <AjoCard ajo={ajo} key={index} />
        ))}
      </div>
    </div>
  )
}
