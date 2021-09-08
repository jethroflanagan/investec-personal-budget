import { createSlice, createSelector } from '@reduxjs/toolkit';
import { api } from 'src/features/api/ApiService';
import { setAppLoaded } from 'src/features/loader/loaderSlice';
import { getUsers } from 'src/features/expense-group/usersSlice';
import { selectMerchantsById } from './merchantsSlice';
import { selectExpensesById } from '../expense-group/expensesSlice';
import { selectGroupsById } from '../expense-group/groupsSlice';
import { selectSortedCategories, getCategories } from '../expense-group/categoriesSlice';

export const bankTransactionsSlice = createSlice({
  name: 'bankTransactions',
  initialState: {
    byId: {},
    order: [],
  },
  reducers: {
    setBankTransactions(state, action) {
      const { bankTransactions } = action.payload;
      state.byId = {};
      state.order = [];
      bankTransactions.forEach(bankTransaction => {
        state.byId[bankTransaction.id] = bankTransaction;
        state.order.push(bankTransaction.id);
      });
    },
  },
});

export const { setBankTransactions } = bankTransactionsSlice.actions;

export const fetchAllBankTransactions = () => async dispatch => {
  // dispatch(setAppLoaded('bankTransactions'));

  const bankTransactions = await api.getAllBankTransactions();

  const payload = { bankTransactions };

  dispatch(setBankTransactions(payload));
  dispatch(setAppLoaded('bankTransactions'));
}

export const getBankTransactions = (state) => state.bankTransactions.byId;
export const getBankTransactionsOrder = (state) => state.bankTransactions.order;
export const getBankTransactionsLoader = (state) => state.bankTransactions.loader;

export const selectLoader = createSelector([getBankTransactionsLoader], (loader) => loader);

export const selectBankTransactionIds = createSelector([getBankTransactions], (bankTransactions) => Object.keys(bankTransactions));
export const selectBankTransactionsById = createSelector([getBankTransactions], (bankTransactions) => bankTransactions);

export const selectBankTransactions = createSelector([selectBankTransactionIds, getBankTransactions, getBankTransactionsOrder, getUsers, selectMerchantsById, selectGroupsById, getCategories], 
                                                     (bankTransactionIds,       bankTransactions,    order,                    users,    merchants,           groups,           categories) => {
  // use IDs to get array, then filter out false (non-valid) bankTransactions
  return (
    bankTransactionIds
      .map(transactionId => {
        const data = bankTransactions[transactionId];

        const { id, userId, merchantId, currencyCode, amount, updatedAt, expenseId, groupId } = data;

        // const populatedExpense = expense ? {
        //   ...expense,
        //   category: categories[expense.categoryId],
        // } : {} 
        // TODO: fix this to be relational like the others
        const bankTransaction = {
          id,
          user: users[userId],
          merchantId,
          merchant: merchants[merchantId],
          currencyCode,
          amount,
          group: groups[groupId],
          date: updatedAt,
          expenseId,
        } 
        return bankTransaction;
      })
      .filter(v => v)
      .sort((a, b) => {
        return order.indexOf(a.id) - order.indexOf(b.id)
      })
  );
});

export default bankTransactionsSlice.reducer;
