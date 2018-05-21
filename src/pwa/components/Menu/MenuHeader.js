import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import CloseIcon from '../CloseIcon';
import Logo from '../TopBar/Logo';

const MenuHeader = ({ close }) => (
  <Container>
    <InnerContainer>
      <Logo />
      <Title>Menu</Title>
    </InnerContainer>
    <CloseButton onClick={close}>
      <CloseIcon />
    </CloseButton>
  </Container>
);

MenuHeader.propTypes = {
  close: PropTypes.func.isRequired,
};

export default inject(({ theme }) => ({
  close: theme.menu.close,
}))(MenuHeader);

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: ${({ theme }) => theme.sizes.button};
  width: 100vw;
  display: flex;
  justify-content: space-between;
  background: #e9e9e6;
  color: #282409;
`;

const InnerContainer = styled.div`
  display: flex;
  align-items: center;
  height: ${({ theme }) => theme.sizes.button};
`;

const Title = styled.div`
  font-size: 16px;
  text-transform: uppercase;
`;

const CloseButton = styled.div`
  width: ${({ theme }) => theme.sizes.button};
  display: flex;
  justify-content: center;
  align-items: center;
`;
