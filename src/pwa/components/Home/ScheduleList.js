import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import ScheduleItem from './ScheduleItem';

const ScheduleList = ({ firstDaySessions, secondDaySessions }) => (
  <Container>
    <SessionDay>Friday, June 15th</SessionDay>
    {firstDaySessions.map((session, index) => (
      <ScheduleItem
        key={session.id}
        position={index}
        session={session}
        columns={firstDaySessions.map(({ type, id, page }) => [{ type, id, page }])}
      />
    ))}
    <SessionDay>Saturday, June 16th</SessionDay>
    {secondDaySessions.map((session, index) => (
      <ScheduleItem
        key={session.id}
        position={index}
        session={session}
        columns={secondDaySessions.map(({ type, id, page }) => [{ type, id, page }])}
      />
    ))}
  </Container>
);

ScheduleList.propTypes = {
  firstDaySessions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  secondDaySessions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default inject(({ theme }, { track }) => ({
  firstDaySessions: theme.track(track).firstDaySessions,
  secondDaySessions: theme.track(track).secondDaySessions,
}))(ScheduleList);

const Container = styled.div`
  width: 100%;
  padding-bottom: ${({ theme }) => theme.sizes.button};
`;

const SessionDay = styled.h5`
  width: 100%;
  padding-left: 15px;
`;
