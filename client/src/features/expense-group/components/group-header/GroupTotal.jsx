import { Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { formatCurrency } from 'src/helpers/formatCurrency';
import colors from 'src/config/colors';
const { Text } = Typography;

const Circle = styled.div`
  width: ${p => p.size}px;
  padding: 10px;
  height: ${p => p.size}px;
  border-radius: ${p => p.size}px;
  background: ${colors.accent2};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #fff;
`;

const Name = styled(Text)`
  color: rgba(255,255,255,.9);
  font-weight: 600;
`;

const Amount = styled(Text)`
  font-size: 16px;
  /* color: rgba(0,0,0,.9); */
  color: rgba(255,255,255,1);
  margin-top: -6px;
`;

const Initial = styled(Text)`
  font-weight: 600;
  font-size: 16px;
  color: rgba(255,255,255,.9);
`;

export function GroupTotal({ user, total, small }) {
  let size = total > 0 ? 100 : 50;
  let fontScale = 1;
  if (small) {
    size *= 0.5;
    fontScale = 0.8;
  }
  return (<>
    <Circle size={size}>
      { small 
      ? <Initial>{ user.firstName.charAt(0) }</Initial>
      : (<>
          <Name>{user.firstName}</Name>
          <Amount strong>{formatCurrency({ amount: total, decimals: 0, symbol: '' })}</Amount>
        </>)
      }
    </Circle>
  </>)
}
