import { Form, Button, Typography, InputNumber, Drawer, AutoComplete, Select, Radio, Input, Row, Col, Divider, Space } from 'antd';
import React, { useState } from 'react';
import { formatCurrency } from 'src/helpers/formatCurrency';
import { formatDate } from 'src/helpers/formatDate';
import colors from 'src/config/colors';

import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
const { Option } = Select;
const ExpenseInput = styled(InputNumber)`
  padding: 16px;
  width: 100%;
`;

const { Text } = Typography;

const RowLabel = styled(Text)`
  font-weight: 600;
`;

const DetailRow = styled(Row)`
  padding: 6px 0;
`;

const Actions = styled(Space)`
display: flex;
  & > * {
    flex: 1;
  }
`;

const SectionHeader = styled(Text)`
  margin-top: -11px;
  display: block;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 12px;
  color: ${colors.accent2};
  margin-bottom: 8px;
`;


export function UpdateExpense({ visible, onClose, expense, merchant, groups, user, usersById, categories, bankTransaction, updateCustomExpenseOnGroup, createExpenseOnGroup }) {
  const [form] = Form.useForm();
  const userOptions = Object.values(usersById).map(u => ({ label: u.firstName, value: u.id }));
  const groupOptions = groups.map(c => ({ label: c.name, value: c.id }));
  const categoryOptions = categories.map(c => ({ id: c.id, value: c.name }));

  const onUpdateExpense = (values) => {
    const { description, categoryName, groupId, amount } = values;
    
    if (bankTransaction) {
      createExpenseOnGroup({ description, categoryName, groupId, userId: values.userId ?? user.id });
    }
    else {
      updateCustomExpenseOnGroup({ amount, description, categoryName, groupId, userId: values.userId ?? user.id });
    }
    onClose();
  }

  useEffect(() => {
    if (visible) form.resetFields();
  }, [visible]);
  
  return (
    <Drawer title="Expense details"
      placement="right"
      visible={visible}
      closable={true}
      onClose={onClose}
      width="calc(100% - 40px)">
        <Form
          layout="vertical"
          form={form}
          initialValues={{
            amount: expense?.amount,
            userId: expense?.userId,
            groupId: expense?.groupId,
            categoryName: expense?.category?.name,
            description: expense?.description,
          }}
          onValuesChange={() =>{}}
          onFinish={onUpdateExpense}
        >
          { bankTransaction ? (<>
            <SectionHeader>Related transaction</SectionHeader>
            <DetailRow gutter={16}>
              <Col span={6}>
                <RowLabel>Amount</RowLabel>
              </Col>
              <Col span={18}>
                <Text>{ formatCurrency({ amount: expense?.amount, symbol: 'R' }) }</Text>
              </Col>
            </DetailRow>

            <DetailRow gutter={16}>
              <Col span={6}>
                <RowLabel>Paid by</RowLabel>
              </Col>
              <Col span={18}>
                <Text>{ user?.name }</Text><br/>
              </Col>
            </DetailRow>
            <DetailRow gutter={16}>
              <Col span={6}>
                <RowLabel>Merchant</RowLabel>
              </Col>
              <Col span={18}>
                <Text>{ merchant?.name }</Text><br/>
                <Text>{ merchant?.city }{ merchant?.countryCode ? ', ' + merchant?.countryCode : '' }</Text>
              </Col>
            </DetailRow>
            <DetailRow gutter={16}>
              <Col span={6}>
                <RowLabel>Date</RowLabel>
              </Col>
              <Col span={18}>
                <Text>{ bankTransaction?.updatedAt }</Text>
              </Col>
            </DetailRow>
            <Divider dashed />
            <SectionHeader>Update</SectionHeader>
          </>): null }

          { bankTransaction == null 
          ? ( 
            <Form.Item label="Amount" name="amount">
              <Input />
            </Form.Item>
          ): null }
          { bankTransaction == null 
          ? ( 
            <Form.Item label="Paid by" name="userId" >
              <Radio.Group
                buttonStyle="solid">
                { userOptions.map(option => <Radio.Button value={option.value}>{ option.label }</Radio.Button>) }
              </Radio.Group>
            </Form.Item>
          ) : null }
          <Form.Item label="Group" name="groupId" >
            <Radio.Group
              buttonStyle="solid">
              { groupOptions.map(option => <Radio.Button value={option.value}>{ option.label }</Radio.Button>) }
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Category" name="categoryName">
            <AutoComplete
              style={{ width: '100%' }}
              options={categoryOptions}
              placeholder=""
              filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
              }
            />
          </Form.Item>
          <Form.Item label="Description (optional)" name="description">
            <Input />
          </Form.Item>
          <Actions>
            <Button block danger size="large">Delete</Button>
            <Button block type="primary" htmlType="submit" size="large">Update</Button>
          </Actions>
        </Form>
    </Drawer>
  );
}
