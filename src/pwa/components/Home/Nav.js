import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import NavItem from './NavItem';

const labels = ['on-now', 'up-next', 'schedule'];

const Nav = ({ openMenu }) => (
  <Container>
    {labels.map(label => <NavItem key={label} label={label} />)}
    <MenuButton onClick={openMenu}>Menu</MenuButton>
  </Container>
);

Nav.propTypes = {
  openMenu: PropTypes.func.isRequired,
};

export default inject(({ theme }) => ({
  openMenu: theme.menu.open,
}))(Nav);

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: ${({ theme }) => theme.sizes.button};
  background: orange;
  display: flex;
`;

const MenuButton = styled.div`
  width: ${({ theme }) => theme.sizes.button};
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
