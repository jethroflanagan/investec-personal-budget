import { createSelector, createSlice } from '@reduxjs/toolkit';
import { selectBankTransactionsById, fetchAllBankTransactions } from '../bank-transactions/bankTransactionsSlice';
import { getCategories, fetchAllCategories } from './categoriesSlice';
import { selectCurrentGroup, selectGroupsById, fetchAllGroups, fetchGroup } from './groupsSlice';
import { getUsers } from './usersSlice';
import { api } from 'src/features/api/ApiService';
import { setAppLoaded } from 'src/features/loader/loaderSlice';
import moment from 'moment';

const expenseFromApi = ({ id, userId, amount, description, groupId, categoryId, investecTransactionId, date}) => ({
  id,
  userId,
  amount,
  description,
  groupId,
  categoryId,
  bankTransactionId: investecTransactionId,
  date: +moment(date),
})

export const expensesSlice = createSlice({
  name: 'expenses',
  initialState: {
    byId: {},
    order: [],
  }, 
  reducers: {
    setExpenses: (state, action) => {
      const { expenses } = action.payload;
      state.byId = {};
      state.order = [];
      expenses.forEach((data) => {
        state.byId[data.id] = expenseFromApi(data);
        state.order.push(data.id);
      });
    },    

    updateExpenses: (state, action) => {
      const { expenses } = action.payload;
      expenses.forEach(data => {
        state.byId[data.id] = expenseFromApi(data);

        let orderIndex = 0;
        for (orderIndex = state.order.length - 1; orderIndex >= 0; orderIndex--) {
          if (data.date > state.byId[state.order[orderIndex]].date) {
            break;
          }
        }
        state.order.splice(orderIndex, 0, data.id);
      });
    },
  },
});

export const { setExpenses } = expensesSlice.actions;

export const getExpenses = (state) => state.expenses.byId;

export const getExpensesOrder = (state) => state.expenses.order;

export const selectExpenseIds = createSelector([getExpensesOrder], (ids) => ids);

export const createExpenseWithBankTransaction = (payload) => async dispatch => {
  const { userId, bankTransactionId, description, categoryName, groupId } = payload;
  const expense = await api.createExpenseWithBankTransaction({
    userId, 
    investecTransactionId: bankTransactionId, 
    description, 
    categoryName, 
    groupId,
  });

  // TODO: only fetch latest
  dispatch(fetchAllBankTransactions());
  dispatch(fetchAllCategories());
  dispatch(fetchAllExpenses());
  dispatch(fetchGroup(groupId));
}

export const updateCustomExpense = (payload) => async dispatch => {
  const { expenseId, amount, userId, description, categoryName, groupId } = payload;
  const expense = await api.updateCustomExpense({
    expenseId,
    userId, 
    amount,
    description, 
    categoryName, 
    groupId,
  });

  // TODO: only fetch latest
  dispatch(fetchAllBankTransactions());
  dispatch(fetchAllCategories());
  dispatch(fetchAllExpenses());
  dispatch(fetchGroup(groupId));
}

export const fetchAllExpenses = () => async dispatch => {
  const expenses = await api.getAllExpenses();

  dispatch(setExpenses({ expenses }));
  dispatch(setAppLoaded('expenses'));
}

export const selectExpensesById = createSelector([getExpenses], (expenses) => {
  return expenses;
});

export const selectGroupExpenses = createSelector([selectExpenseIds, selectExpensesById, getExpensesOrder, selectCurrentGroup], 
                                                  (expenseIds,       expenses,           order,            group) => {
  // use IDs to get array, then filter out false (non-valid) expenses
  return (
    expenseIds
      .map(expenseId => {
        const expense = expenses[expenseId];
        if (expense.groupId != group.id) {
          return false;
        }
        return expense;
      })
      .filter(v => v)
      .sort((a, b) => {
        return order.indexOf(a.id) - order.indexOf(b.id)
      })
  );
});


export default expensesSlice.reducer;
