import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import EmptyStarIcon from 'react-icons/lib/fa/star-o';
import FullStarIcon from 'react-icons/lib/fa/star';

const FavoriteButton = ({ isFavorite, toggleFavorite, inSchedule }) => (
  <Container onClick={toggleFavorite} inSchedule={inSchedule}>
    {isFavorite ? (
      <StyledFullStarIcon size={18} inSchedule={inSchedule} />
    ) : (
      <StyledEmptyStarIcon size={18} inSchedule={inSchedule} />
    )}
  </Container>
);

FavoriteButton.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  inSchedule: PropTypes.bool.isRequired,
};

export default inject((_, { session, inSchedule }) => ({
  isFavorite: !!session.isFavorite,
  toggleFavorite: session.toggleFavorite,
  inSchedule: !!inSchedule,
}))(FavoriteButton);

const Container = styled.div`
  width: ${({ theme, inSchedule }) => (inSchedule ? '' : theme.size.cardHeader)};
  height: ${({ theme, inSchedule }) => (inSchedule ? '' : theme.size.cardHeader)};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;

const StyledEmptyStarIcon = styled(EmptyStarIcon)`
  padding: ${({ inSchedule }) => (inSchedule ? null : '11px')};
  color: ${({ theme, inSchedule }) => (inSchedule ? theme.color.darkGrey : theme.color.white)};
`;

const StyledFullStarIcon = styled(FullStarIcon)`
  padding: ${({ inSchedule }) => (inSchedule ? null : '11px')};
  color: ${({ theme, inSchedule }) => (inSchedule ? theme.color.red : theme.color.white)};
`;
