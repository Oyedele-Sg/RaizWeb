import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface SidebarLinkState {
  state: String
}

const initialState: SidebarLinkState = {
  state: "/dashboard",
}

const localStorageKey = "revealBalanceState"

export const SidebarSlice = createSlice({
  name: "sidebarSlice",
  initialState,
  reducers: {
    getCurrentLink: (state, action: PayloadAction<string>) => {
      state.state = action.payload
    },
  },
})

export const { getCurrentLink } = SidebarSlice.actions

export default SidebarSlice.reducer
