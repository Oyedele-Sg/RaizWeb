import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface BalanceRevealState {
  state: boolean
}

const initialState: BalanceRevealState = {
  state: false,
}

export const balanceRevealSlice = createSlice({
  name: "balanceReveal",
  initialState,
  reducers: {
    setRevealTrue: (state) => {
      state.state = true
    },
    setRevealFalse: (state) => {
      state.state = false
    },
  },
})

export const { setRevealTrue, setRevealFalse } = balanceRevealSlice.actions

export default balanceRevealSlice.reducer
