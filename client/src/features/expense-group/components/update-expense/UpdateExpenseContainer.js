import { useDispatch, useSelector } from 'react-redux';
import { selectBankTransactionsById } from 'src/features/bank-transactions/bankTransactionsSlice';
import { selectSortedCategories } from 'src/features/expense-group/categoriesSlice';
import { createExpenseWithBankTransaction, updateCustomExpense } from 'src/features/expense-group/expensesSlice';
import { selectMerchantsById } from '../../../bank-transactions/merchantsSlice';
import { selectGroups } from '../../groupsSlice';
import { selectGroupUsersById } from '../../usersSlice';
import { UpdateExpense as UpdateExpenseComponent } from './UpdateExpense';

export function UpdateExpense(props) {
  const bankTransactions = useSelector(selectBankTransactionsById);
  const categories = useSelector(selectSortedCategories);
  const usersById = useSelector(selectGroupUsersById);
  const groups = useSelector(selectGroups);
  const merchants = useSelector(selectMerchantsById);
  const { expense } = props;
  let bankTransaction = null;
  let merchant = null;
  if (expense?.bankTransactionId) {
    bankTransaction = bankTransactions[expense.bankTransactionId];
    merchant = merchants[bankTransaction.merchantId];
  }
  
  const user = usersById[expense?.userId];

  const dispatch = useDispatch();
  const updateCustomExpenseOnGroup = ({ categoryName, description, groupId, userId, amount }) => dispatch(updateCustomExpense({ expenseId: expense?.id, amount, userId, groupId, categoryName, description }));
  const createExpenseOnGroup = ({ categoryName, description, groupId, userId }) => dispatch(createExpenseWithBankTransaction({ userId, groupId, categoryName, bankTransactionId: bankTransaction?.id, description }));
  return UpdateExpenseComponent({ ...props, user, usersById, groups, merchant, bankTransaction, categories, updateCustomExpenseOnGroup, createExpenseOnGroup });
}
