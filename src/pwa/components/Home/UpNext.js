import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import SessionCard from './SessionCard';

const UpNext = ({ sessions }) => (
  <Container>
    {sessions.map(session => <SessionCard key={session.entityId} session={session} />)}
  </Container>
);

UpNext.propTypes = {
  sessions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default inject(({ theme }) => ({
  sessions: theme.sessionsUpNext(new Date('2018-06-15T10:13:16+02:00')),
}))(UpNext);

const Container = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-bottom: ${({ theme }) => `calc(${theme.sizes.button} + 20px)`};
`;
