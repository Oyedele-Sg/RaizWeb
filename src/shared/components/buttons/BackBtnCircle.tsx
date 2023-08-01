"use client"
import React from "react"
import { BackArrow } from "../icons"
import { useRouter } from "next/navigation"

export const BackBtnCircle = () => {
  const Router = useRouter()
  return (
    <button title='back' className='' onClick={() => Router.back()}>
      <BackArrow />
    </button>
  )
}

export default BackBtnCircle
