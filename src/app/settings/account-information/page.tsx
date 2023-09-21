"use client"
import { AccountDetailsItems, ContentWrap } from "@/components/settings"
import { CurrentUserContext } from "@/providers/CurrentUserProvider"
import { BackBtnCircle } from "@/shared"
import moment from "moment"
import React, { useContext } from "react"

function page() {
  const { currentUser } = useContext(CurrentUserContext)
  return (
    <div>
      {currentUser && (
        <ContentWrap title='Account Information'>
          <AccountDetailsItems
            title='Full Name'
            icon='profile-user'
            value={`${currentUser?.first_name} ${currentUser?.last_name} `}
            border
          />

          <AccountDetailsItems
            title='Date of Birth'
            icon='calendar'
            value={`${moment(currentUser?.date_of_birth).format("YY-MM-DD")}`}
            border
          />
          <AccountDetailsItems
            title='Email Address '
            icon='mail'
            value={`${currentUser?.email}`}
            border
          />
          <AccountDetailsItems
            title='Phone Number '
            icon='phone'
            value={`${currentUser?.phone_number}`}
          />
        </ContentWrap>
      )}

      <div className=' bg-[#FFEDC7] w-full flex mt-8 '>
        <div className=' w-2 bg-[#FFE09D] min-h-full '> </div>
        <div className=' text-neutral-100 py-6 pl-4  pr-[60px] text-t-14 leading-5 '>
          You are unable to edit this profile because your account has already
          been verified. If you feel that you need to edit, please reach out to
          customer support.
        </div>
      </div>
    </div>
  )
}

export default page
