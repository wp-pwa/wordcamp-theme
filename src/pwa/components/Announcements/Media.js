import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { inject } from 'mobx-react';
import { parse } from 'url';
import IconImage from 'react-icons/lib/fa/image';

const Media = ({ alt, src, srcSet }) => (
  <Container>
    <Icon>
      <IconImage size={40} />
    </Icon>
    {src || srcSet ? <img alt={alt} sizes="100vw" src={src} srcSet={srcSet} /> : null}
  </Container>
);

Media.propTypes = {
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
})(Media);

const Container = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 152px;
  border-radius: 3px;
  background: #e9e9e6;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

const Icon = styled.span`
  position: absolute;
  top: 0;
  color: white;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
