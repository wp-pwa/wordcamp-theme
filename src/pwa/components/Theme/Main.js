import React from 'react';
import styled from 'react-emotion';

const Main = () => <Div>Main</Div>;

export default Main;

const Div = styled.div`
  color: ${({ theme }) => theme.color};
`;
