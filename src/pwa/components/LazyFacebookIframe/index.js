import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { inject } from 'mobx-react';
import { Helmet } from 'react-helmet';
import LazyIframe from '../LazyIframe';

const LazyFacebook = ({ width, height, href, attributes, isVideo, isAmp }) => {
  if (isAmp) {
    return [
      <Helmet>
        <script
          async=""
          custom-element="amp-facebook"
          src="https://cdn.ampproject.org/v0/amp-facebook-0.1.js"
        />
      </Helmet>,
      <Container styles={{ height, width }}>
        <amp-facebook
          layout="responsive"
          width={width}
          height={height}
          data-href={href}
          data-embed-as={isVideo ? 'video' : null}
        />
      </Container>,
    ];
  }
  return <LazyIframe width="100vw" height={height} attributes={attributes} />;
};

LazyFacebook.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  attributes: PropTypes.shape({}).isRequired,
  isVideo: PropTypes.bool.isRequired,
  isAmp: PropTypes.bool.isRequired,
};

export default inject(({ build }) => ({
  isAmp: build.isAmp,
}))(LazyFacebook);

const Container = styled.span`
  display: block;
  position: relative;
  left: -15px;
  height: ${({ styles }) => styles.height};
  width: ${({ styles }) => styles.width};

  amp-iframe {
    max-width: 100%;
  }

  & > .LazyLoad {
    display: block;
    width: 100%;
    height: 100%;

    iframe {
      width: 100%;
      height: 100%;
    }
  }
`;
