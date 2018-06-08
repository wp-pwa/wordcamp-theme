import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import Card from '../Home/Card';
import Sync from '../Icons/Sync';

const DayList = ({ sessions, isSsr }) => {
  if (isSsr) {
    return (
      <Wrapper>
        <Sync size={16} animate />
      </Wrapper>
    );
  }

  return sessions.length ? (
    sessions.map(session => (
      <Card
        key={session.id}
        session={session}
        columns={sessions.map(({ type, id, page }) => [{ type, id, page }])}
        isFavorite={!!session.isFavorite}
        isSpecial={!session.hasSpeakers}
      />
    ))
  ) : (
    <NoFavourites>No favourite sessions this day</NoFavourites>
  );
};

DayList.propTypes = {
  sessions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  isSsr: PropTypes.bool.isRequired,
};

export default inject(({ build }) => ({
  isSsr: build.isSsr,
}))(DayList);

const Wrapper = styled.div`
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NoFavourites = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.color.greyText};
`;
