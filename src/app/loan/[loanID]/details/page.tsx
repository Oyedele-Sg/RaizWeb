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
  Loading,
  LoanActivityDataInterface,
  LoanDataInterface,
  RolloverCalculatorInterface,
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

  const Params = useParams()
  const { currentUser } = useContext(CurrentUserContext)
  const dispatch = useAppDispatch()

  const [loanDetails, setLoanDetails] = React.useState<LoanDataInterface>()
  const [loanActivity, setLoanActivity] =
    React.useState<LoanActivityDataInterface[]>()
  const [rollOverData, setRollOverData] =
    React.useState<RolloverCalculatorInterface>()
  const [openModal, setOpenModal] = React.useState(false)

  const getData = async () => {
    try {
      const response = await userService.getLoanByID(Params.loanID as string)
      setLoanDetails(response)

      const activityResponse = await userService.getLoanActivityByID(
        Params.loanID as string
      )

      setLoanActivity(activityResponse)
      const rollOverData = await userService.rolloverCalculator(
        Params.loanID as string
      )
      setRollOverData(rollOverData)
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

    {
      title: "Total  Amount of Loan",
      data: loanDetails?.total_amount,
    },
    {
      title: "Amount Paid",
      data: loanDetails?.loan_amount_paid,
    },
    {
      title: "Amount Unpaid",
      data: loanDetails?.loan_amount_unpaid,
    },
    {
      title: "Interest Amount",
      data: loanDetails?.interest_amount,
    },
    {
      title: "Category",
      data: loanDetails?.loan_category.loan_category_name,
    },
    {
      title: "Days Left",
      data: loanDetails?.days_left,
    },
  ]

  useEffect(() => {
    getData()
  }, [Params.loanID])

  return (
    <>
      <Loading />
      <div className=' '>
        <div className=' px-10 pt-10'>
          <HomeHeader title='Loan Hub' link='/loan/hub' />
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
                      `/savings/target-savings/${Params.loanID}/share`
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
                      `/savings/target-savings/${Params.loanID}/settings`
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

        <div className='p-10  flex flex-col lg:flex-row gap-16  '>
          <WhiteTileWrap extraStyle=' p-12 flex-1 flex flex-col gap-8  '>
            <div className=' flex flex-col gap-8  '>
              <div className='flex flex-col gap-6 '>
                <h2 className=' text-purple font-semibold text-center text-t-24 '>
                  {" "}
                  Loan Details
                </h2>
                {/* <p className=' text-purple text-center text-t-16  '>
                Money to be collected on the first of December and no one has
                access to your deposit
              </p> */}
              </div>

              {!loanDetails?.is_loan_repaid && (
                <div className='flex gap-9 '>
                  <BtnMain
                    btnText='Roll-Over'
                    btnStyle=' w-full text-purple border-neutral-100 border'
                    onClick={() => setOpenModal(true)}
                  />
                  <BtnMain
                    btnText='Pay'
                    btnStyle=' w-full text-grey btn-gradient-loan '
                    onClick={() => Router.push(`/loan/${Params.loanID}/pay`)}
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
              {loanActivity?.map((item, index) => (
                <div className=' flex items-center gap-2   '>
                  {/* <Avatar className=' cursor-default border-neutral-30 border-[2px] w-[48px] h-[48px]  '>
                  <AvatarImage src={item.account_user.profile_image_url} />
                  <AvatarFallback className=' text-purple font-bold  uppercase '>
                    {item.account_user.first_name.charAt(0)}
                    {item.account_user.last_name.charAt(0)}
                  </AvatarFallback>
                </Avatar> */}

                  <div className=' flex flex-col gap-2 '>
                    <h4 className=' text-purple text-t-18 font-semi-mid   '>
                      {item.activity_description}
                    </h4>
                    <div className='  flex items-center gap-2 '>
                      <div className=' capitalize text-neutral-70  text-t-16 '>
                        {item.activity_type}
                      </div>{" "}
                      <div className=' bg-neutral-70 rounded-full w-2 h-2    '></div>
                      <div className=' text-neutral-70 text-t-16 '>
                        {getTimeAgoFromUTC(item.updated_at)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </WhiteTileWrap>
        </div>
        {openModal && (
          <div className=' absolute bg-bg-overlay z-1000000000000000000000000000000000000000  top-0 bottom-0 left-0 right-0 flex items-center justify-center  '>
            <div className=' bg-loan-bg  min-w-[580px] rounded-2xl p-12 gap-9 flex flex-col '>
              <div className=''>
                <h2 className=' text-center text-purple font-semi-mid text-t-45   '>
                  Rollover Loan
                </h2>
              </div>
              <div className='  '>
                <div className=''>
                  <h3 className=' text-center text-neutral-70 text-t-18   '>
                    Payback amount
                  </h3>
                  <h2 className=' text-t-28 font-semibold text-purple text-center  '>
                    ₦{rollOverData?.interest_amount?.toLocaleString() || "0"}
                  </h2>
                </div>
                <div className='  bg-grey rounded  flex  flex-col gap-[25px] text-t-[18px] text-purple px-4 py-6 '>
                  <div className=' flex justify-between '>
                    <span>Principal </span>{" "}
                    <span className=''>
                      ₦{loanDetails?.total_amount?.toLocaleString()}
                    </span>
                  </div>
                  <div className=' flex justify-between '>
                    <span className=''>Additional Duration </span>{" "}
                    <span className=''> 2 weeks </span>
                  </div>
                  <div className=' flex justify-between '>
                    <span className=''>Interest Rate </span>{" "}
                    <span> {rollOverData?.current_interest}%</span>
                  </div>
                  {/* <div className=' flex justify-between '>
                    <span className=''>Interest Amount</span>{" "}
                    <span>
                      {" "}
                      ₦{rollOverData?.interest_amount.toLocaleString()}
                    </span>
                  </div> */}
                </div>
              </div>

              <BtnMain
                btnText='Next'
                btnStyle=' w-full text-center text-grey  btn-gradient-loan  '
                onClick={async () => {
                  try {
                    dispatch(setLoadingTrue())
                    await userService.applyFlexRollover(Params.loanID as string)
                    dispatch(setLoadingFalse())
                    setOpenModal(false)
                  } catch (error) {
                    toast({
                      title: "Something Went Wrong:",
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
                    dispatch(setLoadingFalse())
                    setOpenModal(false)
                  }
                }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Page
