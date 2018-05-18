import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import FavoriteButton from './FavoriteButton';

const SessionRow = ({ session, position }) => (
  <Container position={position}>
    {session.title}
    <FavoriteButton session={session} />
  </Container>
);

SessionRow.propTypes = {
  session: PropTypes.shape({}).isRequired,
  position: PropTypes.number.isRequired,
};

export default SessionRow;

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: ${({ theme }) => theme.sizes.button};
  padding: ${({ theme }) => theme.paddings.schedule};
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ position }) => (position % 2 === 0 ? '#fafafa' : '#d0d0d0')};
`;
