/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { sessionsContext, speakersContext } from '../../contexts';
import Link from '../Link';
import FavoriteButton from './FavoriteButton';

const SessionCard = ({ session, columns }) => (
  <Container>
    <Header>
      <Track>{session.tracks.length === 1 ? session.tracks[0].name : ''}</Track>
      <FavoriteButton session={session} />
    </Header>
    <Body>
      <Link type={session.type} id={session.id} context={sessionsContext(columns)}>
        <Title dangerouslySetInnerHTML={{ __html: session.title }} />
      </Link>
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
      <p>{`${session.startTime}${session.endTime ? ` - ${session.endTime}` : ''}`}</p>
    </Body>
  </Container>
);

SessionCard.propTypes = {
  session: PropTypes.shape({}).isRequired,
  columns: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))).isRequired,
};

export default SessionCard;

const Container = styled.div`
  box-sizing: border-box;
  width: 90vw;
  height: auto;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 20px;
`;

const Header = styled.div`
  box-sizing: border-box;
  height: ${({ theme }) => theme.sizes.button};
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #888888;
`;

const Track = styled.div`
  padding: 0 15px;
`;

const Body = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 0 15px 15px 15px;
  background-color: #cccccc;

  p,
  h4 {
    margin: 0;
    padding-top: 15px;
  }
`;

const Title = styled.a`
  display: block;
  font-size: 1.2rem;
  font-weight: bold;
  padding-top: 15px;
`;

const Speaker = styled.a`
  display: inline-block;
  padding-right: 5px;
`;
