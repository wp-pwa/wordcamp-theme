import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import { homeContext } from '../../contexts';
import Link from '../Link';

const TopBar = ({ contextIndex, previousContextRequested }) => (
  <Container>
    {contextIndex ? (
      <CloseButton onClick={previousContextRequested}>Close</CloseButton>
    ) : (
      <CloseButton>
        <Link type="page" id={13} context={homeContext}>
          <A>Close</A>
        </Link>
      </CloseButton>
    )}
  </Container>
);

TopBar.propTypes = {
  contextIndex: PropTypes.number.isRequired,
  previousContextRequested: PropTypes.func.isRequired,
};

export default inject(({ connection }) => ({
  previousContextRequested: connection.previousContextRequested,
  contextIndex: connection.selectedContext.index,
}))(TopBar);

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
  display: flex;
  justify-content: center;
  align-items: center;
`;

const A = styled.a`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
