import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { parse } from 'url';

const Image = ({ alt, src, srcSet }) => (
  <Fragment>
    {src || srcSet ? <img alt={alt} sizes="100vw" src={src} srcSet={srcSet} /> : null}
  </Fragment>
);

Image.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  srcSet: PropTypes.string.isRequired,
};

export default inject(({ settings }, { entity }) => {
  const cdn = (settings.theme.cdn || {}).images;
  const originalPath = parse(entity.original.url).path;
  const src = cdn && originalPath ? `${cdn}${originalPath}` : entity.original.url;
  return {
    alt: entity.alt,
    src: entity.original.url,
    srcSet:
      entity.sizes
        .map(item => {
          const { path } = parse(item.url);
          const url = cdn && path ? `${cdn}${path}` : item.url;
          return `${url} ${item.width}w`;
        })
        .join(', ') || src
        ? `${src} 100w`
        : '',
  };
})(Image);
