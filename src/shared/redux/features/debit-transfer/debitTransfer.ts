import { DebitTransferDataInterface } from '@/shared/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {};

// manage show state

export const selectedDebitTransferSlice = createSlice({
  name: 'Transfer',
  initialState: initialState as DebitTransferDataInterface,
  reducers: {
    getSelectedDebitTransfer: (
      state,
      action: PayloadAction<DebitTransferDataInterface>
    ) => {
      return action.payload;
    },
  },
});

export const { getSelectedDebitTransfer } = selectedDebitTransferSlice.actions;

export default selectedDebitTransferSlice.reducer;
