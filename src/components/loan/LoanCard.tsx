export { LoanHubComponent } from "./LoanHubComponent"

import Image from "next/image"
import React from "react"
import { Progress } from "@/components/ui/progress"
import { LoanDataInterface } from "@/shared"
import { dateDifferenceInDays, formatNumberToK } from "@/utils/helpers"
import { useRouter } from "next/navigation"

interface Props {
  data: LoanDataInterface
}

export function LoanCard({ data }: Props) {
  const Router = useRouter()

  const color = ["bg-loan-flex", "bg-loan-term", "bg-loan-payday"]

  return (
    <div
      className=' rounded-2xl  border-[2px] border-neutral-30 min-w-[260px] max-w-[294px] py-5 px-4 flex flex-col gap-5 bg-loan-bg '
      onClick={() => Router.push(`/loan/${data.loan_id}/details`)}
    >
      <Image src='/images/frame-583.png' width={262} height={128} alt='' />

      <div className=' flex flex-col gap-4 '>
        {/* <h2 className=' font-semibold text-t-20 text-purple text-ellipsis overflow-hidden max-w-full whitespace-nowrap   '>
          {data.}
        </h2> */}

        <div
          className={` border rounded-r-10 border-neutral-50 max-w-[160px] flex items-center justify-center text-neutral-80 capitalize ${
            color[data.loan_category.loan_category_id - 1]
          } `}
        >
          {" "}
          {data.loan_category.loan_category_name}{" "}
        </div>

        <div className=' flex justify-between  gap-4 items-start '>
          <div className=' flex flex-col items-center justify-center   '>
            <h3 className=' font-semibold text-t-16 text-purple  '>
              ₦{formatNumberToK(data.loan_amount)}
            </h3>
            <p className=' font-semi-mid text-t-16 text-neutral-70  '>Amount</p>
          </div>
          <div className=' flex flex-col items-center justify-center '>
            <h3 className=' font-semibold text-t-16 text-purple  '>
              {data.loan_amount_paid
                ? `₦${formatNumberToK(data.loan_amount_paid)}`
                : 0}
            </h3>
            <p className=' font-semi-mid text-t-16 text-neutral-70 text-center flex flex-col items-center  '>
              Paid
            </p>
          </div>
          <div className=' flex flex-col items-center justify-center   '>
            <h3 className=' font-semibold text-t-16 text-purple  '>
              {data.loan_amount_unpaid
                ? `₦${formatNumberToK(data.loan_amount_unpaid)}`
                : 0}
            </h3>
            <p className='font-semi-mid text-t-16 text-neutral-70 text-center flex flex-col items-center'>
              Balance
            </p>
          </div>
        </div>

        <div className=' flex items-center gap-8 '>
          <Progress
            value={Math.ceil(data.percentage_completed)}
            className=' bg-pesaraise-10 loan-progress '
          />{" "}
          <p className=' text-neutral-80 text-t-14 font-medium   '>
            {Math.ceil(data.percentage_completed)}%
          </p>
        </div>
      </div>
    </div>
  )
}
