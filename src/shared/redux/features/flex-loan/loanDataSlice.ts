import { LoanDataInterface } from "@/shared/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = {}

// manage show state

export const loanDataSlice = createSlice({
  name: "Flex loan",
  initialState: initialState as LoanDataInterface,
  reducers: {
    getLoanData: (state, action: PayloadAction<LoanDataInterface>) => {
      return action.payload
    },
  },
})

export const { getLoanData } = loanDataSlice.actions

export default loanDataSlice.reducer
