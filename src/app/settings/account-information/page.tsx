"use client"
import { AccountDetailsItems, ContentWrap } from "@/components/settings"
import { CurrentUserContext } from "@/providers/CurrentUserProvider"
import { BackBtnCircle } from "@/shared"
import moment from "moment"
import React, { useContext } from "react"

function page() {
  const { currentUser } = useContext(CurrentUserContext)
  return (
    <>
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

          {/* <AccountDetailsItems
      title='Address'
      icon='location'
      value={`${currentUser?.}`}
      border
    /> */}
        </ContentWrap>
      )}
    </>
  )
}

export default page
