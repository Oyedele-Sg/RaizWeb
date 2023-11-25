import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface QRStateInterface {
  isShowing: boolean
}

const initialState: QRStateInterface = {
  isShowing: false,
}

export const showQRSlice = createSlice({
  name: "ShowQR",
  initialState,
  reducers: {
    setQRTrue: (state) => {
      state.isShowing = true
    },
    setQRFalse: (state) => {
      state.isShowing = false
    },
  },
})

export const { setQRTrue, setQRFalse } = showQRSlice.actions

export default showQRSlice.reducer
