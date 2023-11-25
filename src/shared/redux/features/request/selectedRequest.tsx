import {
  PendingRequestDataInterface,
  RegisterDataInterface,
} from '@/shared/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {};

// manage show state

export const selectedRequestSlice = createSlice({
  name: 'selectedRequest',
  initialState: initialState as PendingRequestDataInterface,
  reducers: {
    getSelectedRequest: (
      state,
      action: PayloadAction<PendingRequestDataInterface>
    ) => {
      return action.payload;
    },
  },
});

export const { getSelectedRequest } = selectedRequestSlice.actions;

export default selectedRequestSlice.reducer;
