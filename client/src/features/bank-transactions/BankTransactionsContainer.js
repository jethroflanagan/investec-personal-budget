import { useDispatch, useSelector } from 'react-redux';
import { BankTransactions as BankTransactionsComponent } from './BankTransactions';
import { selectBankTransactions } from './bankTransactionsSlice';
import { selectMerchantsById } from './merchantsSlice';

export function BankTransactions() {
  const bankTransactions = useSelector(selectBankTransactions);
  const merchantsById = useSelector(selectMerchantsById);
  const dispatch = useDispatch();

  return BankTransactionsComponent({ bankTransactions, merchantsById });
}
