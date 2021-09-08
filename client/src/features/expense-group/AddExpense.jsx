import { blue } from '@ant-design/colors';
import { AutoComplete, Button, Form, InputNumber, Layout, Select } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { selectSortedCategories } from './categoriesSlice';
import { selectGroupUsers } from './usersSlice';
// import { addExpense } from './expensesSlice';

const { Header: AntHeader, Content: AntContent } = Layout;
const { Option } = Select;

const Header = styled(AntHeader)`
  background: ${blue.primary};
  color: #fff;
`;

const Content = styled(AntContent)`
  background: #fff;
`;

const ExpenseInput = styled(InputNumber)`
  padding: 16px;
  width: 100%;
`;

const PaidBy = styled.div`
  padding: 16px;
`;

export function AddExpense() {
  const users = useSelector(selectGroupUsers);
  const categories = useSelector(selectSortedCategories);
  const [user, setUser] = useState(users[0]);
  const dispatch = useDispatch();

  const onChangeUser = (value) => {
    setUser(users.find(user => user.id === value));
  }
  const onAddExpense = (e) => {
    // setUser(users.find(user => user.id === value));
  }

  const options = categories.map(c => ({ id: c.id, value: c.name }));

  const [form] = Form.useForm();
  let history = useHistory();

  const onFinish = values => {
    const { amount, paidBy, category } = values;

    // dispatch(addExpense({
    //   title: category,
    //   paidIds: [paidBy],
    //   // tags: ['essential'],
    //   expense: {
    //     amount,
    //     ref: null,
    //     date: +moment(),
    //   },
    // }));

    history.push('/');    
  };

  return (
    <Layout className="expense-group">
      <Header className="header">Add expense</Header>
      <Content className="content">
        <Form
          layout='vertical'
          form={form}
          initialValues={{ paidBy: user.id }}
          onValuesChange={() =>{}}
          onFinish={onFinish}
        >
          <Form.Item label="Paid by" name="paidBy" >
            <Select onChange={onChangeUser}>
              {users.map(user => (
                <Option value={user.id} key={user.id}>{user.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Cost" name="amount">
            <ExpenseInput size="large" />
          </Form.Item>
          <Form.Item label="Category" name="category">
            <AutoComplete
              style={{ width: 200 }}
              options={options}
              placeholder=""
              filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
              }
            />
          </Form.Item>
          <Button type="primary" htmlType="submit" size="large" onClick={onAddExpense}>Add</Button>
        </Form>
      </Content>
    </Layout>
  )
}
