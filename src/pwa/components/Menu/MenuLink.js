import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import FacebookIcon from 'react-icons/lib/fa/facebook-official';
import TwitterIcon from 'react-icons/lib/fa/twitter';

const links = {
  twitter: {
    text: '@WCEurope',
    url: 'https://twitter.com/wceurope',
  },
  facebook: {
    text: 'WordCampEurope',
    url: 'https://www.facebook.com/WordCampEurope',
  },
};

const MenuLink = ({ name, closeMenu }) => (
  <Container onClick={closeMenu}>
    <Link href={links[name].url} target="_blank" rel="noopener noreferrer">
      {name === 'facebook' && <StyledFacebookIcon />}
      {name === 'twitter' && <StyledTwitterIcon />}
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
  height: ${({ theme }) => theme.size.button};
  box-shadow: inset 0 -1px 0 0 rgba(40, 36, 9, 0.1);
  font-size: 20px;
  line-height: 20px;
`;

const Link = styled.a`
  box-sizing: border-box;
  height: ${({ theme }) => theme.size.button};
  padding: ${({ theme }) => theme.padding.menuItem};
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: ${({ theme }) => theme.color.text};
`;

const StyledFacebookIcon = styled(FacebookIcon)`
  color: ${({ theme }) => theme.color.darkGrey};
  margin-right: 8px;
`;

const StyledTwitterIcon = styled(TwitterIcon)`
  color: ${({ theme }) => theme.color.darkGrey};
  margin-right: 8px;
`;
