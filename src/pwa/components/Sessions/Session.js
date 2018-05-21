import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

const Session = ({ session }) => (
  <Container>
    <Title>{session.entity.title}</Title>
  </Container>
);

Session.propTypes = {
  session: PropTypes.shape({}).isRequired,
};

export default Session;

const Container = styled.div`
  box-sizing: border-box;
  padding: ${({ theme }) => theme.padding.session};
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h3`
  padding: 0 20px;
`;
