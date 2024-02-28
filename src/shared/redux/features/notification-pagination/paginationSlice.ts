import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  page: 1,
};

export const paginationSlice = createSlice({
  name: 'Pagination',
  initialState,
  reducers: {
    setPaginationPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
});

export const { setPaginationPage } = paginationSlice.actions;

export default paginationSlice.reducer;
