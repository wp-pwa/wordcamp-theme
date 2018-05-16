import React from 'react';
import styled from 'react-emotion';

const Andromeda = () => <Container>Andromeda</Container>;

export default Andromeda;

const Container = styled.div`
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  padding: ${({ theme }) => theme.paddings.venue};
`;
