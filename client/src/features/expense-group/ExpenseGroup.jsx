import { Layout, List, PageHeader, Button } from 'antd';
import React from 'react';
import { Expense } from './components/Expense';
import styled from 'styled-components';
import { GroupHeader } from './components/group-header/GroupHeaderContainer';
import { PlusOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { UpdateExpense } from './components/update-expense/UpdateExpenseContainer';
import { useState } from 'react';

const { Header: AntHeader, Content: AntContent } = Layout;


const Content = styled(AntContent)`
  background: #fff;
`;

const AddExpenseButton = styled(Button)`
  position: fixed;
  bottom: 20px;
  right: 20px;
`;

export const ExpenseGroupDisplay = ({ usersById, categoriesById, expenses, group, groups,totalsByUserId, bankTransactionsById }) => {
  const [currentExpense, setCurrentExpense] = useState(null);

  const showUpdateExpense = (item) => {
    setCurrentExpense(item);  
  };

  const closeDrawer = () => {
    setCurrentExpense(null);
  };

  return (
    <Layout className="expense-group">
      <GroupHeader name={group?.name} groups={groups} totalsByUserId={totalsByUserId} usersById={usersById} />
      <Content className="content">
        <List itemLayout='horizontal'
          dataSource={expenses}
          renderItem={item => {
            const expense = {
              ...item,
              category: categoriesById[item.categoryId], 
              user: usersById[item.userId],
              bankTransaction: bankTransactionsById[item.bankTransactionId],
            };
            return (
              <Expense {...expense}
                onClick={() => showUpdateExpense(expense)} 
                active={currentExpense === expense}
              />
            )
          }}
        />
      </Content>
      <AddExpenseButton type="primary" shape="circle" icon={<PlusOutlined />} size="large" onClick={showUpdateExpense} />
      <UpdateExpense expense={currentExpense} visible={currentExpense != null} onClose={closeDrawer} />
    </Layout>
  );
}

export const ExpenseGroup = withRouter(ExpenseGroupDisplay);
