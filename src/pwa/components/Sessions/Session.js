import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import Link from '../Link';

const Session = ({ title, isFavorite, content, speakers, trackName, time }) => (
  <Container>
    <Title>{title}</Title>
    <Star isFavorite={isFavorite} />
    <Content dangerouslySetInnerHTML={{ __html: content }} />
    <Card>
      <CardSection>
        <CardTitle>SPEAKERS</CardTitle>
        <CardText>
          {speakers.map(speaker => (
            <Link type={speaker.type} id={speaker.id}>
              <span>{speaker.name}</span>
            </Link>
          ))}
        </CardText>
      </CardSection>
      <CardSection>
        <CardTitle>TRACK</CardTitle>
        <CardText>{trackName}</CardText>
      </CardSection>
      <CardSection>
        <CardTitle>TIME</CardTitle>
        <CardText>{time}</CardText>
      </CardSection>
    </Card>
  </Container>
);

Session.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  speakers: PropTypes.arrayOf(PropTypes.string).isRequired,
  trackName: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool.isRequired,
};

export default inject(({ theme }, { item }) => {
  const session = theme.sessionsMap.get(`${item.type}_${item.id}`);
  return {
    title: session.entity.title,
    content: session.entity.content,
    speakers: session.speakers.peek(),
    trackName: session.tracks[0].name,
    time: session.startTime,
    isFavorite: session.isFavorite,
  };
})(Session);

const Container = styled.div`
  box-sizing: border-box;
  padding: ${({ theme }) => theme.padding.session};
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h3`
  padding: 0 20px;
`;

const Star = styled.div``;
const Content = styled.div``;
const Card = styled.div``;
const CardSection = styled.div``;
const CardTitle = styled.div``;
const CardText = styled.div``;
