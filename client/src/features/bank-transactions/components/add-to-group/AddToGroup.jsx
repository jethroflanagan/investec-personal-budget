import { Form, Button, Typography, InputNumber, Drawer, AutoComplete, Select, Radio, Input, Row, Col, Divider } from 'antd';
import React, { useState } from 'react';
import { formatCurrency } from 'src/helpers/formatCurrency';
import { formatDate } from 'src/helpers/formatDate';

import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
const { Option } = Select;
const ExpenseInput = styled(InputNumber)`
  padding: 16px;
  width: 100%;
`;
// const ExpenseDrawer = styled(Drawer)`
//   width:100%;
// `;

const { Text } = Typography;

const RowLabel = styled(Text)`
  font-weight: 600;
`;

const DetailRow = styled(Row)`
  padding: 6px 0;
`;

export function AddToGroup({ visible, onClose, merchant, expense, category, bankTransaction, groups, categories, createExpenseOnGroup }) {
  // const amountText = <Text>{formatCurrency({ amount, decimals: 0, symbol: '' })}</Text>;
  const [form] = Form.useForm();
  const groupOptions = groups.map(c => ({ label: c.name, value: c.id }));
  const categoryOptions = categories.map(c => ({ id: c.id, value: c.name }));

  const onAddExpense = (values) => {
    const { description, categoryName, groupId } = values;
    // dispatch(addExpense);
    createExpenseOnGroup({ bankTransaction, description, categoryName, groupId });
    onClose();
  }
  useEffect(() => {
    if (visible) form.resetFields();
  }, [visible]);

  const title = bankTransaction?.group ? "Update expense" : "Add to group";

  return (
    <Drawer title={title}
      placement="right"
      visible={visible}
      closable={true}
      onClose={onClose}
      width="calc(100% - 40px)">
      <Form
        layout="vertical"
        form={form}
        initialValues={{
          groupId: bankTransaction?.group?.id,
          categoryName: category?.name,
          description: expense?.description || merchant?.name,
        }}
        onValuesChange={() =>{}}
        onFinish={onAddExpense}
      >
        <DetailRow gutter={16}>
          <Col span={6}>
            <RowLabel>Amount</RowLabel>
          </Col>
          <Col span={18}>
            <Text>{ formatCurrency({ amount: bankTransaction?.amount }) }</Text>
          </Col>
        </DetailRow>

        <DetailRow gutter={16}>
          <Col span={6}>
            <RowLabel>Merchant</RowLabel>
          </Col>
          <Col span={18}>
            <Text>{ bankTransaction?.merchant?.name }</Text><br/>
            <Text>{ bankTransaction?.merchant?.city }{ bankTransaction?.merchant?.countryCode ? ', ' + bankTransaction.merchant.countryCode : '' }</Text>
          </Col>
        </DetailRow>
        <Divider />
        {/* <Form.Item label="Amount">
          <Text>{ formatCurrency({ amount: bankTransaction?.amount }) }</Text>
        </Form.Item>        
        <Form.Item label="Merchant">
          <Text>{ bankTransaction?.merchant?.name }</Text><br/>
          <Text>{ bankTransaction?.merchant?.city }{ bankTransaction?.merchant?.countryCode ? ', ' + bankTransaction.merchant.countryCode : '' }</Text>
        </Form.Item>         */}
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
        <Button block type="primary" htmlType="submit" size="large">Add</Button>
      </Form>
    </Drawer>
  );
}
