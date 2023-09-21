"use client"
import { ComponentOne} from "@/components/approve-request"
import { Loading } from "@/shared"
import { useAppSelector } from "@/shared/redux/types"
import { useState } from "react"

export default function page() {
  return (
    <>
      <Loading />

      <ComponentOne />
    </>
  )
}
