import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

const Speaker = ({ speaker }) => (
  <Container>
    <Title>{speaker.entity.title}</Title>
  </Container>
);

Speaker.propTypes = {
  speaker: PropTypes.shape({}).isRequired,
};

export default Speaker;

const Container = styled.div`
  box-sizing: border-box;
  padding: ${({ theme }) => theme.paddings.speaker};
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h3`
  padding: 0 20px;
`;
