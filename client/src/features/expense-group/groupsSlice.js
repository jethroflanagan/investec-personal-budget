import { createSlice, createSelector } from '@reduxjs/toolkit';
import { getCurrentGroupId } from 'src/appSlice';
import { selectGroupUsers } from './usersSlice';
import { api } from 'src/features/api/ApiService';
import { setAppLoaded } from 'src/features/loader/loaderSlice';
import { setExpenses } from './expensesSlice';
import { setBankTransactions } from 'src/features/bank-transactions/bankTransactionsSlice';

const groupFromApi = ({ name, id, totalsByUserId, expenses, color, loader }) => ({
  id,
  name,
  totalsByUserId: totalsByUserId ?? {},
  expenseIds: expenses,
  color,
  loader,
});

export const groupsSlice = createSlice({
  name: 'groups',
  initialState: {
    byId: {},
  },
  reducers: {
    setGroups(state, action) {
      const { groups } = action.payload;
      state.byId = {};
      groups.forEach((group) => state.byId[group.id] = groupFromApi({ ...group, loader: 'start' }));
    },
  
    updateGroups(state, action) {
      const { groups } = action.payload;
      groups.map((group) => state.byId[group.id] = groupFromApi({
        ...group,
        loader: state.byId[group.id].loader,
      }));
    },
    
    updateGroupTotals(state, action) {
      const { id, totals } = action.payload;
      const group = state.byId[id];
      
      totals.forEach(({ user, total }) => {
        const userId = user.id;
        group.totalsByUserId[userId] = { userId, total };
      });
    },

    setLoading(state, action) {
      const { groupId, loader } = action.payload;
      state.byId[groupId].loader = loader;
    },
  },
});

const { setGroups, updateGroups, updateGroupTotals, setLoading } = groupsSlice.actions;

export const fetchAllGroups = () => async dispatch => {
  const groups = await api.getAllGroups();

  dispatch(setGroups({ groups }));
  dispatch(setAppLoaded('groups'));
}

export const fetchGroup = (id) => async dispatch => {
  dispatch(setLoading({ groupId: id, loader: 'loading' }));
  
  const group = await api.getGroup(id);
  dispatch(updateGroups({ groups: [group] }));
  dispatch(updateGroupTotals(group));

  dispatch(setLoading({ groupId: id, loader: 'finished' }));
}

const getGroups = state => state.groups.byId;

export const selectGroupsById = createSelector([getGroups], (groups) => groups);
export const selectGroups = createSelector([getGroups], (groups) => Object.keys(groups).map(id => groups[id]));

export const selectCurrentGroup = createSelector([selectGroupsById, getCurrentGroupId], (groups, groupId) => {
  return groups[groupId];
});
export const selectTotals = createSelector([selectCurrentGroup, selectGroupUsers], (group, users) => {
  // const totals = users.map(user => {
  //   if (group.totalsByUserId.hasOwnProperty(user.id)) {
  //     return { user, total: group.totalsByUserId[user.id] }
  //   }
  //   return { user, total: 0 }
  // });
  return group.totalsByUserId;
});


export default groupsSlice.reducer;
