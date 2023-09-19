"use client"
import React from "react"
import BackBtnCircle from "./BackBtnCircle"
import { NextArrow } from "../icons"
import { useRouter } from "next/navigation"

export function NavigationButtons() {
  const Router = useRouter()

  return (
    <div className=''>
      <BackBtnCircle />
      <button title='next' className=''>
        <NextArrow />
      </button>
    </div>
  )
}
