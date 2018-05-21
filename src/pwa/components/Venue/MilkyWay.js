import React from 'react';
import styled from 'react-emotion';

const MilkyWay = () => <Container>MilkyWay</Container>;

export default MilkyWay;

const Container = styled.div`
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  padding: ${({ theme }) => theme.padding.venue};
`;
