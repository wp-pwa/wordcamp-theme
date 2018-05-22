/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import { sessionsContext, speakersContext } from '../../contexts';
import Link from '../Link';
import FavoriteButton from './FavoriteButton';

const SessionCard = ({ isFavorite, session, columns }) => (
  <Container isFavorite={isFavorite}>
    <Header track={session.tracks.length === 1 ? session.tracks[0].name : null}>
      <Track>{session.tracks.length === 1 ? session.tracks[0].name : ''}</Track>
      <FavoriteButton session={session} />
    </Header>
    <Body>
      <Link type={session.type} id={session.id} context={sessionsContext(columns)}>
        <Title dangerouslySetInnerHTML={{ __html: session.title }} />
      </Link>
      <Speakers>
        {session.speakers.map(speaker => (
          <Link
            key={speaker.name}
            type={speaker.type}
            id={speaker.id}
            context={speakersContext(
              session.speakers.map(({ type, id, page }) => [{ type, id, page }]),
            )}
          >
            <Speaker>{`${speaker.name}`}</Speaker>
          </Link>
        ))}
      </Speakers>
      <Time>{`${session.startTime}${session.endTime ? ` - ${session.endTime}` : ''}`}</Time>
    </Body>
  </Container>
);

SessionCard.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  session: PropTypes.shape({}).isRequired,
  columns: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))).isRequired,
};

export default inject((_, { session }) => ({
  isFavorite: !!session.isFavorite,
}))(SessionCard);

const Container = styled.div`
  box-sizing: border-box;
  height: auto;
  width: 100%;
  overflow: hidden;
  background-color: ${({ theme, isFavorite }) =>
    isFavorite ? theme.color.grey : theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.grey};
  border-radius: 3px;
  margin-top: 16px;

  &:first-child {
    margin-top: 0;
  }
`;

const Header = styled.div`
  box-sizing: border-box;
  height: ${({ theme }) => theme.size.cardHeader};
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme, track }) => {
    if (track === 'Milky Way Track') return theme.color.blue;
    if (track === 'Andromeda Track') return theme.color.red;
    return theme.color.yellow;
  }};
  color: ${({ theme, track }) => {
    if (track === 'Milky Way Track' || track === 'Andromeda Track') return theme.color.whiteText;
    return theme.color.text;
  }};
  padding-left: 16px;
`;

const Track = styled.div`
  font-size: 14px;
  font-weight: lighter;
  text-transform: uppercase;
`;

const Body = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: ${({ theme }) => theme.padding.cardBody};
`;

const Title = styled.a`
  display: block;
  font-size: 16px;
  padding-bottom: 4px;
  color: ${({ theme }) => theme.color.text};
`;

const Speakers = styled.p`
  margin: 0;
  font-size: 16px;
  padding-bottom: 4px;
  color: ${({ theme }) => theme.color.greyText};
`;

const Speaker = styled.a`
  display: inline-block;
  margin-right: 4px;
  color: inherit;

  &:not(:last-child):after {
    content: ', ';
  }
`;

const Time = styled.p`
  margin: 0;
  font-size: 16px;
  color: ${({ theme }) => theme.color.greyText};
`;
