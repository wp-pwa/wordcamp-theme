import React from 'react';
import styled from 'react-emotion';
import { homeContext } from '../../contexts';
import Link from '../Link';

const TopBar = () => (
  <Container>
    <CloseButton>
      <Link type="page" id={13} context={homeContext}>
        <A>Close</A>
      </Link>
    </CloseButton>
  </Container>
);

export default TopBar;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: ${({ theme }) => theme.sizes.button};
  width: 100vw;
  background-color: #cccccc;
  display: flex;
  justify-content: flex-end;
`;

const CloseButton = styled.div`
  height: ${({ theme }) => theme.sizes.button};
  width: ${({ theme }) => theme.sizes.button};
`;

const A = styled.a`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
