import React from "react"
import CloseIcon from "../CloseIcon"

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  extraStyle?: string
  children: React.ReactNode
  closeLink?: string
  closeBtn?: boolean
}

export const WhiteWrap = ({
  extraStyle,
  children,
  closeBtn,
  closeLink,
  ...rest
}: Props) => {
  return (
    <div
      className={` bg-grey px-[60px] pt-[60px] pb-10 min-w-[45rem] ${extraStyle} whiteWrap__container `}
      {...rest}
    >
      {closeBtn && (
        <div className=' mb-[50px] '>
          <CloseIcon link={closeLink} />
        </div>
      )}
      {children}
    </div>
  )
}
