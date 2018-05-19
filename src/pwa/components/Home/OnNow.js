import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import SessionCard from './SessionCard';

const OnNow = ({ sessions }) => (
  <Container>
    {sessions.map(session => <SessionCard key={session.id} session={session} />)}
  </Container>
);

OnNow.propTypes = {
  sessions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default inject(({ theme }) => ({
  sessions: theme.sessionsOnNow,
}))(OnNow);

const Container = styled.div`
  box-sizing: border-box;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: ${({ theme }) => `calc(${theme.sizes.button} + 20px)`};
`;
