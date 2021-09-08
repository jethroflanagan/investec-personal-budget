import React from 'react';
import { List, Avatar, Typography, Tag } from 'antd';
import { formatCurrency } from 'src/helpers/formatCurrency';
import colors from 'src/config/colors';
import { transparentize } from 'polished';
import styled from 'styled-components';

const { Text } = Typography;

const ListItem = styled(List.Item)`
  padding: 16px;
  background-color: ${p => p.active ? transparentize(0.3, colors.accent2) : 'transparent'};
  transition: background-color .3s ease-out;
`;

export function Expense(props) {
  const { active, user, category, amount, description, bankTransaction } = props;
  let tag = null;
  if (bankTransaction) {
    tag = <Tag color={colors.accent1}>Bank</Tag>
  }
  return (<ListItem {...props} active={active}>
    <List.Item.Meta
      avatar={<Avatar src={user.avatar} size={40} />}
      title={category.name}
      description={[tag, description]}
      />
    <Text>{formatCurrency({ amount: amount })}</Text>
  </ListItem>)
}
