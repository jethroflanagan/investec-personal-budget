import { CheckOutlined, LoadingOutlined } from '@ant-design/icons';
import { Space, Spin } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchAllCategories } from 'src/features/expense-group/categoriesSlice';
import { fetchAllGroups } from 'src/features/expense-group/groupsSlice';
import { fetchAllUsers } from 'src/features/expense-group/usersSlice';
import styled from 'styled-components';
import { selectAppLoaded, setAppLoaded } from './loaderSlice';
import { selectCurrentGroup } from 'src/features/expense-group/groupsSlice';
import { fetchAllBankTransactions } from 'src/features/bank-transactions/bankTransactionsSlice';
import { fetchAllExpenses } from 'src/features/expense-group/expensesSlice';
import { fetchAllMerchants } from 'src/features/bank-transactions/merchantsSlice';

const LoadingScreen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const Spinner = () => {
  const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
  return <Spin indicator={loadingIcon} />
};

const LoadStatus = ({ isLoaded, name }) => (
  <Space direction="horizontal">
    { isLoaded ? <CheckOutlined style={{ fontSize: 24 }} /> : <Spinner /> } 
    { name }
  </Space>
);

const LoaderDisplay = (props) => {
  const dispatch = useDispatch();
  const { started, finished, groups, users, categories, expenses, bankTransactions, merchants } = useSelector(selectAppLoaded);
  const currentGroup = useSelector(selectCurrentGroup);

  useEffect(() => {

    if (!started) {
      dispatch(fetchAllUsers());
      dispatch(fetchAllGroups());
      dispatch(fetchAllCategories());
      dispatch(fetchAllMerchants());
      dispatch(fetchAllExpenses());
      dispatch(fetchAllBankTransactions());
      dispatch(setAppLoaded('started'));
    }
    if (groups && users && categories && expenses && bankTransactions && merchants) {
      dispatch(setAppLoaded('finished'));
      if (props.history.location.pathname === '/') {
        props.history.push(`/group/${currentGroup.id}`);
      }
    }
  })

  return <LoadingScreen>
    <Space direction="vertical">
      <LoadStatus name="Groups" isLoaded={groups} />
      <LoadStatus name="Users" isLoaded={users} />
      <LoadStatus name="Categories" isLoaded={categories} />
      <LoadStatus name="Merchants" isLoaded={merchants} />
      <LoadStatus name="Expenses" isLoaded={expenses} />
      <LoadStatus name="Transactions" isLoaded={bankTransactions} />
    </Space>
  </LoadingScreen>
}

export const Loader = withRouter(LoaderDisplay);
