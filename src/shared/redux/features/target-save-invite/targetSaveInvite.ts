import { TargetSaveInviteDataInterface } from '@/shared/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {};

// manage show state

export const selectedTargetSaveInviteSlice = createSlice({
  name: 'Invite',
  initialState: initialState as TargetSaveInviteDataInterface,
  reducers: {
    getSelectedTargetSaveInvite: (
      state,
      action: PayloadAction<TargetSaveInviteDataInterface>
    ) => {
      return action.payload;
    },
  },
});

export const { getSelectedTargetSaveInvite } =
  selectedTargetSaveInviteSlice.actions;

export default selectedTargetSaveInviteSlice.reducer;
