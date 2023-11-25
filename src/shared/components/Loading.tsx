import React from "react"
import { useAppSelector } from "../redux/types"

export const Loading = () => {
  const loading = useAppSelector((state) => state.loading.isLoading)
  return (
    <>
      {loading && (
        <div className=' z-[10000] h-screen fixed top-0 bottom-0 left-0 right-0  flex items-center justify-center bg-loading-bg  '>
          <div className='    flex gap-4 items-center '>
            <div className='  bg-yellow rounded-full  w-[18.67px] h-[18.67px] animate-loading-animation-left-right  '></div>
            <div className=' flex flex-col gap-4'>
              <div className='  animate-loading-animation-top bg-white  rounded-full  w-[18.67px] h-[18.67px]  '></div>
              <div className=' bg-white rounded-full  w-[18.67px] h-[18.67px]  animate-loading-animation-middle  '></div>
              <div className=' bg-white  rounded-full  w-[18.67px] h-[18.67px]   animate-loading-animation-bottom '></div>
            </div>
            <div className=' bg-yellow rounded-full  w-[18.67px] h-[18.67px] animate-loading-animation-left-right '></div>
          </div>
        </div>
      )}
    </>
  )
}
