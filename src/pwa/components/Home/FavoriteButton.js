import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import EmptyStarIcon from 'react-icons/lib/fa/star-o';
import FullStarIcon from 'react-icons/lib/fa/star';

const FavoriteButton = ({ isFavorite, toggleFavorite }) => (
  <Container onClick={toggleFavorite}>
    {isFavorite ? <StyledFullStarIcon size={18} /> : <StyledEmptyStarIcon size={18} />}
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
  width: ${({ theme }) => theme.size.cardHeader};
  height: ${({ theme }) => theme.size.cardHeader};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;

const StyledEmptyStarIcon = styled(EmptyStarIcon)`
  padding: 11px;
  color: ${({ theme }) => theme.color.whiteText};
`;

const StyledFullStarIcon = styled(FullStarIcon)`
  padding: 11px;
  color: ${({ theme }) => theme.color.whiteText};
`;
