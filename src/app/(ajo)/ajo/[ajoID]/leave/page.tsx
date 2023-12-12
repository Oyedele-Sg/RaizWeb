"use client"
import { AjoDataInterface, AuthButton } from "@/shared"
import { useAppDispatch } from "@/shared/redux/types"
import React, { useEffect } from "react"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { userService } from "@/services"
import { toast } from "@/components/ui/use-toast"

export default function Sucess() {
  const Router = useRouter()
  const [ajoDetails, setAjoDetails] = React.useState<AjoDataInterface>()

  const dispatch = useAppDispatch()
  const Params = useParams()

  const getData = async () => {
    try {
      const response = await userService.getAjoByID(Params.ajoID)

      setAjoDetails(response)
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
  }, [Params.ajoID])

  return (
    <>
      <div className=' flex items-center justify-center h-screen w-full  '>
        <div className=' w-[771px]  bg-grey rounded-[80px] pt-[166px] pb-[113px] mx-5'>
          <div className=' flex justify-center  flex-col gap-11  '>
            <div className='flex items-center justify-center '>
              <Image
                src='/illustrations/verify-success.svg'
                width={167.5}
                height={129.07}
                alt='success'
              />
            </div>
            <div className='   '>
              <div className=' flex justiKWfy-center  flex-col  items-center gap-[38px] '>
                <div className=' text-center flex flex-col gap-2   '>
                  <h1 className=' font-headline__large  font-semi-mid text-purple   '>
                    Ajo Group Left Successfully
                  </h1>
                  <p className=' font-body__large text-neutral-90 '>
                    You have successfully left {ajoDetails?.ajo_name}
                  </p>
                </div>

                <AuthButton
                  btnText='Cycle hub'
                  btnStyle=' px-[101.5px] '
                  onClick={async () => {
                    Router.push("/ajo/hub")
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
