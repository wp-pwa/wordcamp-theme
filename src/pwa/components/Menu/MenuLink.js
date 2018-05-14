import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

const links = {
  twitter: {
    text: 'Twitter @WCEurope',
    url: 'https://twitter.com/wceurope',
  },
  facebook: {
    text: 'Facebook WordCampEurope',
    url: 'https://www.facebook.com/WordCampEurope',
  },
};

const MenuLink = ({ name }) => (
  <Container>
    <Link href={links[name].url} target="_blank" rel="noopener noreferrer">
      {links[name].text}
    </Link>
  </Container>
);

MenuLink.propTypes = {
  name: PropTypes.string.isRequired,
};

export default MenuLink;

const Container = styled.div`
  height: ${({ theme }) => theme.sizes.button};
  padding: ${({ theme }) => theme.paddings.menu};
`;

const Link = styled.a`
  height: ${({ theme }) => theme.sizes.button};
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
