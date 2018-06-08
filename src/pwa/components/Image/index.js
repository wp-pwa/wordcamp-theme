import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { parse } from 'url';
import IconImage from 'react-icons/lib/fa/image';
import styled from 'react-emotion';

// Returns true if width/height ratio of both objects are very, very close.
// Used when computing the srcSet prop value.
const sameRatio = ({ width: w1, height: h1 }, { width: w2, height: h2 }) =>
  Math.abs(w1 / h1 - w2 / h2) < 0.01;

const Image = ({ alt, width, height, maxWidth, maxHeight, content, src, srcSet }) => (
  // content.toString() -> Avoids a warning from emotion.
  <Container content={content.toString()} styles={{ height, width, maxHeight, maxWidth }}>
    <Icon content={content.toString()} styles={{ height, width, maxHeight, maxWidth }}>
      <IconImage size={40} />
    </Icon>
    {src || srcSet ? <img alt={alt} src={src} srcSet={srcSet} /> : null}
  </Container>
);

Image.propTypes = {
  content: PropTypes.bool, // Indicates that Image will be rendered inside Content
  width: PropTypes.string, // CSS values
  height: PropTypes.string, // CSS values
  maxWidth: PropTypes.string, // CSS values
  maxHeight: PropTypes.string, // CSS values
  alt: PropTypes.string, // Alt from HtmlToReactConverter or getAlt selector.
  src: PropTypes.string, // Src from HtmlToReactConverter or getSrc selector.
  srcSet: PropTypes.string, // SrcSet from HtmlToReactConverter or getSrcSet selector.
};

Image.defaultProps = {
  width: 'auto',
  height: 'auto',
  maxWidth: '',
  maxHeight: '',
  content: false,
  alt: '',
  src: '',
  srcSet: '',
};

export default inject(({ connection, settings }, { id, width, height }) => {
  if (id) {
    const media = connection.entity('media', id);
    const originalPath = parse(media.original.url).path;
    const cdn = (settings.theme.cdn || {}).images;
    const src = cdn && originalPath ? `${cdn}${originalPath}` : media.original.url;
    const srcSet =
      media.sizes
        .reduce((result, current) => {
          if (
            sameRatio(current, media.original) &&
            !result.find(size => size.width === current.width)
          ) {
            result.push(current);
          }
          return result;
        }, [])
        .map(item => {
          const { path } = parse(item.url);
          const url = cdn && path ? `${cdn}${path}` : item.url;

          return `${url} ${item.width}w`;
        })
        .join(', ') || (src ? `${src} 100w` : '');

    return {
      alt: media.alt,
      src,
      srcSet,
      width: width ? `${width}px` : 'calc(100vw - 48px)',
      height: height
        ? `${height}px`
        : `calc((100vw - 48px) * ${media.original.height / media.original.width})`,
      maxWidth: 'calc(100vw - 48px)',
      maxHeight: `calc((100vw - 48px) * ${media.original.height / media.original.width})`,
    };
  }

  if (width && height) {
    return {
      width: 'calc(100vw - 48px)',
      height: `calc((100vw - 48px) * ${height / width})`,
    };
  }

  return {
    width: 'auto',
    height: 'auto',
  };
})(Image);

const Container = styled.span`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  position: relative;
  width: ${({ styles }) => styles.width};
  height: ${({ styles }) => styles.height};
  max-width: ${({ styles }) => styles.maxWidth};
  max-height: ${({ styles }) => styles.maxHeight};
  margin: 0 auto 16px auto;

  img {
    position: ${({ styles }) => (styles.height === 'auto' ? 'static' : 'absolute')};
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
    color: transparent;
    border: none;
  }
`;

const Icon = styled.span`
  position: absolute;
  top: 0;
  color: #bdbdbd;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ styles }) => (styles.height === 'auto' ? 'z-index: -1' : null)};
`;
