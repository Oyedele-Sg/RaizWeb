"use client"
import { HomeHeader } from "@/components/ajo"
import { toast } from "@/components/ui/use-toast"
import { userService } from "@/services"
import {
  AjoCycleInterface,
  AjoDataInterface,
  AjoPaymentCycleInterface,
  BtnMain,
  EarlyPenaltyDataInterface,
  GroupTargetSavingsActivitiesDataInterface,
  TargetSavingsGroupDataInterface,
  LockSavingsDataInterface,
  WhiteTileWrap,
} from "@/shared"
import Image from "next/image"
import { useRouter, useSearchParams, useParams } from "next/navigation"
import React, { useEffect } from "react"
import AjoPaymentTable from "@/components/ajo/AjoPaymentTable"
import { useAppDispatch } from "@/shared/redux/types"
import { setLoadingFalse, setLoadingTrue } from "@/shared/redux/features"
import { dateDifferenceInDays, timeAgo } from "@/utils/helpers"
import moment from "moment"
import { SavingDetailsTile } from "@/components/savings"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

function Page() {
  const Router = useRouter()
  const dispatch = useAppDispatch()
  const Params = useParams()
  const [savingsDetails, setSavingsDetails] =
    React.useState<LockSavingsDataInterface>()
  const [savingsPenalty, setSavingsPenalty] =
    React.useState<EarlyPenaltyDataInterface>()

  const getData = async () => {
    try {
      const response = await userService.getLockSavingsByID(Params.savingsID)
      setSavingsDetails(response)
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

  const getPenaltyData = async () => {
    const data = {
      amount: savingsDetails?.lock_save_amount as number,
      end_date: savingsDetails?.end_date as Date,
      withdraw_date: new Date(),
    }
    try {
      const response = await userService.earlyWithdrawalPenalty(data)

      setSavingsPenalty(response)
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

  const tileData = [
    {
      title: "Start Date",
      data: moment(savingsDetails?.start_date).format("DD MMMM, YYYY"),
    },
    {
      title: "End Date",
      data: moment(savingsDetails?.end_date).format("DD MMMM, YYYY"),
    },
    {
      title: "Interest (₦)",
      data: `₦${
        savingsDetails?.interest_amount ? savingsDetails?.interest_amount : 0
      }`,
    },
    {
      title: "Locked Amount",
      data: `₦${savingsDetails?.lock_save_amount}`,
    },
    {
      title: "Interest (%)",
      data: `${savingsDetails?.interest_rate.interest_rate}%`,
    },
    {
      title: "Days Left",
      data: savingsDetails?.days_left,
    },
  ]

  useEffect(() => {
    getData()
  }, [Params.savingsID])
  useEffect(() => {
    if (savingsDetails) {
      getPenaltyData()
    }
  }, [savingsDetails])
  return (
    <div className=' '>
      <div className=' p-10'>
        <HomeHeader title='Saving Hub' link='/savings/hub' />
      </div>

      <div className=' w-full min-h-[360px] relative   '>
        <Image src={`/images/frame-643.png`} fill={true} alt='' />
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
            <div className=' flex w-full  justify-between max-w-[50%] '>
              <div className=' text-grey flex flex-col gap-4  '>
                <div className=' flex flex-col  gap-2   '>
                  <h1 className='  font-headline__large font-semibold  text-ellipsis overflow-hidden max-w-full whitespace-nowrap '>
                    {savingsDetails?.lock_save_description}
                  </h1>
                </div>
                <div className='flex flex-col gap-10 '>
                  <div className=' flex gap-8 flex-wrap '>
                    {/* <div className=' flex flex-col  items-center  gap-2   '>
                      <span className=' text-grey font-semibold  '>
                        {savingsDetails?.target_save_group_members.length}
                      </span>
                      <span className=' text-grey font-semi-mid '>Members</span>
                    </div> */}
                    <div className=' flex flex-col items-center  gap-2   '>
                      <span className=' text-grey font-semibold  '>
                        ₦{savingsDetails?.lock_save_amount}
                      </span>
                      <span className=' text-grey font-semi-mid '>
                        Locked amount
                      </span>
                    </div>
                    <div className=' flex flex-col items-center  gap-2   '>
                      <span className=' text-grey font-semibold  '>
                        ₦{savingsDetails?.interest_amount || 0}
                      </span>
                      <span className=' text-grey font-semi-mid '>
                        Interest Earned
                      </span>
                    </div>
                    <div className=' flex flex-col items-center  gap-2   '>
                      <span className=' text-grey font-semibold  '>Paid</span>
                      <span className=' text-grey font-semi-mid '>
                        {savingsDetails?.has_withdrawn
                          ? "Completed"
                          : "In-progress"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className=' flex items-center gap-8 '>
                  <Progress
                    value={Math.ceil(
                      savingsDetails?.completion_percentage as number
                    )}
                    className=' bg-pesaraise-10 progress '
                  />{" "}
                  <p className=' text-neutral-40 text-t-14 font-medium   '>
                    {Math.ceil(savingsDetails?.completion_percentage as number)}
                    %
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='p-10 mt-[94px] flex gap-16'>
        <WhiteTileWrap extraStyle=' p-12 flex-1 flex flex-col gap-8  '>
          <div className=' flex flex-col gap-8  '>
            <div className='flex flex-col gap-6 '>
              <h2 className=' text-purple font-semibold text-center text-t-24 '>
                {" "}
                Payout Rules
              </h2>
              <p className=' text-purple text-center text-t-16  '>
                {` Keeps Funds for a Fixed Term, Breaking the Lock Incurs a ${savingsPenalty?.penalty_fee_rate}%
                  Penalty!`}
              </p>
            </div>
            {!savingsDetails?.has_withdrawn && (
              <BtnMain
                btnText='Withdraw'
                btnStyle=' w-full text-purple border-neutral-30 border '
                onClick={() =>
                  Router.push(
                    `/savings/lock-savings/${Params.savingsID}/withdrawal`
                  )
                }
              />
            )}
          </div>

          <div className=' grid  grid-cols-2  gap-8 flex-wrap  '>
            {tileData.map((item, index) => (
              <SavingDetailsTile
                data={item.data}
                title={item.title}
                key={index}
              />
            ))}
          </div>
        </WhiteTileWrap>
      </div>
    </div>
  )
}

export default Page

// could be needed later
{
  /* <div className=' flex flex-col items-center  gap-2   '>
                      <span className=' text-grey font-semibold  '>
                        {dateDifferenceInDays(
                          savingsDetails?.start_date as Date,
                          savingsDetails?.end_date as Date
                        )}
                      </span>
                      <span className=' text-grey font-semi-mid '>
                        Days left
                      </span>
                    </div> */
}
