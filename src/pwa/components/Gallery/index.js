import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { Helmet } from 'react-helmet';
import styled from 'react-emotion';
import ItemList from './ItemList';
import GalleryWithLinks from './GalleryWithLinks';

import Lazy from '../LazyAnimated';
import Spinner from '../Spinner';

const lazyProps = {
  animate: Lazy.onMount,
  ignoreSsr: true,
  offsetVertical: 500,
  offsetHorizontal: -50,
  debounce: false,
  throttle: 300,
};

const Gallery = ({ isAmp, useIds, mediaAttributes, splitAfter }) => {
  if (mediaAttributes.length === 0) return null;

  if (isAmp) {
    const items = mediaAttributes.map(({ src, alt }) => (
      <ImageContainer key={src}>
        <amp-img src={src} width="40vw" height="40vw" alt={alt} layout="fill" />
      </ImageContainer>
    ));
    return [
      <Helmet>
        <script
          async=""
          custom-element="amp-carousel"
          src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"
        />
      </Helmet>,
      <Container className="gallery">
        <amp-carousel height="40vw" layout="fixed-height" type="carousel">
          {items}
        </amp-carousel>
      </Container>,
    ];
  }

  if (useIds) {
    const splitLimit = Math.min(splitAfter, 100);
    const mediaIds = mediaAttributes.map(({ attachmentId }) => attachmentId);
    const galleries = [];
    let index = 0;

    do {
      galleries.push(
        <Container key={`gallery ${index}-${index + splitLimit}`} className="gallery">
          <Lazy {...lazyProps} placeholder={<Spinner />}>
            <GalleryWithLinks mediaIds={mediaIds.slice(index, index + splitLimit)} />
          </Lazy>
        </Container>,
      );
      index += splitLimit;
    } while (index < mediaIds.length);

    return galleries;
  }

  return (
    <Container className="gallery">
      <Lazy {...lazyProps} placeholder={<Spinner />}>
        <ItemList mediaAttributes={mediaAttributes} />
      </Lazy>
    </Container>
  );
};

Gallery.propTypes = {
  isAmp: PropTypes.bool.isRequired,
  useIds: PropTypes.bool.isRequired,
  mediaAttributes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  splitAfter: PropTypes.number,
};

Gallery.defaultProps = {
  splitAfter: 25,
};

export default inject(({ build }) => ({
  isAmp: build.isAmp,
}))(Gallery);

const Container = styled.span`
  box-sizing: content-box;
  margin: 0;
  padding: 1.5vmin 0;
  margin-bottom: 30px;
  background: #0e0e0e;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    height: 100%;
    width: 100%;
  }
`;

const ImageContainer = styled.span`
  display: block;
  position: relative;
  width: 40vw;
  height: 40vw;

  img {
    object-fit: cover;
  }
`;
