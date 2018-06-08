import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import Link from '../Link';
import { homeContext } from '../../contexts';
import { PAGE_HOME_ON_NOW } from '../../consts';

const Logo = ({ src, srcSet }) => (
  <Container>
    <Link type="page" id={PAGE_HOME_ON_NOW} context={homeContext}>
      <A>
        <Img alt="Wordcamp logo" src={src} srcSet={srcSet} />
      </A>
    </Link>
  </Container>
);

Logo.propTypes = {
  src: PropTypes.string.isRequired,
  srcSet: PropTypes.string.isRequired,
};

export default inject(({ settings }) => {
  const sizes = [
    { px: 32, ratio: 1 },
    { px: 48, ratio: 1.5 },
    { px: 64, ratio: 2 },
    { px: 80, ratio: 2.5 },
    { px: 96, ratio: 3 },
  ];

  const { logoUrl } = settings.theme;

  return {
    src: logoUrl,
    srcSet: sizes.map(size => `${logoUrl}?w=${size.px} ${size.ratio}x`).join(', '),
  };
})(Logo);

const Container = styled.div`
  box-sizing: border-box;
  width: ${({ theme }) => theme.size.button};
  height: ${({ theme }) => theme.size.button};
`;

const A = styled.a`
  box-sizing: border-box;
  display: block;
  width: 100%;
  height: 100%;
  padding: 12px 0 12px 16px;
`;

const Img = styled.img`
  object-fit: contain;
  height: 100%;
  width: 100%;
`;
