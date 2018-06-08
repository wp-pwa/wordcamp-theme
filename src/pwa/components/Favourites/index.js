import React from 'react';
import styled from 'react-emotion';
import List from './List';

const Favourites = () => (
  <Container>
    <List />
  </Container>
);

export default Favourites;

const Container = styled.div`
  box-sizing: border-box;
  min-height: 100vh;
  padding: 56px 0 24px 0;
`;
