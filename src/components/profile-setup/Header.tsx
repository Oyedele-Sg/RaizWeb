import React, { FC } from "react"
import { StepperComponent } from "./StepperComponent"

interface Props {
  activeStep: number
}

export const Header: FC<Props> = ({ activeStep }) => {
  return (
    <div className=' flex flex-col items-start  gap-12  '>
      <h1 className=' font-display__medium text-purple font-semi-mid  w-full '>
        Profile Set-Up
      </h1>
      <div className='w-full '>
        <StepperComponent activeStep={activeStep} />
      </div>
    </div>
  )
}
