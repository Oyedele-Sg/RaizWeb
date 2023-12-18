import { LockSavingsDataInterface } from "@/shared/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = {}

// manage show state

export const lockSavingSuccessSlice = createSlice({
  name: "lock-save",
  initialState: initialState as LockSavingsDataInterface,
  reducers: {
    getSuccessLockSave: (
      state,
      action: PayloadAction<LockSavingsDataInterface>
    ) => {
      return action.payload
    },
  },
})

export const { getSuccessLockSave } = lockSavingSuccessSlice.actions

export default lockSavingSuccessSlice.reducer
