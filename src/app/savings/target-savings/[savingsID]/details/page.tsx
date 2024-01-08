"use client"
import { HomeHeader } from "@/components/ajo"
import { toast } from "@/components/ui/use-toast"
import { userService } from "@/services"
import {
  AjoCycleInterface,
  AjoDataInterface,
  AjoPaymentCycleInterface,
  BtnMain,
  GroupTargetSavingsActivitiesDataInterface,
  GroupTargetSavingsDataInterface,
  WhiteTileWrap,
} from "@/shared"
import Image from "next/image"
import { useRouter, useSearchParams, useParams } from "next/navigation"
import React, { useContext, useEffect } from "react"
import AjoPaymentTable from "@/components/ajo/AjoPaymentTable"
import { useAppDispatch } from "@/shared/redux/types"
import { setLoadingFalse, setLoadingTrue } from "@/shared/redux/features"
import { dateDifferenceInDays, timeAgo } from "@/utils/helpers"
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

  const [savingsDetails, setSavingsDetails] =
    React.useState<GroupTargetSavingsDataInterface>()
  const [savingsActivity, setSavingsActivity] =
    React.useState<GroupTargetSavingsActivitiesDataInterface[]>()

  const getData = async () => {
    try {
      const response = await userService.getTargetSavingsByID(Params.savingsID)
      const activityResponse = await userService.getGroupTargetActivity(
        Params.savingsID
      )

      setSavingsDetails(response)
      setSavingsActivity(activityResponse)
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

  const targetMember = savingsDetails?.target_save_group_members.find(
    (member) => member.account_user_id === currentUser?.account_user_id
  )

  const tileData = [
    {
      title: "Start Date",
      data: moment(savingsDetails?.target_save.start_date).format(
        "DD MMMM, YYYY"
      ),
    },
    {
      title: "End Date",
      data: moment(savingsDetails?.target_save.end_date).format(
        "DD MMMM, YYYY"
      ),
    },
    {
      title: "Target Amount",
      data: savingsDetails?.target_save.target_amount,
    },
    {
      title: "Days Left",
      data: dateDifferenceInDays(
        savingsDetails?.target_save.start_date as Date,
        savingsDetails?.target_save.end_date as Date
      ),
    },
  ]

  const preJoinData = [
    {
      title: "Members",
      value: savingsDetails?.target_save_group_members.length,
    },
    {
      title: "Target amount",
      value: savingsDetails?.target_save.target_amount,
    },

    {
      title: "Days Left",
      value: dateDifferenceInDays(
        savingsDetails?.target_save.start_date as Date,
        savingsDetails?.target_save.end_date as Date
      ),
    },
  ]
  const joinData = [
    {
      title: "Your Balance",
      value: targetMember?.current_amount,
    },
    {
      title: "Target",
      value: savingsDetails?.target_save.target_amount,
    },

    {
      title: "Members",
      value: savingsDetails?.target_save_group_members.length,
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
                      savingsDetails?.completion_percentage
                    }
                  />
                )}
              </div>
            </div>

            {savingsDetails?.target_save_group_members?.some(
              (member) =>
                member.account_user_id === currentUser?.account_user_id
            ) && (
              <div
                className='flex items-center gap-1 align-bottom self-end cursor-default '
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
            )}
          </div>
        </div>
      </div>

      <div className='p-10 mt-[94px] flex flex-col lg:flex-row gap-16  '>
        <WhiteTileWrap extraStyle=' p-12 flex-1 flex flex-col gap-8  '>
          <div className=' flex flex-col gap-8  '>
            <div className='flex flex-col gap-6 '>
              <h2 className=' text-purple font-semibold text-center text-t-24 '>
                {" "}
                Payout Rules
              </h2>
              <p className=' text-purple text-center text-t-16  '>
                Money to be collected on the first of December and no one has
                access to your deposit
              </p>
            </div>
            {!savingsDetails?.target_save_group_members?.some(
              (member) =>
                member.account_user_id === currentUser?.account_user_id
            ) ? (
              <BtnMain
                btnText='Join Challenge'
                btnStyle=' w-full text-grey btn-gradient-savings '
                onClick={() =>
                  Router.push(
                    `/savings/target-savings/${Params.savingsID}/join`
                  )
                }
              />
            ) : (
              <div className='flex gap-9 '>
                <BtnMain
                  btnText='Withdraw'
                  btnStyle=' w-full text-purple border-neutral-100 border'
                  onClick={() =>
                    Router.push(
                      `/savings/target-savings/${Params.savingsID}/withdrawal`
                    )
                  }
                />
                <BtnMain
                  btnText='Add Funds'
                  btnStyle=' w-full text-grey btn-gradient-savings '
                  onClick={() =>
                    Router.push(
                      `/savings/target-savings/${Params.savingsID}/add-funds`
                    )
                  }
                />
              </div>
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
        <WhiteTileWrap extraStyle=' p-12 flex-1 flex flex-col gap-8 '>
          <div className=' flex flex-col gap-8  '>
            <div className='flex flex-col gap-6 '>
              <h2 className=' text-purple font-semibold text-t-24 '>
                Activites
              </h2>
            </div>
          </div>

          <div className=' flex gap-x-16 gap-y-8 flex-wrap  '>
            {savingsActivity?.map((item, index) => (
              <div className=' flex items-center gap-2   '>
                <Avatar className=' cursor-default border-neutral-30 border-[2px] w-[48px] h-[48px]  '>
                  <AvatarImage src={item.account_user.profile_image_url} />
                  <AvatarFallback className=' text-purple font-bold  uppercase '>
                    {item.account_user.first_name.charAt(0)}
                    {item.account_user.last_name.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div className=' flex flex-col gap-2 '>
                  <h4 className=' text-purple text-t-18 font-semi-mid   '>
                    {item.target_save_group_activity_description}
                  </h4>
                  <div className='  flex items-center gap-2 '>
                    <div className=' text-neutral-70  text-t-16 '>
                      {savingsDetails?.target_save.target_save_name}{" "}
                    </div>{" "}
                    <div className=' bg-neutral-70 rounded-full w-2 h-2    '></div>
                    <div className=' text-neutral-70 text-t-16 '>
                      {timeAgo(item.updated_at)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </WhiteTileWrap>
      </div>
    </div>
  )
}

export default Page
