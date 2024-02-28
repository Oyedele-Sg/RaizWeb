"use client"
import { HomeHeader } from "@/components/ajo"
import { toast } from "@/components/ui/use-toast"
import { userService } from "@/services"
import {
  AjoCycleInterface,
  LoanDataInterface,
  AjoPaymentCycleInterface,
  Loading,
} from "@/shared"
import Image from "next/image"
import { useRouter, useSearchParams, useParams } from "next/navigation"
import React, { useEffect } from "react"
import AjoPaymentTable from "@/components/ajo/AjoPaymentTable"
import { useAppDispatch } from "@/shared/redux/types"
import { setLoadingFalse, setLoadingTrue } from "@/shared/redux/features"
import { formatNumberToK } from "@/utils/helpers"

function Page() {
  const Router = useRouter()
  const dispatch = useAppDispatch()
  const Params = useParams()
  const [loanDetails, setLoanDetails] = React.useState<LoanDataInterface>()

  const handleLeaveAjo = async () => {
    try {
      dispatch(setLoadingTrue())
      await userService.leaveAjo(Params.loanID)

      Router.push(`/ajo/${Params.loanID}/leave`)

      dispatch(setLoadingFalse())
    } catch (error) {
      dispatch(setLoadingFalse())
    }
  }

  const handleShareAjo = async () => {
    try {
      dispatch(setLoadingTrue())

      Router.push(`/ajo/${Params.loanID}/share`)

      dispatch(setLoadingFalse())
    } catch (error) {
      dispatch(setLoadingFalse())
    }
  }

  const getData = async () => {
    try {
      const response = await userService.getLoanByID(Params.loanID)
      setLoanDetails(response)
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

  const loanData = [
    {
      title: "Loan",
      value: `₦${formatNumberToK(loanDetails?.loan_amount as number)}`,
    },
    {
      title: "Paid",
      value: `₦${formatNumberToK(loanDetails?.loan_amount_paid as number)}`,
    },

    {
      title: "Balance",
      value: `₦${formatNumberToK(loanDetails?.loan_amount_unpaid as number)}`,
    },
  ]

  useEffect(() => {
    getData()
  }, [Params.loanID])
  return (
    <>
      <Loading />
      <div className=' '>
        <div className=' p-10'>
          <HomeHeader title='Cycle Hub' link='/ajo/hub' />
        </div>

        <div className='flex gap-4 flex-col lg:flex-row '>
          <div className=' w-full min-h-[360px] relative   flex-1  '>
            <Image
              src={process.env.DEFAULT_AJO_IMG as string}
              fill={true}
              alt=''
            />
            <div className=' absolute bg-overlay-10 top-0 bottom-0 left-0 right-0  '></div>
            <div className=' absolute top-0  bottom-0 left-0 right-0    p-10 flex  justify-between '>
              <div className='flex gap-8 items-center w-full    '>
                <div
                  className=' hidden border-[2px] border-neutral-80 rounded-full p-3 items-center justify-center lg:flex  '
                  onClick={() => Router.back()}
                >
                  <Image
                    src={"/icons/ajo-arrow-left.svg"}
                    width={48}
                    height={48}
                    alt=''
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='flex-1 bg-neutral-30 py-6 px-2 '>
            <div className=' flex w-full  justify-between  '>
              <div className=' flex flex-col gap-8 '>
                <div className='  flex flex-col gap-8  '>
                  {/* <div className=' flex flex-col  gap-3  '>
                    <h1 className='  font-headline__large font-semibold text-purple '>
                      {loanDetails?.}
                    </h1>
                    <p className='  font-body__large  capitalize text-neutral-80 font-semi-mid '>
                      By{" "}
                      {`${loanDetails?.created_by.first_name} ${loanDetails?.created_by.last_name} `}{" "}
                    </p>
                  </div> */}
                  <p className=' font-body__large text-neutral-80   '> </p>
                  <div className='flex flex-col gap-10 text-neutral-90 '>
                    <div className=' flex gap-8 flex-wrap '>
                      <div className=' flex  items-center  gap-2   '>
                        <Image
                          src={"/ajo/money.svg"}
                          width={24}
                          height={24}
                          alt=''
                        />
                        <span>
                          {loanDetails?.ajo_cycles[0].amount_per_cycle}
                        </span>
                      </div>
                      <div className=' flex  items-center  gap-2   '>
                        <Image
                          src={"/ajo/contributors.svg"}
                          width={24}
                          height={24}
                          alt=''
                        />
                        <span>
                          {loanDetails?.ajo_cycles[0].number_of_slots}{" "}
                          contributors{" "}
                        </span>
                      </div>
                      <div className=' flex  items-center  gap-2   '>
                        <Image
                          src={"/ajo/frequency.svg"}
                          width={24}
                          height={24}
                          alt=''
                        />
                        <span>
                          {
                            loanDetails?.ajo_cycles[0].collection_frequency
                              .frequency_name
                          }{" "}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=' text-neutral-90 flex gap-8 '>
                  {/* <div
                    className=' flex  items-center  gap-2  cursor-pointer  '
                    onClick={() => {}}
                  >
                    <Image
                      src={"/ajo/edit.svg"}
                      width={24}
                      height={24}
                      alt=''
                    />
                    <span>Edit</span>
                  </div> */}
                  <div
                    className=' flex  items-center  gap-2 cursor-pointer    '
                    onClick={() => handleLeaveAjo()}
                  >
                    <Image
                      src={"/ajo/leave.svg"}
                      width={24}
                      height={24}
                      alt=''
                    />
                    <span>Leave</span>
                  </div>
                  <div
                    className=' flex  items-center  gap-2  cursor-pointer   '
                    onClick={() => handleShareAjo()}
                  >
                    <Image
                      src={"/ajo/share.svg"}
                      width={24}
                      height={24}
                      alt=''
                    />
                    <span>Share</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
