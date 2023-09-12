import { RegisterDataInterface } from "@/shared/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = ""

// manage show state

export const signupEmailSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    getSignUpEmail: (state, action: PayloadAction<string>) => {
      return action.payload
    },
  },
})

export const { getSignUpEmail } = signupEmailSlice.actions

export default signupEmailSlice.reducer
