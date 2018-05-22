import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import SessionItem from './SessionItem';

const SessionsFrame = ({ sessions }) => (
  <Container>
    {sessions.map(session => (
      <SessionItem
        key={session.id}
        session={session}
        columns={sessions.map(({ type, id, page }) => [{ type, id, page }])}
      />
    ))}
  </Container>
);

SessionsFrame.propTypes = {
  sessions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default SessionsFrame;

const Container = styled.div`
  box-sizing: border-box;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: ${({ theme }) => `calc(${theme.sizes.button} + 20px)`};
`;
