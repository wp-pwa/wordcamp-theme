import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { inject } from 'mobx-react';

const Venue = ({ title, href }) => (
  <Container>
    <Title>{title}</Title>
    <a
      target="_blank"
      href={href}
    >
      <Image src={href} />
    </a>
  </Container>
);

Venue.propTypes = {
  title: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};

export default inject((_, { venue }) => ({
  title: venue.entity.title,
  href: /<p>(.+)</.exec(venue.entity.content)[1],
}))(Venue);

const Container = styled.div`
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  padding: ${({ theme }) => theme.padding.venues};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 22px;
  margin: 0;
  color: ${({ theme }) => theme.color.text};
  margin-bottom: 16px;
`;

const Image = styled.img`
  width: 100%;
`;
