"use client"
import { ContentWrap } from "@/components/budget"

export default function page() {
  return (
    <div className=''>
      <ContentWrap>
        <div className=' flex flex-col gap-9 '>
          <div className=' flex flex-col gap-1 '>
            <h2 className=' font-display__medium text-purple font-semi-mid '>
              {" "}
              Create Budget{" "}
            </h2>
            <p className=' text-neutral-70  font-title__large '>Budget</p>
          </div>

          <div className=''>
            <div className=' px-6 py-4  border border-neutral-50 rounded-lg flex flex-col gap-2 w-full '>
              <h3 className=' font-title__large text-purple  '> November </h3>
              <p className=' text-neutral-80 font-body__large '>
                Creating a Budget for November: Allocating Funds Across
                Categories.
              </p>
            </div>
          </div>
        </div>
      </ContentWrap>
    </div>
  )
}
