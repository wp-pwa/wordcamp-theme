import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { inject } from 'mobx-react';
import Media from './Media';

const Card = ({ title, creationDate, authorName, hasFeaturedMedia, featured }) => (
  <Container>
    {hasFeaturedMedia && <Media entity={featured}/>}
    <Title>{title}</Title>
    <Info>
      <Fecha>{creationDate}</Fecha>
      <Author>{authorName}</Author>
    </Info>
  </Container>
);

Card.propTypes = {
  title: PropTypes.string.isRequired,
  creationDate: PropTypes.number.isRequired, // check this
  authorName: PropTypes.string.isRequired,
  hasFeaturedMedia: PropTypes.bool.isRequired,
  featured: PropTypes.shape({}).isRequired,
};

export default inject((_, { entity }) => ({
  title: entity.title,
  creationDate: entity.creationDate,
  authorName: entity.author.name,
  hasFeaturedMedia: entity.hasFeaturedMedia,
  featured: entity.media.featured,
}))(Card);

const Container = styled.div`
  box-sizing: border-box;
  width: 100vw;
  min-height: 56px;
`;

const Title = styled.div`
  box-sizing: border-box;
  width: 100vw;
  min-height: 56px;
`;

const Fecha = styled.div`
  box-sizing: border-box;
  width: 100vw;
  min-height: 56px;
`;

const Author = styled.div`
  box-sizing: border-box;
  width: 100vw;
  min-height: 56px;
`;

const Info = styled.div`
  box-sizing: border-box;
  width: 100vw;
  min-height: 56px;
`;
