import { configureStore } from "@reduxjs/toolkit"
import { signupEmailReducer, loadingReducer, showQRReducer } from "./features"
import { selectedRequestReducer } from "./features/request"
// import authReducer from "./features/lice

export const store = configureStore({
  reducer: {
    signupEmail: signupEmailReducer,
    loading: loadingReducer,
    selectedRequest: selectedRequestReducer,
    showQR: showQRReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
