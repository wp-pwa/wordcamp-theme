import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import FavoriteButton from './FavoriteButton';

const Sessions = ({ firstDaySessions, secondDaySessions }) => (
  <Container>
    <SessionDay>Friday, June 15th</SessionDay>
    {firstDaySessions.map((session, index) => (
      <Row key={session.id} position={index}>
        {session.title}
        <FavoriteButton session={session} />
      </Row>
    ))}
    <SessionDay>Saturday, June 16th</SessionDay>
    {secondDaySessions.map((session, index) => (
      <Row key={session.id} position={index}>
        {session.title}
        <FavoriteButton session={session} />
      </Row>
    ))}
  </Container>
);

Sessions.propTypes = {
  firstDaySessions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  secondDaySessions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default inject(({ theme }, { track }) => ({
  firstDaySessions: theme.track(track).sessionsBy(new Date('2018-06-15T14:00:00+02:00')),
  secondDaySessions: theme.track(track).sessionsBy(new Date('2018-06-16T14:00:00+02:00')),
}))(Sessions);

const Container = styled.div`
  width: 100%;
  padding-bottom: ${({ theme }) => theme.sizes.button};
`;

const SessionDay = styled.h5`
  width: 100%;
  padding-left: 15px;
`;

const Row = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: ${({ theme }) => theme.sizes.button};
  padding: ${({ theme }) => theme.paddings.schedule};
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ position }) => (position % 2 === 0 ? '#fafafa' : '#d0d0d0')};
`;
