import { useSelector, useDispatch } from 'react-redux';
import { selectSortedCategories, selectCategoriesById } from 'src/features/expense-group/categoriesSlice';
import { selectGroups } from 'src/features/expense-group/groupsSlice';
import { AddToGroup as AddToGroupComponent } from './AddToGroup';
import { createExpenseWithBankTransaction } from 'src/features/expense-group/expensesSlice';
import { selectCurrentUser } from 'src/features/expense-group/usersSlice';
import { selectExpensesById } from 'src/features/expense-group/expensesSlice';
import { selectMerchantsById } from 'src/features/bank-transactions/merchantsSlice';

export function AddToGroup(props) {
  const groups = useSelector(selectGroups);
  const categories = useSelector(selectSortedCategories);
  const categoriesById = useSelector(selectCategoriesById);
  const user = useSelector(selectCurrentUser);
  const merchantsById = useSelector(selectMerchantsById);
  const expensesById = useSelector(selectExpensesById);

  let expense = null;
  let category = null;
  let merchant = null;
  if (props.bankTransaction?.expenseId) {
    expense = expensesById[props.bankTransaction.expenseId];
    if (expense.categoryId) {
      category = categoriesById[expense.categoryId]
    }
  }

  if (props.bankTransaction) {
    merchant = merchantsById[props.bankTransaction.merchantId];
  }

  const dispatch = useDispatch();
  const createExpenseOnGroup = ({ groupId, categoryName, bankTransaction, description }) => dispatch(createExpenseWithBankTransaction({ userId: user.id, groupId, categoryName, bankTransactionId: bankTransaction.id, description }));
  return AddToGroupComponent({ ...props, expense, merchant, category, groups, categories, createExpenseOnGroup });
}
