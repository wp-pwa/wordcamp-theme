import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import MenuHeader from './MenuHeader';
import MenuList from './MenuList';
import MenuNotifications from './MenuNotifications';

const Menu = ({ isOpen }) =>
  isOpen ? (
    <Container>
      <Overlay />
      <InnerContainer>
        <MenuHeader />
        <MenuList />
        <MenuNotifications />
      </InnerContainer>
    </Container>
  ) : null;

Menu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

export default inject(({ theme }) => ({
  isOpen: theme.menu.isOpen,
}))(Menu);

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
