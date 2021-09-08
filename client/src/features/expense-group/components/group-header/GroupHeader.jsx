import React from 'react';
import styled from 'styled-components';
import { GroupTotal } from './GroupTotal';
import colors from 'src/config/colors';
import { Typography, Space, Dropdown, Menu } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';

const { Title, Text } = Typography;

const Content = styled.div`
  padding: 10px 20px;
  background: ${colors.accent4};
  display: flex;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
  justify-content: space-between;
  height: ${p => p.size}px;
`;

const GroupTitle = styled(Text)`
  color: rgba(0,0,0,.8);
  font-size: 20px;
  font-weight: 600;
  line-height: 32px;
  margin-right: 20px;
  cursor: pointer;
`;

const Placeholder = styled.div`
  height: 120px;
`;
const Left = styled(Space)`
  display: flex;
  align-items: center;
`;
const Right = styled(Space)`
  display: flex;
  align-items: flex-end;
`;

const ShouldPay = styled(Text)`
  font-size: 15px;
  font-weight: 600;
  line-height: 32px;
  color: ${colors.positiveDark};
  overflow: hidden;
  width: 0;
`;

const groupMenuList = ({ groups, changeGroup }) => {
  return (
    <Menu>
      { groups.map(group => (
        <Menu.Item key={group.id} onClick={() => changeGroup(group.id)}>
          { group.name }
        </Menu.Item>
      ))}
    </Menu>
  );
}


export const GroupHeaderDisplay = ({ name, groups, totalsByUserId, usersById, changeGroup }) => {
  const totals = Object.values(totalsByUserId).map(t => t);
  const maxTotal = totals.reduce((max, t) => Math.max(max, t.total), 0);
  const [isReduced, setReduced] = useState(false);
  const [size, setHeight] = useState(120);

  const groupTotals = (
    totals
      .sort((a, b) => b.total - a.total)
      .map(({ userId, total }) => <GroupTotal key={userId} user={usersById[userId]} total={maxTotal - total} small={isReduced} />)
  );


  const onScroll = (e) => {
    setReduced(window.scrollY > 60);
    setHeight(Math.max(60, 120 - window.scrollY));
  }

  useEffect(() => {
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [window.scrollY]);

  return (<>
    <Placeholder/>
    <Content size={size}>
      <Left>
        {/* <GroupTitle level={3}>{name}</GroupTitle> */}
        <Dropdown overlay={groupMenuList({ groups, changeGroup })} trigger={['click']}>
          <GroupTitle onClick={e => e.preventDefault()}>
            {name} <DownOutlined />
          </GroupTitle>
        </Dropdown>,
      </Left>
      <Right>
        { groupTotals }
      </Right>
    </Content>
  </>);
};

export const GroupHeader = withRouter(GroupHeaderDisplay);
