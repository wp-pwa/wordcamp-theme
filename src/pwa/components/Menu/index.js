import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import MenuHeader from './MenuHeader';
import MenuList from './MenuList';
import MenuNotifications from './MenuNotifications';
import MenuLinks from './MenuLinks';

const Menu = ({ isOpen, close }) => (
  <Container isOpen={isOpen}>
    <Overlay onClick={close} onTouchMove={close} isOpen={isOpen} />
    <InnerContainer isOpen={isOpen}>
      <MenuList />
      <MenuNotifications />
      <MenuLinks />
    </InnerContainer>
    <MenuHeader />
  </Container>
);

Menu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default inject(({ theme }) => ({
  isOpen: theme.menu.isOpen,
  close: theme.menu.close,
}))(Menu);

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  color: ${({ theme }) => theme.color.text};
  z-index: 100;
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transition: ${({ isOpen }) => (isOpen ? '' : 'visibility 0s ease-in 150ms')};
`;

const Overlay = styled.div`
  filter: ${({ isOpen }) => (isOpen ? 'opacity(50%)' : 'opacity(0%)')};
  transition: filter 150ms ease;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.color.black};
`;

const InnerContainer = styled.div`
  width: 100%;
  position: absolute;
  top: ${({ theme }) => theme.size.button};
  left: 0;
  background-color: #fff;
  transform: ${({ isOpen }) => (isOpen ? 'translateY(0%)' : 'translateY(-100%)')};
  transition: transform 150ms ease-out;
`;
