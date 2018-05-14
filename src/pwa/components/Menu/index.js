import React from 'react';
import styled from 'react-emotion';
import MenuHeader from './MenuHeader';
import MenuList from './MenuList';
import MenuNotifications from './MenuNotifications';

const Menu = () => (
  <Container>
    <Overlay />
    <InnerContainer>
      <MenuHeader />
      <MenuList />
      <MenuNotifications />
    </InnerContainer>
  </Container>
);

export default Menu;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
`;

const Overlay = styled.div`
  width: 100%;
  height: 100%;
`;

const InnerContainer = styled.div`
  min-width: 65vw;
  position: absolute;
  bottom: ${({ theme }) => theme.sizes.button};
  right: 0;
  background-color: #eeeeee;
`;
