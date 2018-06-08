import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import DayList from './DayList';

const List = ({ firstDayFavouriteSessions, secondDayFavouriteSessions }) => (
  <Container>
    <Day>Friday, June 15th</Day>
    <DayList sessions={firstDayFavouriteSessions} />
    <Day>Saturday, June 16th</Day>
    <DayList sessions={secondDayFavouriteSessions} />
  </Container>
);

List.propTypes = {
  firstDayFavouriteSessions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  secondDayFavouriteSessions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default inject(({ theme }) => ({
  firstDayFavouriteSessions: theme.firstDayFavouriteSessions,
  secondDayFavouriteSessions: theme.secondDayFavouriteSessions,
}))(List);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 24px;
`;

const Day = styled.h2`
  margin: 0;
  margin-top: 24px;
  font-size: 22px;
  color: ${({ theme }) => theme.color.text};
  align-self: flex-start;
  line-height: 22px;
`;
