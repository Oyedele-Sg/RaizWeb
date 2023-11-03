import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BalanceRevealState {
  state: boolean;
}

const initialState: BalanceRevealState = {
  state: false,
};

const localStorageKey = 'revealBalanceState';

export const balanceRevealSlice = createSlice({
  name: 'balanceReveal',
  initialState,
  reducers: {
    setRevealBalance: (state) => {
      state.state = !state.state;
      localStorage.setItem(localStorageKey, state.state ? '1' : '0');
    },
    initializeRevealBalance: (state) => {
      const storedState = localStorage.getItem(localStorageKey);
      state.state = storedState === '1';
    },
  },
});

export const { setRevealBalance, initializeRevealBalance } =
  balanceRevealSlice.actions;

export default balanceRevealSlice.reducer;
