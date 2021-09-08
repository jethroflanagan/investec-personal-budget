import { createSlice, createSelector } from '@reduxjs/toolkit';
import { getCurrentUserId, getCurrentGroupId } from 'src/appSlice';
import { api } from 'src/features/api/ApiService';
import { setAppLoaded } from 'src/features/loader/loaderSlice';

export const usersSlice = createSlice({
  name: 'users',
  initialState: {},
  reducers: {
    setUsers(state, action) {
      action.payload.map((user) => state[user.id] = user)
    }
  },
});

const { setUsers } = usersSlice.actions;

export const fetchAllUsers = () => async dispatch => {
  const users = await api.getAllUsers();

  const payload = users.map(data => {
    const { name, firstName, lastName, groups, id, avatar } = data;
    return {
      name,
      firstName, 
      lastName,
      groupIds: groups.map(groupId => groupId),
      id,
      avatar: process.env.REACT_APP_SERVER_URL + avatar,
    };
  })

  dispatch(setUsers(payload));
  dispatch(setAppLoaded('users'));
}

export const getUsers = state => {
  return state.users;
}

export const selectAllUserIds = createSelector([getUsers], (users) => Object.keys(users));

export const selectGroupUsers = createSelector([getUsers, selectAllUserIds, getCurrentGroupId], (users, userIds, groupId) => {
  return userIds.map(userId => {
    const user = users[userId];
    return user.groupIds.includes(groupId) ? user: false;
  }).filter(v => v);
});

export const selectGroupUsersById = createSelector([selectGroupUsers, selectAllUserIds, getCurrentGroupId], (users, userIds, groupId) => {
  const list = {};
  users.forEach(user => list[user.id] = user);
  return list;
});

export const selectCurrentUser = createSelector([getCurrentUserId, getUsers], (userId, users) => {
  return users[userId];
});

export default usersSlice.reducer;
