import { configureStore } from '@reduxjs/toolkit';
import usersReducer from 'src/features/expense-group/usersSlice';
import groupsReducer from 'src/features/expense-group/groupsSlice';
import expensesReducer from 'src/features/expense-group/expensesSlice';
import categoriesReducer from 'src/features/expense-group/categoriesSlice';
import loaderReducer from 'src/features/loader/loaderSlice';
import bankTransactionsReducer from 'src/features/bank-transactions/bankTransactionsSlice';
import merchantsReducer from 'src/features/bank-transactions/merchantsSlice';
import appReducer from 'src/appSlice';

export default configureStore({
  reducer: {
    app: appReducer,
    loader: loaderReducer,
    users: usersReducer,
    groups: groupsReducer,
    expenses: expensesReducer,
    categories: categoriesReducer,
    bankTransactions: bankTransactionsReducer,
    merchants: merchantsReducer,
  },
  devTools: true,
});
