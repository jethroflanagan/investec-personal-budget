import { Button, Layout, List } from 'antd';
import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { BankTransaction } from './components/BankTransaction';
import { AddToGroup } from './components/add-to-group/AddToGroupContainer';
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

export const BankTransactionsDisplay = ({ bankTransactions, merchants, history }) => {
  const [currentBankTransaction, setCurrentTransaction] = useState(null);

  const showAddToGroup = (item) => {
    setCurrentTransaction(item);  
  };

  const closeDrawer = () => {
    setCurrentTransaction(null);
  };

  return (<>
    <Layout>
      <Content>
        <List itemLayout='horizontal'
          dataSource={bankTransactions}
          renderItem={item => (
            <BankTransaction {...item} onClick={() => showAddToGroup(item)} active={currentBankTransaction === item}/>
          )}
        />
      </Content>
    </Layout>
    <AddToGroup bankTransaction={currentBankTransaction} visible={currentBankTransaction != null} onClose={closeDrawer} />
  </>);
}

export const BankTransactions = withRouter(BankTransactionsDisplay);
