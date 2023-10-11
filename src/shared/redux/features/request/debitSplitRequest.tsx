import { DebitSplitRequestDataInterface } from '@/shared/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {};

// manage show state

export const selectedDebitSplitRequestSlice = createSlice({
  name: 'Request',
  initialState: initialState as DebitSplitRequestDataInterface,
  reducers: {
    getSelectedDebitSplitRequest: (
      state,
      action: PayloadAction<DebitSplitRequestDataInterface>
    ) => {
      return action.payload;
    },
  },
});

export const { getSelectedDebitSplitRequest } =
  selectedDebitSplitRequestSlice.actions;

export default selectedDebitSplitRequestSlice.reducer;
