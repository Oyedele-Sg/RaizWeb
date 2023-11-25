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
      className={` bg-grey whiteWrap__container   ${extraStyle}  lg:px-[60px] lg:pt-[60px] px-5 pt-[80px] pb-[60px]  lg:pb-10    `}
      {...rest}
    >
      <div className='  '>
        {closeBtn && (
          <div className=' hidden lg:block mb-[50px] ml-[50px] '>
            <CloseIcon link={closeLink} />
          </div>
        )}
        {children}
      </div>
    </div>
  )
}
