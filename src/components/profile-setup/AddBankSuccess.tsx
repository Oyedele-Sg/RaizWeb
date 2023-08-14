import { BtnMain, IconSavedList } from "@/shared"
import Image from "next/image"
import React from "react"
import { Header } from "./Header"
import { useRouter } from "next/navigation"

interface Prop {
  cancelFunc: () => void
}

export const AddBankSuccess = ({ cancelFunc }: Prop) => {
  const Router = useRouter()
  return (
    <div className='flex  flex-col gap-3  '>
      {/* <div className=' flex justify-between items-center'>
        <h2 className='pl-3 font-body__large  text-purple font-semi-mid text-[18px]   '>
          Add Traditional Bank Number
        </h2>

        <div className='flex items-center gap-1 '>
          <IconSavedList />
          <span className=' text-[16px] leading-[20px] text-purple   '>
            {" "}
            Saved List{" "}
          </span>
        </div>
      </div> */}

      <div className=' px-8 flex flex-col gap-8 bg-neutral-20 py-16 rounded-lg '>
        <div className='flex items-center justify-center '>
          <Image
            src='/illustrations/verify-success.svg'
            width={167.5}
            height={129.07}
            alt='success'
          />
        </div>
        <div className=''>
          <div className=' text-center flex flex-col gap-2   '>
            <h1 className=' font-headline__large  font-semi-mid text-purple   '>
              Account Number Added
            </h1>
            <p className=' font-body__large text-neutral-90 '>
              Your account number has been successfully added and saved for
              later!
            </p>
          </div>
        </div>
        <div className=' flex items-center justify-center  gap-12 px-4 '>
          {/* <BtnMain
            btnText='Add More'
            btnStyle=' border  w-full border-purple text-purple  '
            onClick={() => addFunc()}
          /> */}
          <BtnMain
            btnText='Done'
            btnStyle=' w-full  bg-purple text-grey   '
            onClick={() => cancelFunc()}
          />
        </div>
      </div>
    </div>
  )
}

export default AddBankSuccess
