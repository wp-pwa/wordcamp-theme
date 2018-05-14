import React from 'react';
import styled from 'react-emotion';

const MenuHeader = () => (
  <Container>
    <Title>WordCamp Europe 2018</Title>
    <Close>Close</Close>
  </Container>
);

export default MenuHeader;

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
