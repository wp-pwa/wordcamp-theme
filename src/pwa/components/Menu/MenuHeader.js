import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';

const MenuHeader = ({ close }) => (
  <Container>
    <Title>WordCamp Europe 2018</Title>
    <Close onClick={close}>Close</Close>
  </Container>
);

MenuHeader.propTypes = {
  close: PropTypes.func.isRequired,
};

export default inject(({ theme }) => ({
  close: theme.menu.close,
}))(MenuHeader);

const Container = styled.div`
  height: ${({ theme }) => theme.sizes.button};
  display: flex;
`;

const Title = styled.div`
  padding: ${({ theme }) => theme.paddings.menu};
  height: ${({ theme }) => theme.sizes.button};
  background-color: #cccccc;
  flex-grow: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Close = styled.div`
  height: ${({ theme }) => theme.sizes.button};
  width: ${({ theme }) => theme.sizes.button};
  background-color: #aaaaaa;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
