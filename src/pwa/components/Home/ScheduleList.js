import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import ScheduleItem from './ScheduleItem';
import FilterFavorites from './FilterFavorites';

const ScheduleList = ({ firstDaySessions, secondDaySessions }) => (
  <Container>
    <InnerContainer>
      <SessionDay>Friday, June 15th</SessionDay>
      <FilterFavorites />
    </InnerContainer>
    <div>
      {firstDaySessions.map((session, index) => (
        <ScheduleItem
          key={session.id}
          position={index}
          session={session}
          columns={firstDaySessions.map(({ type, id, page }) => [{ type, id, page }])}
          isSpecial={!session.hasSpeakers}
        />
      ))}
    </div>
    <InnerContainer>
      <SessionDay>Saturday, June 16th</SessionDay>
    </InnerContainer>
    <div>
      {secondDaySessions.map((session, index) => (
        <ScheduleItem
          key={session.id}
          position={index}
          session={session}
          columns={secondDaySessions.map(({ type, id, page }) => [{ type, id, page }])}
          isSpecial={!session.hasSpeakers}
        />
      ))}
    </div>
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
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InnerContainer = styled.div`
  width: calc(100vw - 48px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  margin-bottom: 16px;
`;

const SessionDay = styled.h3`
  margin: 0;
  font-size: 14px;
  color: ${({ theme }) => theme.color.lightGreyText};
  align-self: flex-start;
  line-height: 20px;
`;
