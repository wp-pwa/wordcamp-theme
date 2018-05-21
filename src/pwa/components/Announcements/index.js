import React, { Fragment } from 'react';
import styled from 'react-emotion';
import TopBar from '../TopBar';

const Announcements = () => (
  <Fragment>
    <Content>Announcements</Content>
    <TopBar />
  </Fragment>
);

export default Announcements;

const Content = styled.div`
  box-sizing: border-box;
  width: 100vw;
  min-height: 100vh;
  padding: ${({ theme }) => theme.padding.credits};
`;
