import { NotificationDataInterface } from '@/shared/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {};

// manage show state

export const selectedNotificationSlice = createSlice({
  name: 'Notification',
  initialState: initialState as NotificationDataInterface,
  reducers: {
    getSelectedNotification: (
      state,
      action: PayloadAction<NotificationDataInterface>
    ) => {
      return action.payload;
    },
  },
});

export const { getSelectedNotification } = selectedNotificationSlice.actions;

export default selectedNotificationSlice.reducer;
