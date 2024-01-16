import {
  LockSavingsDataInterface,
  TargetSavingsGroupDataInterface,
} from "@/shared/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = {}

// manage show state

export const groupSavingResponseSlice = createSlice({
  name: "lock-save-id",
  initialState: initialState as TargetSavingsGroupDataInterface,
  reducers: {
    getSuccessGroupTargetSave: (
      state,
      action: PayloadAction<TargetSavingsGroupDataInterface>
    ) => {
      return action.payload
    },
  },
})

export const { getSuccessGroupTargetSave } = groupSavingResponseSlice.actions

export default groupSavingResponseSlice.reducer
