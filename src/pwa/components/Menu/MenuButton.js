import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';

const MenuButton = ({ openMenu }) => <Container onClick={openMenu}>Menu</Container>;

MenuButton.propTypes = {
  openMenu: PropTypes.func.isRequired,
};

export default inject(({ theme }) => ({
  openMenu: theme.menu.open,
}))(MenuButton);

const Container = styled.div`
  width: ${({ theme }) => theme.sizes.button};
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
