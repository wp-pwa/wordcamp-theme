import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';

const FavoriteButton = ({ isFavorite }) => <Container isFavorite={isFavorite}>Fav</Container>;

FavoriteButton.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
};

export default inject((store, { session }) => ({
  isFavorite: !!session.isFavorite,
}))(FavoriteButton);

const Container = styled.div`
  width: ${({ theme }) => theme.sizes.button};
  height: ${({ theme }) => theme.sizes.button};
  color: ${({ isFavorite }) => (isFavorite ? 'green' : '')};
  display: flex;
  justify-content: center;
  align-items: center;
`;
