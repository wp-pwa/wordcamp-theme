import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import FavoriteButton from './FavoriteButton';
import Link from '../Link';
import { sessionsContext, speakersContext } from '../../contexts';

const ScheduleItem = ({ session, position, columns }) => (
  <Container position={position}>
    <Time>{session.startTime}</Time>
    <InnerContainer>
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
    </InnerContainer>
    <FavoriteButton session={session} />
  </Container>
);

ScheduleItem.propTypes = {
  session: PropTypes.shape({}).isRequired,
  position: PropTypes.number.isRequired,
  columns: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))).isRequired,
};

export default ScheduleItem;

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  width: 100%;
  min-height: ${({ theme }) => theme.sizes.button};
  padding: 15px 0;
  background-color: ${({ position }) => (position % 2 === 0 ? '#fafafa' : '#d0d0d0')};
`;

const Time = styled.a`
  width: ${({ theme }) => theme.sizes.button};
  flex-shrink: 0;
  display: flex;
  justify-content: center;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-grow: 1;
  padding: 0 15px;
`;

const Title = styled.div`
  font-weight: bold;
`;

const Speaker = styled.a`
  display: inline-block;
  padding-right: 5px;
`;
