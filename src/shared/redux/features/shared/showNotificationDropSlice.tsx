import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface NotificationStateInterface {
  isShowing: boolean
}

const initialState: NotificationStateInterface = {
  isShowing: false,
}

export const showNotificationDropSlice = createSlice({
  name: "ShowNotification",
  initialState,
  reducers: {
    setNotificationTrue: (state) => {
      state.isShowing = true
    },
    setNotificationFalse: (state) => {
      state.isShowing = false
    },
  },
})

export const { setNotificationTrue, setNotificationFalse } =
  showNotificationDropSlice.actions

export default showNotificationDropSlice.reducer
