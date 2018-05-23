import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

const Venue = ({ venue }) => <Container>{venue.title}</Container>;

Venue.propTypes = {
  venue: PropTypes.shape({}).isRequired,
};

export default Venue;

const Container = styled.div`
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  padding: ${({ theme }) => theme.padding.venue};
`;
