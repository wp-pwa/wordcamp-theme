import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { inject } from 'mobx-react';
import Media from './Media';

const Card = ({ title, creationDate, authorName, featured }) => (
  <Container>
    <Media entity={featured} />
    <Title>{title}</Title>
    <Info>
      <Fecha>{creationDate}</Fecha>
      <Author>{authorName}</Author>
    </Info>
  </Container>
);

Card.propTypes = {
  title: PropTypes.string.isRequired,
  creationDate: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  featured: PropTypes.shape({}).isRequired,
};

export default inject((_, { entity }) => ({
  title: entity.title,
  creationDate: new Date(entity.creationDate).toDateString(),
  authorName: entity.author.name,
  featured: entity.media.featured,
}))(Card);

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 16px;
`;

const Title = styled.h2`
  width: 100%;
  color: #5566c3;
  font-size: 24px;
  font-weight: normal;
  margin: 16px 0 0 0;
`;

const Info = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  color: rgba(40, 36, 9, 0.4);
  text-align: center;
`;

const Fecha = styled.p`
  margin: 0;
`;

const Author = styled.p`
  margin: 0;
`;
