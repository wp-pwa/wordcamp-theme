import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

const Announcement = ({ post }) => (
  <Container>
    <Title>{post.entity.title}</Title>
  </Container>
);

Announcement.propTypes = {
  post: PropTypes.shape({}).isRequired,
};

export default Announcement;

const Container = styled.div`
  box-sizing: border-box;
  padding: ${({ theme }) => theme.padding.session /* change this */};
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h3`
  padding: 0 20px;
`;
