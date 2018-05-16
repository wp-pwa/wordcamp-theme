import React from 'react';
import styled from 'react-emotion';

const Cassini = () => <Container>Cassini</Container>;

export default Cassini;

const Container = styled.div`
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  padding: ${({ theme }) => theme.paddings.venue};
`;
