import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
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

const MenuLink = ({ name, closeMenu }) => (
  <Container onClick={closeMenu}>
    <Link href={links[name].url} target="_blank" rel="noopener noreferrer">
      {links[name].text}
    </Link>
  </Container>
);

MenuLink.propTypes = {
  name: PropTypes.string.isRequired,
  closeMenu: PropTypes.func.isRequired,
};

export default inject(({ theme }) => ({
  closeMenu: theme.menu.close,
}))(MenuLink);

const Container = styled.div`
  box-sizing: border-box;
  height: ${({ theme }) => theme.sizes.button};
  box-shadow: inset 0 -1px 0 0 rgba(40, 36, 9, 0.1);
  font-size: 20px;
  line-height: 20px;
`;

const Link = styled.a`
  box-sizing: border-box;
  height: ${({ theme }) => theme.sizes.button};
  padding: ${({ theme }) => theme.padding.menuItem};
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
