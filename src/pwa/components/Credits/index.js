import React, { Fragment } from 'react';
import styled from 'react-emotion';
import TopBar from '../TopBar';

const Credits = () => (
  <Fragment>
    <Content>Credits</Content>
    <TopBar />
  </Fragment>
);

export default Credits;

const Content = styled.div`
  box-sizing: border-box;
  width: 100vw;
  min-height: 100vh;
  padding: ${({ theme }) => theme.paddings.credits};
`;
