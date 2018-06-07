import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import Card from '../Home/Card';

const List = ({ firstDayFavouriteSessions, secondDayFavouriteSessions }) => (
  <Container>
    <SessionDay>Friday, June 15th</SessionDay>
    {firstDayFavouriteSessions.length ? (
      firstDayFavouriteSessions.map(session => (
        <Card
          key={session.id}
          session={session}
          columns={firstDayFavouriteSessions.map(({ type, id, page }) => [{ type, id, page }])}
          isFavorite={!!session.isFavorite}
          isSpecial={!session.hasSpeakers}
        />
      ))
    ) : (
      <NoFavourites>No favourite sessions this day</NoFavourites>
    )}
    <SessionDay>Saturday, June 16th</SessionDay>
    {secondDayFavouriteSessions.length ? (
      secondDayFavouriteSessions.map(session => (
        <Card
          key={session.id}
          session={session}
          columns={secondDayFavouriteSessions.map(({ type, id, page }) => [{ type, id, page }])}
          isFavorite={!!session.isFavorite}
          isSpecial={!session.hasSpeakers}
        />
      ))
    ) : (
      <NoFavourites>No favourite sessions this day</NoFavourites>
    )}
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

const SessionDay = styled.h2`
  margin: 0;
  margin-top: 24px;
  font-size: 22px;
  color: ${({ theme }) => theme.color.text};
  align-self: flex-start;
  line-height: 22px;
`;

const NoFavourites = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.color.greyText};
`;
