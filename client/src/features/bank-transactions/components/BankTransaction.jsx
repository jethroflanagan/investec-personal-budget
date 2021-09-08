import { List, Typography, Tag, Button } from 'antd';
import React from 'react';
import { formatCurrency } from 'src/helpers/formatCurrency';
import { formatDate } from 'src/helpers/formatDate';
import styled from 'styled-components';
import colors from 'src/config/colors';
import { transparentize } from 'polished';

const ListItem = styled(List.Item)`
  padding: 16px;
  background-color: ${p => p.active ? transparentize(0.3, colors.accent2) : 'transparent'};
  transition: background-color .3s ease-out;
`;

const { Text } = Typography;

export function BankTransaction(props) {
  const { merchant, amount, id, currencyCode, group, date, tags, expense, active } = props;
  const amountText = <Text>{formatCurrency({ amount, decimals: 0, symbol: '' })}</Text>;
  const extras = [amountText];
  let groupTag = null;
  if (group) {
    groupTag = <Tag color={group.color}>{ group.name }</Tag>;
    // extras.unshift(groupTag);
  }
  return (
    <ListItem {...props} 
      extra={extras}
      actions={
        {/*[<Button type="primary">Add to group</Button>]*/}
      }
      active={active}>
      <List.Item.Meta
        title={merchant.name}
        description={[groupTag, formatDate(date)]}
        />
      
    </ListItem>
  );
}
