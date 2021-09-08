import { Layout } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import colors from 'src/config/colors';
import styled from 'styled-components';
import { selectCurrentGroup } from '../expense-group/groupsSlice';
import AntIcon, { BankFilled, ProfileFilled } from '@ant-design/icons';

const Bar = styled.div`
  position: sticky;
  bottom: 0;
  display: flex;
  background: ${colors.accent1};
  z-index: 1;
`;

const Icon = styled(AntIcon)`
  opacity: ${ p => p.active ? 1 : .4 };
  transition: opacity .3s ease-out;
  svg {
    width: 24px;
    height: 24px;
  }
`;

const NavButton = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
  flex: 1;
  color: ${ p => p.active ? '#fff' : 'rgba(255,255,255,.4)' };
  font-size: 12px;
  &:not(:first-child) {
    border-left: 1px solid rgba(0,0,0,.2);
  }
  transition: color .3s ease-out;
`;

export const NavigationBarDisplay = ({ history }) => {
  const currentGroup = useSelector(selectCurrentGroup);
  const isActive = (id) => history.location.pathname.startsWith(`/${id}`);

  const items = [
    {
      id: 'group',
      name: 'Groups',
      icon: ProfileFilled,
      onClick: () => history.push(`/group/${currentGroup.id}`),
    },
    {
      id: 'bank',
      name: 'Bank',
      icon: BankFilled,
      onClick: () => history.push(`/bank`),
    },
  ].map(({ id, name, icon, onClick }) => {
    return (
      <NavButton key={id} onClick={onClick} active={isActive(id)}>
        <Icon component={icon} fill="#fff" active={isActive(id)} />
        { name }
      </NavButton>
    );
  });

  return (
    <Bar>
      { items }
    </Bar>
  );
}

export const NavigationBar = withRouter(NavigationBarDisplay);
