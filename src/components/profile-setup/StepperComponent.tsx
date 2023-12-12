import { ProfileStepper, Stepper } from "@/shared"
import React from "react"

interface Props {
  activeStep: number
}

export const StepperComponent: React.FC<Props> = ({ activeStep }) => {
  const steps = ["Username", "Pin", "Bank", "Done!"]

  return (
    <div>
      <ProfileStepper activeStep={activeStep} steps={steps} />
    </div>
  )
}
