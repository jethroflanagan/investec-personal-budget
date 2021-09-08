import { useSelector, useDispatch } from 'react-redux';
import { ExpenseGroup as ExpenseGroupComponent } from './ExpenseGroup';
import { selectGroupExpenses } from './expensesSlice';
import { selectCurrentGroup, selectTotals, fetchGroup, selectGroups } from './groupsSlice';
import { selectGroupUsersById } from './usersSlice';
import { selectBankTransactionIds } from '../bank-transactions/bankTransactionsSlice';
import { selectCategoriesById } from './categoriesSlice';

export function ExpenseGroup() {
  const usersById = useSelector(selectGroupUsersById);
  const expenses = useSelector(selectGroupExpenses);
  const categoriesById = useSelector(selectCategoriesById);
  const bankTransactionsById = useSelector(selectBankTransactionIds);
  const groups = useSelector(selectGroups);
  const group = useSelector(selectCurrentGroup);
  const totalsByUserId = useSelector(selectTotals);

  const dispatch = useDispatch();

  if (group.loader === 'start') {
    dispatch(fetchGroup(group.id));
  }
  
  if (group.loader !== 'finished') {
    return null;
  }

  return ExpenseGroupComponent({ usersById, expenses, group, groups, totalsByUserId, bankTransactionsById, categoriesById });
}
