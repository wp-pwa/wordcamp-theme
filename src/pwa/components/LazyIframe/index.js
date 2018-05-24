import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { inject } from 'mobx-react';
import { Helmet } from 'react-helmet';
import LazyLoad from '@frontity/lazyload';

const LazyIframe = ({ width, height, attributes, isAmp }) => {
  const {
    title,
    allowFullScreen,
    allowPaymentRequest,
    allowTransparency,
    width: attributesWidth,
    height: attributesHeight,
    ...rest
  } = attributes;
  if (isAmp) {
    return [
      <Helmet>
        <script
          async=""
          custom-element="amp-iframe"
          src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"
        />
      </Helmet>,
      <Container styles={{ height, width }}>
        <amp-iframe
          title={title || ''}
          width={width}
          height={height}
          allowFullScreen={allowFullScreen ? '' : null}
          allowPaymentRequest={allowPaymentRequest ? '' : null}
          allowTransparency={allowTransparency ? '' : null}
          sandbox="allow-scripts"
          {...rest}
        />
      </Container>,
    ];
  }
  return (
    <Container styles={{ width, height }}>
      <LazyLoad elementType="span" offsetVertical={2000} offsetHorizontal={-10} throttle={50}>
        <iframe
          title={title || ''}
          width={width}
          height={height}
          allowFullScreen={allowFullScreen ? '' : null}
          allowPaymentRequest={allowPaymentRequest ? '' : null}
          allowTransparency={allowTransparency ? '' : null}
          {...rest}
        />
      </LazyLoad>
    </Container>
  );
};

LazyIframe.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  attributes: PropTypes.shape({}).isRequired,
  isAmp: PropTypes.bool.isRequired,
};

export default inject(({ build }) => ({
  isAmp: build.isAmp,
}))(LazyIframe);

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
