import { BtnMain } from "@/shared"
import Image from "next/image"
import React from "react"

interface Props {
  changeFunc: () => void
  previewFunc: () => void
}

export function DocumentUploadComponent({ changeFunc, previewFunc }: Props) {
  return (
    <div className=' w-full flex justify-between items-center mx-4 mt-11  '>
      <span className=' text-purple  text-t-18  '>Uploaded</span>
      <BtnMain
        btnText=' Change  '
        btnStyle=' text-purple bg-neutral-50   flex  items-center  gap-2 py-[6px] px-6 rounded-full   '
        onClick={changeFunc}
        type='button'
      >
        {" "}
        <Image
          src={`/icons/document-upload.svg`}
          width={24}
          height={24}
          alt=''
        />{" "}
      </BtnMain>
      <BtnMain
        type='button'
        btnText='Preview  '
        btnStyle=' text-grey bg-purple   flex  items-center  gap-2 py-[6px] px-6 rounded-full   '
        onClick={previewFunc}
      >
        {" "}
        <Image
          src={`/icons/tick-circle.svg`}
          width={24}
          height={24}
          alt=''
        />{" "}
      </BtnMain>{" "}
    </div>
  )
}
