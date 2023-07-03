import { Stepper } from "@/shared"
import React from "react"

interface Props {
  activeStep: number
}

export const AuthStepper: React.FC<Props> = ({ activeStep }) => {
  const steps = ["Email", "Phone Number", "BVN"]
  return (
    <div>
      {" "}
      <Stepper steps={steps} activeStep={activeStep} />{" "}
    </div>
  )
}
