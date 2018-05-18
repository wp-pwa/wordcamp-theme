import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';

const FavoriteButton = ({ isFavorite, toggleFavorite }) => (
  <Container onClick={toggleFavorite} isFavorite={isFavorite}>
    Fav
  </Container>
);

FavoriteButton.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
};

export default inject((_, { session }) => ({
  isFavorite: !!session.isFavorite,
  toggleFavorite: session.toggleFavorite,
}))(FavoriteButton);

const Container = styled.div`
  width: ${({ theme }) => theme.sizes.button};
  height: ${({ theme }) => theme.sizes.button};
  color: ${({ isFavorite }) => (isFavorite ? 'yellow' : '')};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;
