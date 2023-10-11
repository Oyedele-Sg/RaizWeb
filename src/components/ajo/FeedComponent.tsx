import React from "react"
import { ActivityItemWrap } from "./ActivityItemWrap"
import { SubHeaders } from "./SubHeaders"
import { FeedItems } from "./FeedItems"
import SectionHeader from "./SectionHeader"

export function FeedComponent() {
  return (
    <aside className=' basis-[348px] bg-grey rounded-lg '>
      <div className='flex flex-col gap-[58px] pt-12 px-6 '>
        <SectionHeader text='Activities' />

        <ActivityItemWrap>
          <SubHeaders text='New' />

          <FeedItems
            title='New Update in Earlystarter!'
            text='A contributor in earlystarter'
          />
        </ActivityItemWrap>
      </div>
    </aside>
  )
}
