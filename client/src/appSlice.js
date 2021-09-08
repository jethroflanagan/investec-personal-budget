import { createSlice, createSelector } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    currentGroupId: 1,
    currentUserId: 1,
  },
  reducers: {
    setCurrentGroupId: (state, action) => {
      state.currentGroupId = action.payload.groupId;
    },
  },
});

export const getCurrentGroupId = state => state.app.currentGroupId;
export const getCurrentUserId = state => state.app.currentUserId;

// export const selectApp = createSelector([getCurrentGroupId, getCurrentUserId], (currentGroupId, currentUserId) => ({ currentGroupId, currentUserId }));

export const { setCurrentGroupId } = appSlice.actions;


export default appSlice.reducer;
