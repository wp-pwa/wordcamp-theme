/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import Gravatar from 'react-gravatar';
import SessionCard from './SessionCard';

const Speaker = ({ name, gravatar, content, sessions }) => (
  <Container>
    <Name>{name}</Name>
    <div>
      <Avatar>
        <Gravatar md5={gravatar} size={88} />
      </Avatar>
      <Content dangerouslySetInnerHTML={{ __html: content }} />
    </div>
    {sessions.map(session => <SessionCard key={session.id} title={session.title} />)}
  </Container>
);

Speaker.propTypes = {
  name: PropTypes.string.isRequired,
  gravatar: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  sessions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default inject(({ theme }, { item: { id } }) => ({
  name: theme.speaker(id).name,
  gravatar: theme.speaker(id).gravatar,
  content: theme.speaker(id).entity.content,
  sessions: theme.speaker(id).sessions,
}))(Speaker);

const Container = styled.div`
  box-sizing: border-box;
  padding: 56px 24px;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const Name = styled.h3`
  padding: 24px 0 16px 0;
  margin: 0;
  font-size: 22px;
  line-height: 28px;
  color: ${({ theme }) => theme.color.black};
`;

const Content = styled.span`
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.color.darkGrey};

  & > p:first-child {
    margin-top: 0;
  }

  & > p:last-child {
    margin-bottom: 0;
  }
`;

const Avatar = styled.div`
  width: 88px;
  height: 88px;
  margin: 0 16px 12px 0;
  float: left;
  box-shadow: 4px 4px 0 0 #efdc39;

  img {
    filter: grayscale(100%);
  }
`;
