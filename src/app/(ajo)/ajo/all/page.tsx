"use client"

import { AjoCard, HomeHeader } from "@/components/ajo"
import SectionHeader from "@/components/ajo/SectionHeader"
import { toast } from "@/components/ui/use-toast"
import { userService } from "@/services"
import { AjoDataInterface, BtnMain, Loading, WhiteWrap } from "@/shared"
import Image from "next/image"
import React, { useEffect, useState } from "react"

export default function All() {
  const [allAjos, setAllAjos] = useState<AjoDataInterface[]>([])
  const filter = [
    { title: "new", prompt: "new" },
    { title: "duration", prompt: "duration_desc" },
    { title: "amount", prompt: "amount_desc" },
    { title: "frequency", prompt: "frequency_desc" },
    { title: "members", prompt: "max_participants_desc" },
  ]
  const [filterClicked, setFilterClicked] = useState<string>("new")
  const [filterPrompt, setFilterPrompt] = useState<string>("new")

  const getData = async () => {
    try {
      const response = await userService.getAjoAll(filterPrompt)
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
  }, [filterPrompt])
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

            <div className=' flex gap-[46px] flex-wrap '>
              {filter.map((item, index) => (
                <div
                  className={` cursor-default border  py-2 px-4 capitalize rounded-lg flex gap-5 items-center justify-center min-w-[107px] text-center  ${
                    filterClicked === item.title
                      ? " text-[#54098B] bg-neutral-40 border-[#54098B]"
                      : "text-neutral-80 border-neutral-50"
                  } `}
                  key={index}
                  onClick={() => {
                    if (item.title === "new") {
                      setFilterPrompt(`new`)
                      setFilterClicked("new")
                    }
                  }}
                >
                  {item.title}{" "}
                  {!(item.title === "new") && (
                    <div>
                      <Image
                        src={`/ajo/arrow-up.svg`}
                        width={15}
                        height={15}
                        alt=''
                        onClick={() => {
                          setFilterClicked(item.title)

                          item.title === "new"
                            ? setFilterPrompt(`new`)
                            : item.title === "members"
                            ? setFilterPrompt(`max_participants_asc`)
                            : setFilterPrompt(`${item.title}_asc`)
                        }}
                      />
                      <Image
                        src={`/ajo/arrow-down.svg`}
                        width={15}
                        height={15}
                        alt=''
                        onClick={() => {
                          setFilterClicked(item.title)

                          item.title === "new"
                            ? setFilterPrompt(`new`)
                            : item.title === "members"
                            ? setFilterPrompt(`max_participants_desc`)
                            : setFilterPrompt(`${item.title}_desc`)
                        }}
                      />{" "}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className='  flex flex-wrap gap-6 items-center justify-center lg:justify-start  '>
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
