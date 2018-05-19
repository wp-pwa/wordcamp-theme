import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import SessionCard from './SessionCard';

const UpNext = ({ sessions }) => (
  <Container>
    {sessions.map(session => <SessionCard key={session.id} session={session} />)}
  </Container>
);

UpNext.propTypes = {
  sessions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default inject(({ theme }) => ({
  sessions: theme.sessionsUpNext,
}))(UpNext);

const Container = styled.div`
  box-sizing: border-box;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: ${({ theme }) => `calc(${theme.sizes.button} + 20px)`};
`;
