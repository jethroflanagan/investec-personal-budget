import { createSlice, createSelector } from '@reduxjs/toolkit';

export const loaderSlice = createSlice({
  name: 'loader',
  initialState: {
    started: false,
    finished: false,
    groups: false,
    users: false,
    categories: false,
    merchants: false,
    bankTransactions: false,
    expenses: false,
  },
  reducers: {
    setAppLoaded(state, action) {
      state[action.payload] = true;
    },
  },
});
export const { setAppLoaded } = loaderSlice.actions;

const getLoaded = state => state.loader;

export const selectAppLoaded = createSelector([getLoaded], ({ started, finished, categories, groups, users, bankTransactions, expenses, merchants }) => {
  return { started, finished, categories, groups, users, bankTransactions, expenses, merchants };
});

export default loaderSlice.reducer;
