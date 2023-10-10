import { configureStore } from '@reduxjs/toolkit';
import {
  signupEmailReducer,
  loadingReducer,
  showQRReducer,
  showNotificationDropReducer,
  selectedNotificationReducer,
  selectedCreditTransferReducer,
  selectedDebitTransferReducer,
} from './features';
import { selectedRequestReducer } from './features/request';
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
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
