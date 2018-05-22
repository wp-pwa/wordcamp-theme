import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { format } from 'fecha';
import styled from 'react-emotion';
import Media from '../Media';

const Post = ({ title, creationDate, authorName, hasFeaturedMedia, featured, content }) => (
  <Container>
    <Header>
      <Title>{title}</Title>
      <Info>
        <Fecha>{creationDate}</Fecha>
        <Dash>―</Dash>
        <Author>{authorName}</Author>
      </Info>
    </Header>
    {hasFeaturedMedia && <Media entity={featured} />}
    <Content dangerouslySetInnerHTML={{ __html: content }} />
  </Container>
);

Post.propTypes = {
  title: PropTypes.string.isRequired,
  creationDate: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  hasFeaturedMedia: PropTypes.bool.isRequired,
  featured: PropTypes.shape({}).isRequired,
  content: PropTypes.string.isRequired,
};

export default inject((_, { post }) => ({
  title: post.entity.title,
  creationDate: format(new Date(post.entity.creationDate), 'MMMM Do'),
  authorName: post.entity.author.name,
  featured: post.entity.media.featured,
  hasFeaturedMedia: post.entity.hasFeaturedMedia,
  content: post.entity.content,
}))(Post);

const Container = styled.div`
  box-sizing: border-box;
  padding: 56px 0;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const Header = styled.div`
  padding: 24px 24px 16px 24px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 22px;
  line-height: 28px;
  color: ${({ theme }) => theme.color.black};
`;

const Info = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  color: ${({ theme }) => theme.color.darkGrey};
  font-size: 16px;
  line-height: 24px;
`;

const Fecha = styled.p`
  margin: 0;
`;

const Dash = styled.p`
  margin: 0;
  padding: 0 8px;
`;

const Author = styled.p`
  margin: 0;
`;

const Content = styled.div`
  padding: 0 24px;
  margin: 24px 0 8px 0;
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
