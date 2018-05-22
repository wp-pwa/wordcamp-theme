import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';

const Logo = ({ url }) => (
  <Container>
    <Img alt="Wordcamp logo" src={url} width="32" height="32" />
  </Container>
);

Logo.propTypes = {
  url: PropTypes.string.isRequired,
};

export default inject(({ settings }) => ({
  url: settings.theme.logoUrl,
}))(Logo);

const Container = styled.div`
  box-sizing: border-box;
  width: ${({ theme }) => theme.size.button};
  height: ${({ theme }) => theme.size.button};
  padding: 12px 0 12px 16px;
`;

const Img = styled.img`
  object-fit: contain;
`;
