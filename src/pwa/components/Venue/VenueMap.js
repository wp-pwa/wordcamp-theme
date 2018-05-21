import React from 'react';
import styled from 'react-emotion';

const Venue = () => <Container>Venue</Container>;

export default Venue;

const Container = styled.div`
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  padding: ${({ theme }) => theme.padding.venue};
`;
