import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { inject } from 'mobx-react';
import { format } from 'fecha';
import Media from '../Media';
import Link from '../Link';

const Card = ({ type, id, title, creationDate, authorName, featured, context }) => (
  <Link type={type} id={id} context={context}>
    <Container>
      <Media entity={featured} isRounded />
      <Title>{title}</Title>
      <Info>
        <Fecha>{creationDate}</Fecha>
        <Dash>―</Dash>
        <Author>{authorName}</Author>
      </Info>
    </Container>
  </Link>
);

Card.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  creationDate: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  featured: PropTypes.shape({}).isRequired,
  context: PropTypes.shape({}).isRequired,
};

export default inject((_, { entity }) => ({
  type: entity.type,
  id: entity.id,
  title: entity.title,
  creationDate: format(new Date(entity.creationDate), 'MMMM Do'),
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
  color: ${({ theme }) => theme.color.blue};
  font-size: 24px;
  font-weight: normal;
  margin: 16px 0 0 0;
`;

const Info = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  color: ${({ theme }) => theme.color.darkGrey};
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
