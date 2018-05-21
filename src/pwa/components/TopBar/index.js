import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import MenuButton from '../Menu/MenuButton';
import CloseButton from './CloseButton';

const TopBar = ({ contextName }) => (
  <Container>{contextName === 'home' ? <MenuButton /> : <CloseButton />}</Container>
);

TopBar.propTypes = {
  contextName: PropTypes.string.isRequired,
};

export default inject(({ connection }) => ({
  contextName: connection.selectedContext.options.name,
}))(TopBar);

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: ${({ theme }) => theme.sizes.button};
  width: 100vw;
  display: flex;
  justify-content: flex-end;
  background: #e9e9e6;
`;
