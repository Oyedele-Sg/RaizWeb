import { CreditTransferDataInterface } from '@/shared/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {};

// manage show state

export const selectedCreditTransferSlice = createSlice({
  name: 'Transfer',
  initialState: initialState as CreditTransferDataInterface,
  reducers: {
    getSelectedCreditTransfer: (
      state,
      action: PayloadAction<CreditTransferDataInterface>
    ) => {
      return action.payload;
    },
  },
});

export const { getSelectedCreditTransfer } =
  selectedCreditTransferSlice.actions;

export default selectedCreditTransferSlice.reducer;
