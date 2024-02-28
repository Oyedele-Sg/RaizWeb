"use client"
import { HomeHeader } from "@/components/ajo"
import { toast } from "@/components/ui/use-toast"
import { userService } from "@/services"
import {
  AjoCycleInterface,
  AjoDataInterface,
  AjoPaymentCycleInterface,
  BtnMain,
  GroupSaveMemberDataInterface,
  LoanActivityDataInterface,
  LoanDataInterface,
  WhiteTileWrap,
} from "@/shared"
import Image from "next/image"
import { useRouter, useSearchParams, useParams } from "next/navigation"
import React, { useContext, useEffect } from "react"
import AjoPaymentTable from "@/components/ajo/AjoPaymentTable"
import { useAppDispatch } from "@/shared/redux/types"
import { setLoadingFalse, setLoadingTrue } from "@/shared/redux/features"
import { dateDifferenceInDays, getTimeAgoFromUTC } from "@/utils/helpers"
import moment from "moment"
import {
  DetailInformationComponent,
  SavingDetailsTile,
} from "@/components/savings"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { CurrentUserContext } from "@/providers/CurrentUserProvider"

function Page() {
  const Router = useRouter()
  const dispatch = useAppDispatch()
  const Params = useParams()
  const { currentUser } = useContext(CurrentUserContext)

  const [loanDetails, setLoanDetails] = React.useState<LoanDataInterface>()
  const [loanActivity, setLoanActivity] =
    React.useState<LoanActivityDataInterface[]>()
  const [savingsMember, setSavingsMember] =
    React.useState<GroupSaveMemberDataInterface>()

  const getData = async () => {
    try {
      const response = await userService.getLoanByID(Params.loanID)
      setLoanDetails(response)

      const activityResponse = await userService.getLoanActivityByID(
        Params.savingsID
      )

      setLoanActivity(activityResponse)
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
      title: "Amount of Loan",
      data: loanDetails?.loan_amount,
    },
    // {
    //   title: "End Date",
    //   data: moment(savingsDetails?.target_save.end_date).format(
    //     "DD MMMM, YYYY"
    //   ),
    // },
    {
      title: "Amount Paid",
      data: loanDetails?.loan_amount_paid,
    },
    {
      title: "Amount Paid",
      data: loanDetails?.loan_amount_paid,
    },
    {
      title: "Days Left",
      data: loanDetails?.days_left,
    },
  ]

  useEffect(() => {
    getData()
  }, [Params.savingsID])

  return (
    <div className=' '>
      <div className=' p-10'>
        <HomeHeader title='Saving Hub' link='/savings/hub' />
      </div>

      {/* <div className=' w-full min-h-[360px] relative   '>
        <Image src={`/images/frame-643.png`} fill={true} alt='' />
        <div className=' absolute bg-overlay-10 top-0 bottom-0 left-0 right-0  '></div>

        <div className=' absolute top-0  bottom-0 left-0 right-0    p-10 flex  justify-between '>
          <div className='flex gap-8 items-center w-full    '>
            <div
              className=' hidden border-[2px] border-neutral-80 rounded-full p-3 items-center justify-center lg:flex  '
              onClick={() => Router.push("/savings/hub")}
            >
              <Image
                src={"/icons/ajo-arrow-left.svg"}
                width={48}
                height={48}
                alt=''
              />
            </div>
            <div className=' flex w-full  justify-between  '>
              <div className=' text-grey flex flex-col gap-4  '>
                <div className=' flex flex-col  gap-2    '>
                  <h1 className='  font-headline__large font-semibold  '>
                    {savingsDetails?.target_save.target_save_name}
                  </h1>
                </div>
                {!savingsDetails?.target_save_group_members?.some(
                  (member) =>
                    member.account_user_id === currentUser?.account_user_id
                ) ? (
                  <DetailInformationComponent
                    savingsDetails={preJoinData}
                    completion_percentage={
                      savingsDetails?.completion_percentage
                    }
                  />
                ) : (
                  <DetailInformationComponent
                    savingsDetails={joinData}
                    completion_percentage={
                      savingsMember?.individual_completion_percentage
                    }
                  />
                )}
              </div>
            </div>

            {savingsDetails?.target_save_group_members?.some(
              (member) =>
                member.account_user_id === currentUser?.account_user_id
            ) && (
              <div className=' flex gap-12  self-end '>
                <div
                  className='flex items-center gap-1 align-bottom self-end cursor-default '
                  onClick={() =>
                    Router.push(
                      `/savings/target-savings/${Params.savingsID}/share`
                    )
                  }
                >
                  <Image
                    src={"/icons/forward-square.svg"}
                    width={24}
                    height={24}
                    alt=''
                  />
                  <span className=' text-neutral-20 text-t-16   '>Share</span>
                </div>
                <div
                  className='flex items-center gap-1 align-bottom cursor-default '
                  onClick={() =>
                    Router.push(
                      `/savings/target-savings/${Params.savingsID}/settings`
                    )
                  }
                >
                  <Image
                    src={"/icons/vuesax-outline-edit.svg"}
                    width={24}
                    height={24}
                    alt=''
                  />
                  <span className=' text-neutral-20 text-t-16   '>Edit</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div> */}

      <div className='p-10 mt-[94px] flex flex-col lg:flex-row gap-16  '></div>
    </div>
  )
}

export default Page
