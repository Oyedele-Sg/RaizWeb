import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface LoadingState {
  isLoading: boolean;
}

const initialState: LoadingState = {
  isLoading: false,
};

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoadingTrue: (state) => {
      state.isLoading = true;
    },
    setLoadingFalse: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setLoadingTrue, setLoadingFalse } = loadingSlice.actions;

export default loadingSlice.reducer;
