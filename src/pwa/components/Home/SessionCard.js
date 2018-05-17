/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import FavoriteButton from './FavoriteButton';

const SessionCard = ({ session }) => (
  <Container>
    <Header>
      <Track>{session.tracks.length === 1 ? session.tracks[0].name : ''}</Track>
      <FavoriteButton session={session} />
    </Header>
    <Body>
      <h4 dangerouslySetInnerHTML={{ __html: session.title }} />
      <p>{session.speakers.map(speaker => speaker.name).join(', ')}</p>
      <p>{session.time}</p>
    </Body>
  </Container>
);

SessionCard.propTypes = {
  session: PropTypes.shape({}).isRequired,
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
  padding: 0 15px;
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
  h3 {
    margin: 0;
    padding-top: 15px;
  }
`;
