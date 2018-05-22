import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import FavoriteButton from './FavoriteButton';
import Link from '../Link';
import { sessionsContext, speakersContext } from '../../contexts';

const ScheduleItem = ({ session, position, columns, isFavorite }) => (
  <Container position={position} isFavorite={isFavorite}>
    <Time>{session.startTime}</Time>
    <InnerContainer>
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
    </InnerContainer>
    <FavoriteButton session={session} inSchedule />
  </Container>
);

ScheduleItem.propTypes = {
  session: PropTypes.shape({}).isRequired,
  position: PropTypes.number.isRequired,
  columns: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))).isRequired,
  isFavorite: PropTypes.bool.isRequired,
};

export default inject((_, { session }) => ({
  isFavorite: !!session.isFavorite,
}))(ScheduleItem);

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  width: 100%;
  padding: ${({ theme }) => theme.padding.scheduleItem};
  border-bottom: 1px solid ${({ theme }) => theme.color.grey};
  background-color: ${({ theme, isFavorite }) => (isFavorite ? theme.color.yellow : null)};

  &:first-child {
    border-top: 1px solid ${({ theme }) => theme.color.grey};
  }
`;

const Time = styled.div`
  font-size: 14px;
  flex-shrink: 0;
  line-height: 24px;
  color: ${({ theme }) => theme.color.darkGrey};
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-grow: 1;
  padding: 0 8px;
`;

const Title = styled.div`
  font-size: 18px;
  color: ${({ theme }) => theme.color.blue};
  line-height: 24px;
`;

const Speakers = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.color.lightGreyText};
`;

const Speaker = styled.a`
  display: inline-block;
  line-height: 20px;
  margin-right: 4px;
  color: ${({ theme }) => theme.color.lightGreyText};

  &:not(:last-child):after {
    content: ', ';
  }
`;
