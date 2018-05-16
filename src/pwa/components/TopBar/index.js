import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { dep } from 'worona-deps';
import styled from 'react-emotion';

const TopBar = ({ previousContextRequested }) => (
  <Container>
    <CloseButton onClick={previousContextRequested}>Close</CloseButton>
  </Container>
);

TopBar.propTypes = {
  previousContextRequested: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  previousContextRequested: () =>
    dispatch(dep('connection', 'actions', 'previousContextRequested')()),
});

export default connect(null, mapDispatchToProps)(TopBar);

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
