import React from 'react';
import styled from 'react-emotion';
import NavItem from './NavItem';

const labels = ['on-now', 'up-next', 'schedule'];

const Nav = () => (
  <Container>{labels.map(label => <NavItem key={label} label={label} />)}</Container>
);

export default Nav;

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: ${({ theme }) => theme.size.button};
  display: flex;
  box-shadow: 0 -1px 0 0 ${({ theme }) => theme.color.grey};
  background-color: ${({ theme }) => theme.color.lightGrey};
`;
