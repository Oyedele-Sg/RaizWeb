import { configureStore } from "@reduxjs/toolkit"
import {
  signupEmailReducer,
  loadingReducer,
  showQRReducer,
  showNotificationDropReducer,
  selectedNotificationReducer,
  selectedCreditTransferReducer,
  selectedDebitTransferReducer,
  selectedTargetSaveInviteReducer,
  selectedDebitSplitRequestReducer,
  balanceRevealReducer,
  SidebarReducer,
  lockSavingSuccessReducer,
  groupSavingResponseReducer,
  notificationPaginationReducer,
} from "./features"
import { selectedRequestReducer } from "./features/request"
import { loanDataReducer } from "./features/flex-loan"
// import authReducer from "./features/lice

export const store = configureStore({
  reducer: {
    signupEmail: signupEmailReducer,
    loading: loadingReducer,
    selectedRequest: selectedRequestReducer,
    showQR: showQRReducer,
    showNotificationDrop: showNotificationDropReducer,
    selectedNotification: selectedNotificationReducer,
    selectedCreditTransfer: selectedCreditTransferReducer,
    selectedDebitTransfer: selectedDebitTransferReducer,
    selectedTargetSaveInvite: selectedTargetSaveInviteReducer,
    selectedDebitSplitRequest: selectedDebitSplitRequestReducer,
    notifcationPagination: notificationPaginationReducer,
    balanceReveal: balanceRevealReducer,
    sidebarLinks: SidebarReducer,
    lockSavingSuccessData: lockSavingSuccessReducer,
    groupSavingSuccessData: groupSavingResponseReducer,
    loanDataReducer: loanDataReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
