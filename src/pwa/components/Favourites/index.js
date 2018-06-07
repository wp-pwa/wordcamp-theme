import React from 'react';
import styled from 'react-emotion';
import List from './List';
import TopBar from '../TopBar';
import Menu from '../Menu';

const Favourites = () => (
  <Container>
    <List />
    <TopBar />
    <Menu />
  </Container>
);

export default Favourites;

const Container = styled.div`
  box-sizing: border-box;
  min-height: 100vh;
  padding: 80px 0 24px 0;
`;
